import { useProjectStore } from '@/app/stores/project.store';
import { Button } from '@/components/ui/button';
import { FileCheck, BookCheck, LoaderCircle, OctagonAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

const AutoSaveState =
    {
        SAVING: 'Идёт сохранение...',
        NO_CHANGES: 'Нет изменений',
        LAST_SAVED: 'Последнее сохранение в',
        ERROR: 'Ошибка сохранения',
        DISABLED: 'Автосохранение отключено',
    } as const;

type AutoSaveStateValue = typeof AutoSaveState[keyof typeof AutoSaveState];

const STATE_COLORS =
    {
        [AutoSaveState.SAVING]: 'text-yellow-600 dark:text-yellow-400/80',
        [AutoSaveState.NO_CHANGES]: 'text-secondary-foreground/70',
        [AutoSaveState.LAST_SAVED]: 'text-green-600 dark:text-green-400/80',
        [AutoSaveState.ERROR]: 'text-destructive',
        [AutoSaveState.DISABLED]: 'text-secondary-foreground/60',
    } as Record<AutoSaveStateValue, string>;

interface AutoSaveStatusProperties {
    state: string;
    color: string;
}

/**
 * Component, which shows status of saving smth in editor
 *
 * @param {string} state - state of status: saving, error, no changes, last saved
 * @param {string} color - color
 *
 */
const SaveMenu: React.FC<AutoSaveStatusProperties> = ({ state, color }) => {

    const editorAutosave = useProjectStore(state => state.editorAutosave);
    if (!state) return null;

    const getIcon = () => {
        if (state.startsWith(AutoSaveState.LAST_SAVED)) return <FileCheck className='size-4' />;
        if (state === AutoSaveState.NO_CHANGES) return <BookCheck className='size-4' />;
        if (state === AutoSaveState.SAVING) return <LoaderCircle className="animate-spin size-4" />;
        if (state === AutoSaveState.ERROR) return <OctagonAlert className='size-4' />;

        return null;
    };

    return (
        <div className="flex justify-between">
            <span className={`flex items-center gap-2 ${color} text-xs md:text-sm`}>
                {getIcon()}
                {state}
            </span>

            {!editorAutosave &&
                <div className="flex items-center gap-2">
                    <Button variant='outline'>Отмена</Button>
                    <Button variant='outline'>Сохранить</Button>
                </div>
            }
        </div>
    );
};

export const useAutoSaveState = () => {
    const [textColor, setTextColor] = useState('text-secondary-foreground/70');
    const autoSaveState = useProjectStore(state => state.autoSaveState);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTextColor('text-secondary-foreground/60 dark:text-secondary-foreground/40');
        }, 2000);

        const matchedState = Object.values(AutoSaveState).find(state =>
            autoSaveState.startsWith(state),
        ) as AutoSaveStateValue | undefined;

        if (matchedState) setTextColor(STATE_COLORS[matchedState]);

        return () =>
            clearTimeout(timer);
    }, [autoSaveState]);

    return { textColor, autoSaveState };
};

export default SaveMenu;