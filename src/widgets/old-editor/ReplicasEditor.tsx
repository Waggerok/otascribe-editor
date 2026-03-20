import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
    $createRangeSelection,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    $isRootNode,
    HISTORY_MERGE_TAG,
    HISTORY_PUSH_TAG,
    UNDO_COMMAND,
    REDO_COMMAND,
} from 'lexical';
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

import CustomNodesTransformPlugin from './plugins/CustomNodesTransformPlugin';
import PlaybackHighlightPlugin from './plugins/PlaybackHighlightPlugin';
import SpoilerPlugin from './plugins/SpoilerPlugin';
import { useProjectStore } from '@/app/stores';
import { ReplicasProvider } from '@/features';
import { useHotkeys } from '@/shared';
import ClearNodeStylePlugin from '@/widgets/editor/plugins/ClearNodeStylePlugin';
import ClipboardManagerPlugin from '@/widgets/editor/plugins/ClipboardManagerPlugin';
import DeleteReplicaNodesPlugin from '@/widgets/editor/plugins/DeleteReplicaNodesPlugin';
import OverrideEditorBehaviourPlugin from '@/widgets/editor/plugins/OverrideEditorBehaviourPlugin';
import TrafficLightPlugin from '@/widgets/editor/plugins/TrafficLightPlugin';
import {
    AUTO_SAVE_TIMEOUT_MILLISECONDS,
    CUSTOM_NODE_STYLE_PREFIX,
    PLAYBACK_NODE_STYLE_PREFIX,
    SPOILER_NODE_STYLE_PREFIX,
} from '@/widgets/editor/utils/constants';
import {
    getRootReplicaNodes,
    hasAnyReplicas,
    hasEditorChanges,
    removeHighlightingFromSelection,
} from '@/widgets/editor/utils/editor';

import type { IRecord, Sentense, Speaker } from '@/entities';
import type { EditorState, LexicalEditor, SerializedEditorState } from 'lexical';

interface ReplicasEditorProperties
{
    record: IRecord,
    onAutoSave: (s: Sentense[], speakers: Speaker[]) => Promise<boolean>,
    onRemoveLastReplica: () => void,
    editMode?: boolean;
    autoSave?: boolean,
    hasChanges: boolean;
    setHasChanges: (value: boolean) => void;
    saveRef: RefObject<() => void>;
    cancelRef: RefObject<() => void>;
}

