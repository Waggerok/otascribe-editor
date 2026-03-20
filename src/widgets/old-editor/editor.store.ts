import { $getRoot, type NodeKey, ParagraphNode, TextNode } from 'lexical';
import { create } from 'zustand';

import { $createReplicaNode, ActionsNode, AvatarNode, ReplicaNode, TimingNode } from '@/features';
import { SpoilerNode } from '@/widgets/editor/nodes/SpoilerNode';

import type { IRecord, Sentense, Speaker } from '@/entities';
import type { WordExtendedInfo } from '@/shared/generated/api/generated';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';

export interface EditableTranscriptionResult
{
    language_code: string;
    sentences: Sentense[];
}

type SpeakerMenu =
    {
        speaker: Speaker,
        nodeKey: NodeKey,
        trigger: HTMLElement
    };

interface EditorStore
{
    speakers: Speaker[];
    editMode: boolean;
    setSpeakers: (speakers: Speaker[]) => void;
    onForceUpdate?: (speakers: Speaker[], sentences: Sentense[]) => void;
    onTextChange?: (id: number, text: string, words: WordExtendedInfo[]) => void;
    onUndo?: (sentenses: Sentense[]) => void;
    speakerMenu: SpeakerMenu | null;
    setSpeakerMenu: (speakerMenu: SpeakerMenu | null) => void;
}

export const generateInitialConfig = (transcribation: IRecord, editMode = false) =>
{
    const sentences: Sentense[] = [];
    const speakers: Speaker[] = [];
    const speakerIds: number[] = [];

    const newNodesRaw = transcribation.sentenses.map((sentense) =>
    {
        let speaker;
        const speakerId = sentense.speaker ? sentense.speaker.id : 0;

        if (speakerIds.includes(speakerId))
        {
            speaker = speakers[speakerIds.indexOf(speakerId)];
        }
        else
        {
            let name = sentense.speaker?.name || `Собеседник ${speakerId}`;
            if (speakerId === 0 && !sentense.speaker) name = 'Неизвестный собеседник';
            speaker = { id: speakerId, name };
            speakers.push(speaker);
            speakerIds.push(speakerId);
        }

        sentences.push({
            id: sentense.id,
            text: sentense.text,
            start: sentense.start,
            end: sentense.end,
            words: sentense.words,
            speaker,
        });

        return {
            text: sentense.text,
            start: sentense.start,
            end: sentense.end,
            words: sentense.words,
            speaker,
        };
    });

    const initialConfig: InitialConfigType = {
        namespace: 'Transcription Editor',
        theme: {
            root: 'min-h-[200px] focus:outline-none',
        },
        onError: () =>
        {},
        nodes: [
            ParagraphNode,
            TextNode,
            ReplicaNode,
            AvatarNode,
            TimingNode,
            ActionsNode,
            SpoilerNode,
        ],
        editorState: () =>
        {
            const root = $getRoot();
            root.clear();

            const newNodes = newNodesRaw.map((rawNode) =>
                $createReplicaNode(
                    rawNode.text,
                    rawNode.start,
                    rawNode.end,
                    rawNode.words,
                    rawNode.speaker,
                ));

            root.append(...newNodes);
        },
        editable: editMode,
    };

    return { initialConfig, speakers, sentences };
};

export const useEditorStore = create<EditorStore>((set) =>
    ({
        speakers: [],
        editMode: false,
        setSpeakers: (speakers) =>
            set({ speakers }),
        speakerMenu: null,
        setSpeakerMenu: (speaker) =>
            set({ speakerMenu: speaker }),
    }));
