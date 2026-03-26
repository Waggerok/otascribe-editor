import React from 'react';
import type { Sentense } from '@/shared/types/transcription/record';

export interface Speaker {
    id: number
    name: string
}

export type FocusPosition = 'start' | 'end' | number | null;

export interface EditorNodeContext {
    index: number;
    sentence: Sentense;
    editorRef: React.RefObject<HTMLDivElement | null>;
}

export interface EditorPlugin {
    name: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, nodeCtx: EditorNodeContext, editorState: EditorState) => boolean | void;
    onPaste?: (e: React.ClipboardEvent<HTMLDivElement>, nodeCtx: EditorNodeContext, editorState: EditorState) => boolean | void;
    // return true to indicate the event was handled and propagation should stop
}

export interface EditorState {
    activeNode: { index: number, position: FocusPosition } | null;
    setActiveNode: (node: { index: number, position: FocusPosition } | null) => void;
    updateSentence: (index: number, newHtml: string) => void;
    splitSentence: (index: number, htmlBefore: string, htmlAfter: string) => void;
    mergeWithPrevious: (index: number, htmlToMerge: string) => void;
    navigateUp: (index: number) => void;
    navigateDown: (index: number) => void;
    plugins: EditorPlugin[];
}