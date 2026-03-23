import React from 'react';
import { ClockIcon, MessagesSquareIcon, OctagonMinusIcon, Redo2Icon, SaveIcon, Undo2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useEditorStore } from './store/editorStore';

export const Menu: React.FC = () => {

    const historyLength = useEditorStore(state => state.history.length);
    const {showTimings, toggleTimings, showUsers, toggleUsers, undo, redo, historyIndex} = useEditorStore();
    
        const canUndo = historyIndex > 0;
        const canRedo = historyIndex < historyLength - 1;

    return (
        <div className="sticky bg-card -top-6 z-1 flex items-center gap-2 pt-6 mb-4">
            <ButtonGroup>
                <Button variant="outline" onClick={undo} disabled={!canUndo}>
                    <Undo2Icon />
                </Button>
                <Button variant="outline" onClick={redo} disabled={!canRedo}>
                    <Redo2Icon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outline" className={showTimings ? 'text-primary' : ''} onClick={toggleTimings}>
                    <ClockIcon />
                </Button>
                <Button variant="outline" className={showUsers ? 'text-primary' : ''} onClick={toggleUsers}>
                    <MessagesSquareIcon />
                </Button>
                <Button variant="outline">
                    <OctagonMinusIcon />
                </Button>
                <Button variant="outline">
                    <SaveIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
