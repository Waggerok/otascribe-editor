import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import
{
    $createRangeSelection,
    $getNodeByKey,
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    $isTextNode,
    $setSelection,
    COMMAND_PRIORITY_CRITICAL,
    type EditorState,
    HISTORY_MERGE_TAG,
    INSERT_LINE_BREAK_COMMAND,
    ParagraphNode,
    TextNode,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';

import
{
    $createReplicaNode,
    $isActionsNode,
    $isAvatarNode,
    $isReplicaNode,
    $isTimingNode,
    ReplicaNode,
} from '@/widgets/editor';
import
{
    findAndSelectFirstParagraph,
    getTextFromNodes,
    getWordsFromNodes,
    selectNodeByIndex,
} from '@/widgets/editor/utils/editor';

import type { WordExtendedInfo } from '@/shared/generated/api/generated';
import type { PointType } from 'lexical';

function CustomNodesTransformPlugin()
{
    const [editor] = useLexicalComposerContext();
    const [focusedNode, setFocusedNode] = useState<ReplicaNode | undefined>();
    const [selected, setSelected] = useState<PointType | null>(null);

    /**
     * This designed to ensure that the editor always has the correct nodes structure
     */
    useEffect(() =>
    {
        const unsubscribeShiftEnterListener = editor.registerCommand(
            INSERT_LINE_BREAK_COMMAND,
            () =>
            {
                editor.update(() =>
                {
                    const selection = editor.getEditorState()._selection;
                    if (!selection) return;
                    if (!$isRangeSelection(selection)) return;

                    const selectedNode = $getNodeByKey(selection.focus.key);
                    if (!selectedNode) return;
                    if (!$isTextNode(selectedNode)) return;

                    const offset = selection.focus.offset;
                    const text = selectedNode.getTextContent();

                    selectedNode.setTextContent(text.slice(0, offset) + '\n' + text.slice(offset));

                    const sel = $createRangeSelection();
                    sel.anchor.key = selectedNode.getKey();
                    sel.focus.key = selectedNode.getKey();
                    sel.anchor.offset = offset + 1;
                    sel.focus.offset = offset + 1;
                    sel.anchor.type = selection.anchor.type;
                    sel.focus.type = selection.focus.type;
                    $setSelection(sel);
                });

                return true;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
        // TODO 20.07.2025: Make it simpler?
        const onParagraphTransform = editor.registerNodeTransform(ParagraphNode, (node) =>
        {
            const parent = node.getParent();
            if (!$isReplicaNode(parent))
            {
                node.remove();

                return;
            }

            const siblings = parent.getChildren();
            const currentIndex = siblings.indexOf(node);

            // Если нода не найдена среди детей родителя
            if (currentIndex === -1) return;

            // Ищем первый предыдущий ParagraphNode
            let targetParagraph: ParagraphNode | null = null;
            for (let index = currentIndex - 1; index >= 0; index--)
            {
                const sibling = siblings[index];
                if ($isParagraphNode(sibling))
                {
                    targetParagraph = sibling;
                    break;
                }
            }

            if (targetParagraph)
            {
                // Создаем копию массива детей для безопасной итерации
                const children = [...node.getChildren()];

                // Переносим все дочерние узлы
                for (const child of children)
                {
                    child.remove();
                    targetParagraph!.append(child);
                }

                // Удаляем текущий параграф
                node.remove();
            }
        });

        const onTextNodeTransform = editor.registerNodeTransform(TextNode, (node) =>
        {
            const parent = node.getParent();
            if ($isParagraphNode(parent)) return;
            node.remove();
        });

        // eslint-disable-next-line sonarjs/cognitive-complexity
        const fullReplicaRemover = editor.registerNodeTransform(ReplicaNode, (node) =>
        {
            const children = node.getChildren();
            const hasAvatar = children.find(n => $isAvatarNode(n));
            const hasTiming = hasAvatar && children.find(n => $isTimingNode(n));
            const hasActions = hasTiming && children.find(n => $isActionsNode(n));
            const hasParagraphNode = hasActions && children.find(n => $isParagraphNode(n));

            // Check that replica node has correct structure
            if (!(node.getChildren().length > 0 && (!hasAvatar || !hasTiming || !hasActions || !hasParagraphNode))) return;

            let previousNode = node.getPreviousSibling();

            const selection = $getSelection();
            const isSameNode = $isRangeSelection(selection) && selection.anchor.key === selection.focus.key;

            if (!hasActions && isSameNode)
            {
                const prTextNode = $getNodeByKey(selection?.anchor.key)?.getPreviousSibling();

                if (prTextNode === null && selection.anchor.offset === 0)
                {
                    if (!previousNode || !$isReplicaNode(previousNode)) return;

                    if (node.getTextContent().trim().length > 0)
                    {
                        const textNodes = node.getAllTextNodes();
                        const previousNodeParagraph = previousNode.getChildren().find((n) => $isParagraphNode(n));
                        previousNodeParagraph?.append(...textNodes || []);

                        const newTextNodes = previousNode.getTextNodes();
                        for (const [key, wordInfo] of node.getTextNodes())
                        {
                            newTextNodes.set(key, wordInfo);
                        }
                        previousNode.setTextNodes(newTextNodes);
                    }
                    else
                    {
                        selectNodeByIndex(editor, previousNode, previousNode.getAllTextNodes().length - 1);
                    }

                    node.remove();

                    return;
                }

                const nextNode = node.getNextSibling();

                // Проверяем, что следующая нода существует и она тоже ReplicaNode,
                // иначе мы не сможем корректно объединить метаданные.
                if (nextNode && $isReplicaNode(nextNode))
                {
                    // Находим параграф внутри затронутой ноды
                    const p = children.find(n => $isParagraphNode(n));
                    // Размер параграфа - количество узлов, а также индекс первого узла в скрещенной ноде
                    const size = p?.getChildrenSize() ?? 0;

                    // Собираем данные из текущей ноды (node)
                    // (Приводим типы, так как мы знаем, что это ReplicaNode)
                    const currentReplica = node as ReplicaNode;
                    const currentText = currentReplica.getTextContent();
                    const currentWords = currentReplica.__words || [];
                    const startTime = currentReplica.__startTime;
                    const speaker = currentReplica.__speaker;

                    // Собираем данные из следующей ноды (nextNode)
                    const nextReplica = nextNode as ReplicaNode;
                    const nextText = nextReplica.getTextContent();
                    const nextWords = nextReplica.__words || [];
                    const endTime = nextReplica.__endTime; // Конечное время берем у второй ноды

                    // Объединяем данные
                    // Добавляем пробел между текстами, если они не пустые
                    const mergedText = [currentText, nextText].filter(Boolean).join(' ');
                    const mergedWords = [...currentWords, ...nextWords];

                    // Создаем новую объединенную ноду
                    const mergedNode = $createReplicaNode(
                        mergedText,
                        startTime,
                        endTime,
                        mergedWords,
                        speaker,
                    );

                    // Вставляем новую ноду перед текущей
                    node.insertBefore(mergedNode);

                    // Удаляем старые (разбитые) ноды
                    node.remove();
                    nextNode.remove();

                    // Перемещаемся в середину (в первый узел добавочной ноды)
                    selectNodeByIndex(editor, mergedNode, size, 'start');

                    return false;
                }
            }

            if (previousNode && $isReplicaNode(previousNode))
            {
                if (node.getTextContent().trim().length > 0)
                {
                    const textNodes = node.getAllTextNodes();
                    const previousNodeParagraph = previousNode.getChildren().find(n => $isParagraphNode(n));
                    previousNodeParagraph?.append(...textNodes || []);

                    const newTextNodes = previousNode.getTextNodes();
                    for (const [key, wordInfo] of node.getTextNodes())
                    {
                        newTextNodes.set(key, wordInfo);
                    }
                    previousNode.setTextNodes(newTextNodes);
                }
                else
                {
                    selectNodeByIndex(editor, previousNode, previousNode.getAllTextNodes().length - 1);
                }

                node.remove();

                return;
            }

            if (!previousNode) previousNode = node.getNextSibling();
            node.remove();
            previousNode?.selectEnd();
        });

        return () =>
        {
            unsubscribeShiftEnterListener();
            fullReplicaRemover();
            onTextNodeTransform();
            onParagraphTransform();
        };
    },
    [editor, focusedNode]);
    // TODO 25.07.2025: ^^^ implicit binding. The state is not used, but without dependence on it, everything breaks

    useEffect(() =>
    {
        const root = editor._rootElement;
        if (!root) return;

        const onEnterKeyPressed = (event: KeyboardEvent) =>
        {
            if (!(event.key === 'Enter' && !event.shiftKey)) return;

            // This function handles a separation of replica node in inside her
            editor.update(() =>
            {
                if (!focusedNode) return;

                const originNode = $getNodeByKey(focusedNode.getKey());
                if (!originNode || !$isReplicaNode(originNode)) return;

                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                const selectedNode = $getNodeByKey(selection.focus.key);
                if (!selectedNode) return;
                if (!$isTextNode(selectedNode)) return;

                const offset = selection.focus.offset;
                const previousSibs = selectedNode.getPreviousSiblings();
                const nextSibs = selectedNode.getNextSiblings();
                let text = selectedNode.getTextContent();

                const beforeCut = text.slice(0, offset);
                const afterCut = text.slice(offset);
                const beforeText = getTextFromNodes(previousSibs) + beforeCut;
                const afterText = afterCut + getTextFromNodes(nextSibs);
                let beforeWords: WordExtendedInfo[] = [];
                let afterWords: WordExtendedInfo[] = [];
                let beforeEnd = originNode.__endTime;
                let afterStart = originNode.__startTime;

                const words = originNode.__words;
                const textNodes = originNode.getTextNodes();
                if (words && words.length > 0)
                {
                    beforeWords = getWordsFromNodes(
                        previousSibs, textNodes, originNode.__startTime, beforeEnd,
                    );
                    afterWords = getWordsFromNodes(
                        nextSibs, textNodes, afterStart, originNode.__endTime,
                    );

                    beforeWords.push({
                        accuracy: 1,
                        word: beforeCut.trim(),
                        start_millis: beforeEnd,
                        end_millis: beforeEnd,
                    });

                    afterWords = [{
                        accuracy: 1,
                        word: afterCut.trim(),
                        start_millis: beforeEnd,
                        end_millis: beforeEnd,
                    }, ...afterWords];
                }

                const beforeNode = $createReplicaNode(
                    beforeText || ' ',
                    originNode.__startTime,
                    beforeEnd,
                    beforeWords,
                    originNode.getSpeaker(),
                );

                const afterNode = $createReplicaNode(
                    afterText || ' ',
                    afterStart,
                    originNode.__endTime,
                    afterWords,
                    originNode.getSpeaker(),
                );

                beforeNode.setTrafficLightMode(originNode.__trafficLightMode);
                afterNode.setTrafficLightMode(originNode.__trafficLightMode);

                originNode.insertBefore(beforeNode);
                const after = originNode.insertAfter(afterNode);
                originNode.remove();

                selectNodeByIndex(
                    editor,
                    after,
                    0,
                    'start',
                );
            });
        };

        root.addEventListener('keydown', onEnterKeyPressed);

        return () =>
        {
            root.removeEventListener('keydown', onEnterKeyPressed);
        };
    }, [editor, focusedNode]);

    const onReplicaNodeSelected = useCallback((selectedNode: ReplicaNode, focus: PointType, anchor: PointType) =>
    {
        if (selectedNode.getKey() !== focusedNode?.getKey())
        {
            setFocusedNode(selectedNode);
        }

        // TODO 26.07.2025: Wtf? Why 3?
        if (focus.offset === 3) return;

        const textNodes = selectedNode.getAllTextNodes();
        if (textNodes.length === 0) return;

        if (selected)
        {
            if (selected.offset === 0 && focus.offset === 4)
            {
                //@ts-ignore
                textNodes.at(-1).select();

                return;
            }

            const next = selectedNode.getNextSibling();
            if (focus.offset !== anchor.offset) return;

            if (next && $isReplicaNode(next))
            {
                if (focus.offset === 4)
                {
                    findAndSelectFirstParagraph(next);

                    return;
                }

                textNodes[0].select();

                return;
            }

            //@ts-ignore
            textNodes.at(-1).select();

            return;
        }

        textNodes[0].select();
    }, [focusedNode, selected]);

    const onEditorSelectionUpdate = useCallback((editorState: EditorState) =>
    {
        if (!editor.isEditable()) return;
        editor.update(() =>
        {
            if (!$isRangeSelection(editorState._selection)) return;

            const focus = editorState._selection.focus;
            const anchor = editorState._selection.anchor;
            const selectedNode = $getNodeByKey(focus.key);
            if (!selectedNode) return;

            setSelected(focus);

            if ($isReplicaNode(selectedNode))
            {
                onReplicaNodeSelected(selectedNode, focus, anchor);

                return;
            }

            const parent = selectedNode.getParent();
            if (!parent) return;

            if ($isParagraphNode(selectedNode) && parent.getKey() !== focusedNode?.getKey() && $isReplicaNode(parent))
            {
                setFocusedNode(parent);

                return;
            }

            const praParent = parent.getParent();
            if (!praParent) return;

            if ($isTextNode(selectedNode) && praParent.getKey() !== focusedNode?.getKey() && $isReplicaNode(praParent))
            {
                setFocusedNode(praParent);
            }
        }, { tag: HISTORY_MERGE_TAG });
    },
    [editor, focusedNode, onReplicaNodeSelected]);

    useEffect(() =>
    {
        const unsubscribeSelectionChange = editor.registerUpdateListener(
            ({ editorState }) =>
            {
                onEditorSelectionUpdate(editorState);

                return false;
            },
        );

        return () =>
        {
            unsubscribeSelectionChange();
        };
    },
    [editor, onEditorSelectionUpdate]);

    return null;
}

export default CustomNodesTransformPlugin;
