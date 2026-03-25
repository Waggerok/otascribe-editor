
type ProjectOptions = {
    timeMarks?: boolean;
    editorAutosave?: boolean;
    diarization?: boolean;
    words_extended_information?: boolean;
};

const getStorageKey = (projectId: string | undefined): string | null =>
    projectId ? `options-buttons-${projectId}` : null;

/**
 * Получить сохранённые опции проекта
 */
export const loadProjectOptions = (projectId: string | undefined): ProjectOptions | null =>
{
    const key = getStorageKey(projectId);
    if (!key) return null;

    try
    {
        const raw = localStorage.getItem(key);

        return raw ? JSON.parse(raw) : null;
    }
    catch
    {
        return null;
    }
};

/**
 * Обновить сохранённые опции проекта (partial merge)
 */
export const saveProjectOptions = (
    projectId: string | undefined,
    updated: ProjectOptions,
): void =>
{
    const key = getStorageKey(projectId);
    if (!key) return;

    try
    {
        const previous = loadProjectOptions(projectId) || {};
        localStorage.setItem(key, JSON.stringify({ ...previous, ...updated }));
    }
    catch
    {
    // Optional: handle errors
    }
};
