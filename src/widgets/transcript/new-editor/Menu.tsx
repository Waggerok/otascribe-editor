import React from 'react';
import { CaptionsIcon, ChevronDown, ClockIcon, MessagesSquareIcon, OctagonMinusIcon, Redo2Icon, SaveIcon, Undo2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useEditorStore } from './store/editorStore';
import { HighlightIcon } from '@/shared';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
        <div className="flex items-center gap-2">
            <ButtonGroup>
                <Button variant="outline" onClick={undo} disabled={!canUndo}>
                    <Undo2Icon />
                </Button>
                <Button variant="outline" onClick={redo} disabled={!canRedo}>
                    <Redo2Icon />
                </Button>
            </ButtonGroup>

            <div className="flex items-center">
                <Button variant="outline" className='p-2 transition-none rounded-r-none border-r-0'>
                    <CaptionsIcon />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="p-1 px-1.5 transition-none rounded-l-none"
                            variant='outline'
                        >
                            <ChevronDown className='size-3' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                        <DropdownMenuItem>
                            Выделение реплики
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Выделение слова
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ButtonGroup>
                <Button variant="outline" className={showTimings ? 'text-primary' : ''} onClick={toggleTimings}>
                    <ClockIcon />
                </Button>
                <Button variant="outline" className={showUsers ? 'text-primary' : ''} onClick={toggleUsers}>
                    <MessagesSquareIcon />
                </Button>
                <Button variant="outline">
                    <HighlightIcon />
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
