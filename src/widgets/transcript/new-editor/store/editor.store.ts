import { create } from "zustand";
import type { Speaker } from "../types";
import type { Sentense } from "@/shared/types/transcription/record";

interface State {
    speakers: Speaker[]
    history: Sentense[][];
    historyIndex: number;

    // activeNode: { index: number, position: FocusPosition } | null;
    // setActiveNode: (node: { index: number, position: FocusPosition } | null) => void;

    // updateSentence: (index: number, newHtml: string) => void;
    // splitSentence: (index: number, htmlBefore: string, htmlAfter: string) => void;
    // mergeWithPrevious: (index: number, htmlToMerge: string) => void;
    // navigateUp: (index: number) => void;
    // navigateDown: (index: number) => void;
    // plugins: EditorPlugin[];

};

interface Actions {
    setSpeakers: (speakers: Speaker[]) => void;
    undo: () => void;
    redo: () => void;
    pushHistory: (sentences: Sentense[]) => void;
}

export const useEditorStore = create<State & Actions>((set, get) =>
({
    speakers: [],
    history : [],
    historyIndex : -1,
    setSpeakers: (speakers) => set({ speakers }),
    undo: () => set((state) => {
        if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
                sentences: state.history[newIndex],
                historyIndex: newIndex
            };
        }
        return state;
    }),

    redo: () => set((state) => {
        if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
                sentences: state.history[newIndex],
                historyIndex: newIndex
            };
        }
        return state;
    }),

    pushHistory: (newSentences) => set((state) => {
        const currentHistory = state.history.slice(0, state.historyIndex + 1);
        return {
            history: [...currentHistory, newSentences],
            historyIndex: currentHistory.length
        };
    }),
}));
