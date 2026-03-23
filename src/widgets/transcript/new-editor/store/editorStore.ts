import { create } from 'zustand';
import type { EditorState, Sentence, EditorPlugin } from '../types';

export interface SpeakerInfo {
    id: number;
    name: string;
}

export interface EditorStoreState extends EditorState {
    showUsers: boolean;
    showTimings: boolean;
    history: Sentence[][];
    historyIndex: number;
    undo: () => void;
    redo: () => void;
    pushHistory: (sentences: Sentence[]) => void;
    toggleUsers: () => void;
    toggleTimings: () => void;
    setInitialData: (sentences: Sentence[], plugins: EditorPlugin[]) => void;
    updateSpeaker: (index: number, speakerId: number, speakerName: string | null) => void;
    renameSpeaker: (speakerId: number, newName: string) => void;
    deleteSpeaker: (speakerId: number) => void;
    getUniqueSpeakers: () => SpeakerInfo[];
}

export const useEditorStore = create<EditorStoreState>((set, get) => ({
    showUsers: true,
    showTimings: true,
    toggleTimings: () => set((state) => ({ showTimings: !state.showTimings })),
    toggleUsers: () => set((state) => ({ showUsers: !state.showUsers })),
    sentences: [],
    history: [],
    historyIndex: -1,
    activeNode: null,
    plugins: [],

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
        // Remove future history if we're not at the end
        const currentHistory = state.history.slice(0, state.historyIndex + 1);
        return {
            history: [...currentHistory, newSentences],
            historyIndex: currentHistory.length
        };
    }),

    setInitialData: (sentences, plugins) => set({ 
        sentences, 
        plugins,
        history: [sentences],
        historyIndex: 0
    }),

    updateSpeaker: (index, speakerId, speakerName) => {
        const state = get();
        const newSentences = [...state.sentences];
        newSentences[index] = {
            ...newSentences[index],
            speaker_id: speakerId,
            speaker_name: speakerName
        };
        state.pushHistory(newSentences);
        set({ sentences: newSentences });
    },

    renameSpeaker: (speakerId, newName) => {
        const state = get();
        const newSentences = state.sentences.map(s => 
            s.speaker_id === speakerId 
                ? { ...s, speaker_name: newName }
                : s
        );
        state.pushHistory(newSentences);
        set({ sentences: newSentences });
    },

    deleteSpeaker: (speakerId) => {
        const state = get();
        const speakersMap = new Map<number, string | null>();
        state.sentences.forEach(s => {
            if (!speakersMap.has(s.speaker_id)) {
                speakersMap.set(s.speaker_id, s.speaker_name);
            }
        });
        
        const allIds = Array.from(speakersMap.keys());
        if (allIds.length <= 1) {
            return; // Can't delete the last speaker
        }
        
        const fallbackId = allIds.find(id => id !== speakerId) ?? allIds[0];
        const fallbackName = speakersMap.get(fallbackId) || null;
        
        const newSentences = state.sentences.map(s => 
            s.speaker_id === speakerId 
                ? { ...s, speaker_id: fallbackId, speaker_name: fallbackName }
                : s
        );
        state.pushHistory(newSentences);
        set({ sentences: newSentences });
    },

    getUniqueSpeakers: () => {
        const state = get();
        const speakersMap = new Map<number, string>();
        state.sentences.forEach(s => {
            if (!speakersMap.has(s.speaker_id)) {
                speakersMap.set(s.speaker_id, s.speaker_name || `C${s.speaker_id + 1}`);
            }
        });
        return Array.from(speakersMap.entries()).map(([id, name]) => ({ id, name }));
    },

    setActiveNode: (node) => set({ activeNode: node }),

    updateSentence: (index, newHtml) => {
        const state = get();
        const newSentences = [...state.sentences];
        newSentences[index] = {
            ...newSentences[index],
            text: newHtml
        };
        state.pushHistory(newSentences);
        set({ sentences: newSentences });
    },

    splitSentence: (index, htmlBefore, htmlAfter) => {
        const state = get();
        const currentSentence = state.sentences[index];
        const newSentences = [...state.sentences];
        
        newSentences[index] = {
            ...currentSentence,
            text: htmlBefore
        };
        
        newSentences.splice(index + 1, 0, {
            ...currentSentence,
            text: htmlAfter
        });
        
        state.pushHistory(newSentences);
        set({ 
            sentences: newSentences,
            activeNode: { index: index + 1, position: 'start' }
        });
    },

    mergeWithPrevious: (index, htmlToMerge) => {
        const state = get();
        if (index > 0) {
            const newSentences = [...state.sentences];
            const prevSentence = newSentences[index - 1];
            
            let mergedHtml = prevSentence.text;
            let spaceAdded = 0;
            
            const cleanPrev = mergedHtml.replace(/<[^>]*>?/gm, '');
            const cleanMerge = htmlToMerge.replace(/<[^>]*>?/gm, '');
            
            if (cleanPrev.length > 0 && cleanMerge.length > 0 && !cleanPrev.endsWith(' ') && !cleanMerge.startsWith(' ')) {
                mergedHtml += ' ' + htmlToMerge;
                spaceAdded = 1;
            } else {
                mergedHtml += htmlToMerge;
            }
            
            const newCursorPos = prevSentence.text.replace(/<[^>]*>?/gm, '').length + spaceAdded;

            newSentences[index - 1] = {
                ...prevSentence,
                text: mergedHtml
            };

            newSentences.splice(index, 1);
            state.pushHistory(newSentences);
            set({
                sentences: newSentences,
                activeNode: { index: index - 1, position: newCursorPos }
            });
        }
    },

    navigateUp: (index) => {
        if (index > 0) {
            set({ activeNode: { index: index - 1, position: 'end' } });
        }
    },

    navigateDown: (index) => {
        const state = get();
        if (index < state.sentences.length - 1) {
            set({ activeNode: { index: index + 1, position: 'end' } });
        }
    }
}));
