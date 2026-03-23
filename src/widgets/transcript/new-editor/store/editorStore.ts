import { create } from 'zustand';
import type { EditorContextState, Sentence, EditorPlugin } from '../types';

export interface SpeakerInfo {
    id: number;
    name: string;
}

export interface EditorStoreState extends EditorContextState {
    setInitialData: (sentences: Sentence[], plugins: EditorPlugin[]) => void;
    updateSpeaker: (index: number, speakerId: number, speakerName: string | null) => void;
    renameSpeaker: (speakerId: number, newName: string) => void;
    deleteSpeaker: (speakerId: number) => void;
    getUniqueSpeakers: () => SpeakerInfo[];
}

export const useEditorStore = create<EditorStoreState>((set, get) => ({
    sentences: [],
    activeNode: null,
    plugins: [],

    setInitialData: (sentences, plugins) => set({ sentences, plugins }),

    updateSpeaker: (index, speakerId, speakerName) => set((state) => {
        const newSentences = [...state.sentences];
        newSentences[index] = {
            ...newSentences[index],
            speaker_id: speakerId,
            speaker_name: speakerName
        };
        return { sentences: newSentences };
    }),

    renameSpeaker: (speakerId, newName) => set((state) => {
        const newSentences = state.sentences.map(s => 
            s.speaker_id === speakerId 
                ? { ...s, speaker_name: newName }
                : s
        );
        return { sentences: newSentences };
    }),

    deleteSpeaker: (speakerId) => set((state) => {
        const speakersMap = new Map<number, string | null>();
        state.sentences.forEach(s => {
            if (!speakersMap.has(s.speaker_id)) {
                speakersMap.set(s.speaker_id, s.speaker_name);
            }
        });
        
        const allIds = Array.from(speakersMap.keys());
        if (allIds.length <= 1) {
            return state; // Can't delete the last speaker
        }
        
        const fallbackId = allIds.find(id => id !== speakerId) ?? allIds[0];
        const fallbackName = speakersMap.get(fallbackId) || null;
        
        const newSentences = state.sentences.map(s => 
            s.speaker_id === speakerId 
                ? { ...s, speaker_id: fallbackId, speaker_name: fallbackName }
                : s
        );
        return { sentences: newSentences };
    }),

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

    updateSentence: (index, newHtml) => set((state) => {
        const newSentences = [...state.sentences];
        newSentences[index] = {
            ...newSentences[index],
            text: newHtml
        };
        return { sentences: newSentences };
    }),

    splitSentence: (index, htmlBefore, htmlAfter) => set((state) => {
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
        
        return { 
            sentences: newSentences,
            activeNode: { index: index + 1, position: 'start' }
        };
    }),

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
