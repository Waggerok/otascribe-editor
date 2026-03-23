import React from 'react';
import { ClockIcon, MessagesSquareIcon, OctagonMinusIcon, Redo2Icon, SaveIcon, Undo2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useEditorStore } from './store/editorStore';

export const Menu: React.FC = () => {

    const showTimings = useEditorStore(state => state.showTimings);
    const toggleTimings = useEditorStore(state => state.toggleTimings);
    const showUsers = useEditorStore(state => state.showUsers);
    const toggleUsers = useEditorStore(state => state.toggleUsers);
    const undo = useEditorStore(state => state.undo);
    const redo = useEditorStore(state => state.redo);
    
    const canUndo = useEditorStore(state => state.historyIndex > 0);
    const canRedo = useEditorStore(state => state.historyIndex < state.history.length - 1);

    return (
        <div className="bg-car flex items-center gap-2 mb-2">
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
