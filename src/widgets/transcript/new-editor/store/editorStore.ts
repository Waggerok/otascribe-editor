import { create } from 'zustand';
import type { EditorState } from '../types';
import { useProjectStore } from '@/app/stores/project.store';
import type { Sentense, IRecord } from '@/shared/types/transcription/record';

export interface SpeakerInfo {
    id: number;
    name: string;
}

export interface EditorStoreState extends EditorState {
    history: IRecord[];
    historyIndex: number;
    undo: () => void;
    redo: () => void;
    pushHistory: (record: IRecord) => void;
    updateSpeaker: (index: number, speakerName: string | null) => void;
    renameSpeaker: (speakerId: number, newName: string) => void;
    deleteSpeaker: (speakerId: number) => void;
    getUniqueSpeakers: () => SpeakerInfo[];
}

const getRecord = (): IRecord | undefined => {
    const state = useProjectStore.getState();
    return state.editableRecord || state.originalRecord;
};

const updateRecord = (newSentenses: Sentense[]) => {
    const currentRecord = getRecord();
    if (!currentRecord) return;
    
    const newRecord: IRecord = {
        ...currentRecord,
        sentenses: newSentenses
    };
    
    useProjectStore.getState().setEditableRecord(newRecord);
    useEditorStore.getState().pushHistory(newRecord);
};

export const useEditorStore = create<EditorStoreState>((set, get) => ({
    history: [],
    historyIndex: -1,
    activeNode: null,
    plugins: [],

    undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            useProjectStore.getState().setEditableRecord(state.history[newIndex]);
            set({ historyIndex: newIndex });
        }
    },

    redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            useProjectStore.getState().setEditableRecord(state.history[newIndex]);
            set({ historyIndex: newIndex });
        }
    },

    pushHistory: (newRecord) => set((state) => {
        const currentHistory = state.history.slice(0, state.historyIndex + 1);
        return {
            history: [...currentHistory, newRecord],
            historyIndex: currentHistory.length
        };
    }),

    updateSpeaker: (index,  speakerName) => {
        const record = getRecord();
        if (!record) return;
        const newSentences = [...record.sentenses];
        newSentences[index] = {
            ...newSentences[index],
            speaker: { id: index, name: speakerName || `Собеседник ${index + 1}` }
        };
        updateRecord(newSentences);
    },

    renameSpeaker: (speakerId, newName) => {
        const record = getRecord();
        if (!record) return;
        const newSentences = record.sentenses.map(s => 
            s.speaker?.id === speakerId 
                ? { ...s, speaker: { ...s.speaker, id: speakerId, name: newName } }
                : s
        );
        updateRecord(newSentences);
    },

    deleteSpeaker: (speakerId) => {
        const record = getRecord();
        if (!record) return;
        const speakersMap = new Map<number, string>();
        record.sentenses.forEach(s => {
            if (s.speaker && !speakersMap.has(s.speaker.id)) {
                speakersMap.set(s.speaker.id, s.speaker.name);
            }
        });
        
        const allIds = Array.from(speakersMap.keys());
        if (allIds.length <= 1) return; // Can't delete the last speaker
        
        const fallbackId = allIds.find(id => id !== speakerId) ?? allIds[0];
        const fallbackName = speakersMap.get(fallbackId) || `Собеседник ${fallbackId + 1}`;
        
        const newSentences = record.sentenses.map(s => 
            s.speaker?.id === speakerId 
                ? { ...s, speaker: { id: fallbackId, name: fallbackName } }
                : s
        );
        updateRecord(newSentences);
    },

    getUniqueSpeakers: () => {
        const record = getRecord();
        if (!record) return [];
        const speakersMap = new Map<number, string>();
        record.sentenses.forEach(s => {
            const sId = s.speaker?.id ?? 0;
            if (!speakersMap.has(sId)) {
                speakersMap.set(sId, s.speaker?.name || `Собеседник ${sId + 1}`);
            }
        });
        return Array.from(speakersMap.entries()).map(([id, name]) => ({ id, name }));
    },

    setActiveNode: (node) => set({ activeNode: node }),

    updateSentence: (index, newHtml) => {
        const record = getRecord();
        if (!record) return;
        const newSentences = [...record.sentenses];
        newSentences[index] = {
            ...newSentences[index],
            text: newHtml
        };
        updateRecord(newSentences);
    },

    splitSentence: (index, htmlBefore, htmlAfter) => {
        const record = getRecord();
        if (!record) return;
        const currentSentence = record.sentenses[index];
        const newSentences = [...record.sentenses];
        
        newSentences[index] = {
            ...currentSentence,
            text: htmlBefore
        };
        
        newSentences.splice(index + 1, 0, {
            ...currentSentence,
            id: Date.now(), // Generate a new ID or use a better strategy
            text: htmlAfter
        });
        
        updateRecord(newSentences);
        set({ activeNode: { index: index + 1, position: 'start' } });
    },

    mergeWithPrevious: (index, htmlToMerge) => {
        if (index <= 0) return;
        const record = getRecord();
        if (!record) return;
        
        const newSentences = [...record.sentenses];
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
            text: mergedHtml,
            end: newSentences[index].end // Update end time to include the merged sentence
        };

        newSentences.splice(index, 1);
        updateRecord(newSentences);
        set({ activeNode: { index: index - 1, position: newCursorPos } });
    },

    navigateUp: (index) => {
        if (index > 0) {
            set({ activeNode: { index: index - 1, position: 'end' } });
        }
    },

    navigateDown: (index) => {
        const record = getRecord();
        if (!record) return;
        if (index < record.sentenses.length - 1) {
            set({ activeNode: { index: index + 1, position: 'end' } });
        }
    }
}));
