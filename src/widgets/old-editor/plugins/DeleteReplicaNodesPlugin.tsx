import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
} from 'lexical';
import React, {useCallback, useEffect} from 'react';

import {$isReplicaNode, ReplicaNode} from '@/widgets/editor';

const removeReplicaNodeAndMoveSelection = (replicaNode: ReplicaNode) =>
{
    // Преимущественно выбираем предыдущего соседа, если нет - следующего
    const previousNode = replicaNode.getPreviousSibling() ?? replicaNode.getNextSibling();
    replicaNode.remove();

    // Ставим курсор в конец ноды (если она есть)
    previousNode?.selectEnd();
};

const DeleteReplicaNodesPlugin: React.FC = () =>
{
    const [editor] = useLexicalComposerContext();

    const onDeleteCommand = useCallback(() =>
    {
        let isCancelled = true;

        editor.update(() =>
        {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            const nodes = selection.getNodes();
            const anchor = selection.anchor;
            const focus = selection.focus;

            if (nodes.length === 1 && anchor.offset === focus.offset && nodes[0].getNextSibling() === null)
            {
                isCancelled = false;

                return false;
            }

            for (const node of nodes)
            {
                const parent = node.getParent();

                // Если выделена сама ReplicaNode, удаляем её
                if ($isReplicaNode(node))
                {
                    removeReplicaNodeAndMoveSelection(node);
                }

                // Если выделен текст или параграф, и он единственный ребёнок внутри ReplicaNode
                else if (parent && $isReplicaNode(parent) && parent.getChildrenSize() === 1)
                {
                    removeReplicaNodeAndMoveSelection(parent);
                }
            }
        });

        return isCancelled;
    },
    [editor]);

    useEffect(() =>
    {
        const unsubscribeDeleteCommandListener = editor.registerCommand(
            KEY_DELETE_COMMAND,
            onDeleteCommand,
            COMMAND_PRIORITY_CRITICAL,
        );

        const unsubscribeBackspaceListener = editor.registerCommand(
            KEY_BACKSPACE_COMMAND,
            onDeleteCommand,
            COMMAND_PRIORITY_CRITICAL,
        );

        return () =>
        {
            unsubscribeDeleteCommandListener();
            unsubscribeBackspaceListener();
        };
    }, [editor, onDeleteCommand]);

    return null;
};

export default DeleteReplicaNodesPlugin;