export function ReplicasEditor({
    record, editMode = false,
    onRemoveLastReplica,
    setHasChanges, saveRef, cancelRef,
    onAutoSave, autoSave = true,
}: ReplicasEditorProperties)
{
    const transcriptionTaskParameters = useProjectStore(state => state.transcriptionTaskParams);
    const editorReference = useRef<LexicalEditor>(null);
    const previousEditorStateReference = useRef<SerializedEditorState | null>(null);
    const backupEditorStateReference = useRef<EditorState | null>(null);
    const saveTimeoutReference = useRef<NodeJS.Timeout | null>(null);
    const [initSave, setInitSave] = useState(false);

    const hotkeys = useHotkeys();

    const saveChanges = useCallback(async (editorState: EditorState | null = null) =>
    {
        const editor = editorReference.current;
        if (!editor) return;
        if (!editorState) editorState = editor.getEditorState();

        const sentences: Sentense[] = [];
        const speakers: Speaker[] = [];

        editor.read(() =>
        {
            for (const node of getRootReplicaNodes())
            {
                const speaker = node.getSpeaker();
                const sentence: Sentense = {
                    // will be increased on every loop cycle (as a result, unique)
                    id: sentences.length,
                    text: node.getTextContent(),
                    start: node.getStartTime(),
                    end: node.getEndTime(),
                    words: node.generateWords(),
                    speaker,
                };

                sentences.push(sentence);
                if (!speakers.includes(speaker)) speakers.push(speaker);
            }
        });

        if (!onAutoSave) return;

        const success = await onAutoSave(sentences, speakers);
        if (!success) return;

        // Save editor state for next autosave diff-check
        backupEditorStateReference.current = editorState.clone();
    },
    [onAutoSave]);

    // Hotkeys for autosave
    useEffect(() =>
    {
        hotkeys.meta().code('KeyS').trigger(() =>
        {
            saveChanges();
        });
        hotkeys.ctrl().code('KeyS').trigger(() =>
        {
            saveChanges();
        });

        const undo = (e: KeyboardEvent) =>
        {
            e.preventDefault();
            const editor = editorReference.current;
            if (!editor) return;
            // eslint-disable-next-line unicorn/no-useless-undefined
            editor.dispatchCommand(UNDO_COMMAND, undefined);
        };

        const redo = (e: KeyboardEvent) =>
        {
            e.preventDefault();
            const editor = editorReference.current;
            if (!editor) return;
            // eslint-disable-next-line unicorn/no-useless-undefined
            editor.dispatchCommand(REDO_COMMAND, undefined);
        };

        hotkeys.meta().code('KeyZ').trigger(undo);
        hotkeys.ctrl().code('KeyZ').trigger(undo);

        hotkeys.meta().shift().code('KeyZ').trigger(redo);
        hotkeys.ctrl().shift().code('KeyZ').trigger(redo);
        hotkeys.ctrl().code('KeyY').trigger(redo);
    },
    [saveChanges, hotkeys]);

    // Auto save logic
    useEffect(() =>
    {
        // Save reference to pass it to the parent component
        saveRef.current = saveChanges;

        return () =>
        {
            if (!saveTimeoutReference.current) return;
            clearTimeout(saveTimeoutReference.current);
            saveChanges();
        };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    const undoChanges = () =>
    {
        const editor = editorReference.current;
        const backup = backupEditorStateReference.current;
        if (!editor || !backup) return;

        const newState = backup.clone();
        newState._selection = $createRangeSelection();

        editor.setEditorState(newState);
        setHasChanges(false);

        if (autoSave) return;

        // включаем/выключаем светофор у нод при откате состояния
        editor.update(() =>
        {
            for (const node of getRootReplicaNodes())
            {
                node.getWritable().setTrafficLightMode(
                    transcriptionTaskParameters.words_extended_information ?? false,
                );
            }
        });
    };

    const onChange = (editorState: EditorState, editor: LexicalEditor) =>
    {
        if (!editMode)
        {
            editor.update(() =>
            {
                let index = 1;
                for (const node of $getRoot().getAllTextNodes())
                {
                    const style = node.getStyle();
                    if (style.includes(PLAYBACK_NODE_STYLE_PREFIX)) continue;
                    if (style.includes(SPOILER_NODE_STYLE_PREFIX)) continue;
                    if (style.includes(CUSTOM_NODE_STYLE_PREFIX)) continue;

                    if (style.includes('accuracy'))
                    {
                        node.setStyle(`/* MODIF ${index} */; padding: 0.1em;`);
                        index++;
                    }
                }
            });

            return;
        }

        editorReference.current = editor;
        cancelRef.current = undoChanges;

        if (previousEditorStateReference.current === null)
        {
            // Если предыдущее состояние редактора пустое - значит мы только зашли на страницу.
            // Синхронизируем состояние и не выполняем логику поиска различий
            previousEditorStateReference.current = editorState.toJSON();
            backupEditorStateReference.current = editorState.clone();
            editor.update(() =>
            {}, { tag: HISTORY_PUSH_TAG });

            return;
        }

        editor.update(() =>
        {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) removeHighlightingFromSelection(selection);

            if (!hasAnyReplicas(editorState))
            {
                for (const nodeInfo of editorState._nodeMap)
                {
                    const node = nodeInfo[1];
                    if (!$isRootNode(node)) node.remove();
                }

                editor.setEditable(false);
                onRemoveLastReplica();
            }
        }, { tag: HISTORY_MERGE_TAG }); // чтобы работал ctrl+z на подсвеченных нодах

        if (hasEditorChanges(editorState, previousEditorStateReference.current))
        {
            if (!initSave)
            {
                setInitSave(true);

                return;
            }

            if (backupEditorStateReference.current === null)
            {
                backupEditorStateReference.current = editorState.clone();
            }

            previousEditorStateReference.current = editorState.clone().toJSON();

            // Debounce for auto save
            if (saveTimeoutReference.current)
            {
                clearTimeout(saveTimeoutReference.current);
            }

            if (autoSave)
            {
                saveTimeoutReference.current = setTimeout(async () =>
                {
                    if (!editorReference.current) return;
                    const currentState = editorReference.current.getEditorState();
                    await saveChanges(currentState);
                    previousEditorStateReference.current = currentState.toJSON();
                }, AUTO_SAVE_TIMEOUT_MILLISECONDS);

                return;
            }

            setHasChanges(true);
        }
    };

    return (
        <div className="w-full relative">
            <ReplicasProvider record={record} editMode={editMode}>
                <div className="relative">
                    <RichTextPlugin
                        contentEditable={<ContentEditable />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin onChange={onChange} />

                    {
                        editMode && (
                            <>
                                <HistoryPlugin delay={300} />
                                <ClearNodeStylePlugin />
                                <TrafficLightPlugin />
                                <DeleteReplicaNodesPlugin />
                                <OverrideEditorBehaviourPlugin />
                            </>
                        )
                    }

                    <PlaybackHighlightPlugin />
                    <SpoilerPlugin />
                    <CustomNodesTransformPlugin />
                    <ClipboardManagerPlugin />
                </div>
            </ReplicasProvider>
        </div>
    );
}
