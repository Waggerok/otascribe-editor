import { create } from 'zustand';

import { loadProjectOptions, saveProjectOptions } from '@/shared/utils';
import type { OtaProject, ProjectLastOptions, RecentProject } from '@/shared/generated/api/generated';
import type { IRecord } from '@/shared/types/transcription/record';

type AutoSaveState =
    'Нет изменений' |
    'Идёт сохранение...' |
    'Сохранено' |
    'Ошибка сохранения' |
    'Автосохранение отключено' | string;

export type PlaybackHighlightMode = 'replica' | 'word';

interface State
{
    currentProject: OtaProject | undefined;
    transcriptionTaskParams: ProjectLastOptions &
    {
        speakers: string[] | null;
    };
    timeMarks: boolean;
    editorAutosave: boolean
    originalRecord: IRecord | undefined;
    editableRecord: IRecord | undefined;
    projectInFetch: boolean;
    lastErrorCode?: number;
    autoSaveState: AutoSaveState;
    obsceneWords: boolean
    playbackHighlight: boolean,
    playbackHighlightMode: PlaybackHighlightMode,
    projects: RecentProject[]
}

type Actions = {
    setCurrentProject: (project: OtaProject | undefined) => void;
    setTranscriptionTaskParams: (parameters: Partial<ProjectLastOptions>) => void;
    setTimeMarks: (timeMarks: boolean) => void;
    setEditorAutosave: (editorAutosave: boolean) => void
    setOriginalRecord: (record: IRecord | undefined) => void;
    setEditableRecord: (record: IRecord | undefined) => void;
    reset: () => void;
    loadOptions: () => void;
    setAutoSaveState: (value: AutoSaveState) => void
    setPlaybackHighlight: (value: boolean) => void
    setPlaybackHighlightMode: (value: PlaybackHighlightMode) => void
    setObsceneWords: (value: boolean) => void
    setProjects: (projects: RecentProject[]) => void;
};

const initialState: State = {
    currentProject: undefined,
    editorAutosave: true,
    transcriptionTaskParams:
    {
        force_language: null,
        audio_type: null,
        is_diarization: true,
        num_speakers: null,
        speakers: [],
        suppress_numerals: false,
        noise_reduction: false,
        words_extended_information: true,
        detect_obscene_words: false,
    },
    timeMarks: false,
    originalRecord: undefined,
    editableRecord: undefined,
    projectInFetch: false,
    lastErrorCode: undefined,
    autoSaveState: 'Нет изменений',
    playbackHighlight: false,
    playbackHighlightMode: 'replica',
    obsceneWords: true,
    projects: [],
};

export const useProjectStore = create<State & Actions>((set, get) =>
    ({
        ...initialState,
        setCurrentProject: (project) =>
        {
            if (project && project.project_id)
            {
                const lastAutoSave = localStorage.getItem(`project-auto-save-${project.project_id}`);
                if (lastAutoSave) set({ autoSaveState: lastAutoSave });
            }

            return set({ currentProject: project });
        },

        setEditorAutosave: (editorAutosave) =>
        {
            const projectId = get().currentProject?.project_id;
            saveProjectOptions(projectId, { editorAutosave });
            if (editorAutosave && get().autoSaveState === 'Автосохранение отключено')
                set({ autoSaveState: 'Нет изменений' });

            if (!editorAutosave) set({ autoSaveState: 'Автосохранение отключено' });
            set({ editorAutosave });
        },

        setTranscriptionTaskParams: (partialParameters) =>
        {
            const current = get().transcriptionTaskParams;
            const projectId = get().currentProject?.project_id;

            const updated = { ...current, ...partialParameters };

            saveProjectOptions(projectId, {
                diarization: updated.is_diarization,
                words_extended_information: updated.words_extended_information,
            });

            set({ transcriptionTaskParams: updated });
        },

        setTimeMarks: (timeMarks) =>
        {
            const projectId = get().currentProject?.project_id;
            saveProjectOptions(projectId, { timeMarks });
            set({ timeMarks });
        },

        setOriginalRecord: (record) =>
            set({ originalRecord: record }),

        setEditableRecord: (record) =>
            set({ editableRecord: record }),

        reset: () =>
        {
            set(initialState);
        },

        loadOptions: () =>
        {
            const {
                currentProject,
                setEditorAutosave,
                setTimeMarks,
                setTranscriptionTaskParams,
                transcriptionTaskParams,
            } = get();

            const saved = loadProjectOptions(currentProject?.project_id);
            if (!saved) return;

            if (typeof saved.editorAutosave === 'boolean') setEditorAutosave(saved.editorAutosave);
            if (typeof saved.timeMarks === 'boolean') setTimeMarks(saved.timeMarks);

            setTranscriptionTaskParams({
                is_diarization: saved.diarization ?? transcriptionTaskParams.is_diarization,
                words_extended_information: saved.words_extended_information ?? transcriptionTaskParams.words_extended_information,
            });
        },

        autoSaveState: 'Нет изменений',

        setAutoSaveState: (value) =>
        {
            const projectId = get().currentProject?.project_id;
            if (projectId) localStorage.setItem(`project-auto-save-${projectId}`, value);

            return set({ autoSaveState: value });
        },
        setPlaybackHighlight: (value) => set({ playbackHighlight: value }),
        setPlaybackHighlightMode: (value) => set({ playbackHighlightMode: value }),
        setObsceneWords: (obsceneWords) => set({ obsceneWords }),
        setProjects: (projects) => set({ projects }),
    }));
