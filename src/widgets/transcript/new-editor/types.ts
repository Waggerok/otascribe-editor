import React from 'react';

export interface Sentence {
    start_millis: number;
    end_millis: number;
    text: string;
    speaker_id: number;
    speaker_name: string | null;
}

export type FocusPosition = 'start' | 'end' | number | null;

export interface EditorNodeContext {
    index: number;
    sentence: Sentence;
    editorRef: React.RefObject<HTMLDivElement | null>;
}

export interface EditorPlugin {
    name: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, nodeCtx: EditorNodeContext, editorCtx: EditorContextState) => boolean | void;
    onPaste?: (e: React.ClipboardEvent<HTMLDivElement>, nodeCtx: EditorNodeContext, editorCtx: EditorContextState) => boolean | void;
    // return true to indicate the event was handled and propagation should stop
}

export interface EditorContextState {
    sentences: Sentence[];
    activeNode: { index: number, position: FocusPosition } | null;
    setActiveNode: (node: { index: number, position: FocusPosition } | null) => void;
    updateSentence: (index: number, newHtml: string) => void;
    splitSentence: (index: number, htmlBefore: string, htmlAfter: string) => void;
    mergeWithPrevious: (index: number, htmlToMerge: string) => void;
    navigateUp: (index: number) => void;
    navigateDown: (index: number) => void;
    plugins: EditorPlugin[];
}