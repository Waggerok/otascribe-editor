import React from 'react';
import { CaptionsIcon, ChevronDown, ClockIcon, MessagesSquareIcon, OctagonMinusIcon, Redo2Icon, SaveIcon, Undo2Icon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useEditorStore } from './store/editorStore';
import { useProjectStore } from '@/app/stores/project.store';
import { HighlightIcon } from '@/shared';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Menu: React.FC = () => {

    const undo = useEditorStore(state => state.undo);
    const redo = useEditorStore(state => state.redo);

    const canUndo = useEditorStore(state => state.historyIndex > 0);
    const canRedo = useEditorStore(state => state.historyIndex < state.history.length - 1);

    const timeMarks = useProjectStore(state => state.timeMarks);
    const setTimeMarks = useProjectStore(state => state.setTimeMarks);
    
    const playbackHighlight = useProjectStore(state => state.playbackHighlight);
    const setPlaybackHighlight = useProjectStore(state => state.setPlaybackHighlight);
    
    const playbackHighlightMode = useProjectStore(state => state.playbackHighlightMode);
    const setPlaybackHighlightMode = useProjectStore(state => state.setPlaybackHighlightMode);
    
    const obsceneWords = useProjectStore(state => state.obsceneWords);
    const setObsceneWords = useProjectStore(state => state.setObsceneWords);
    
    const editorAutosave = useProjectStore(state => state.editorAutosave);
    const setEditorAutosave = useProjectStore(state => state.setEditorAutosave);

    const setTranscriptionTaskParameters = useProjectStore(state => state.setTranscriptionTaskParams);
    const transcriptionTaskParameters = useProjectStore(state => state.transcriptionTaskParams);
    
    const toggleUsers = () => setTranscriptionTaskParameters({ is_diarization: !transcriptionTaskParameters.is_diarization })

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
                <Button 
                    variant="outline" 
                    className={`p-2 transition-none rounded-r-none border-r-0 ${playbackHighlight ? 'text-primary' : ''}`}
                    onClick={() => setPlaybackHighlight(!playbackHighlight)}
                >
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
                        <DropdownMenuItem onClick={() => setPlaybackHighlightMode('replica')} className="flex justify-between">
                            Выделение реплики {playbackHighlightMode === 'replica' && <CheckIcon className="size-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPlaybackHighlightMode('word')} className="flex justify-between">
                            Выделение слова {playbackHighlightMode === 'word' && <CheckIcon className="size-4" />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ButtonGroup>
                <Button variant="outline" className={timeMarks ? 'text-primary' : ''} onClick={() => setTimeMarks(!timeMarks)}>
                    <ClockIcon />
                </Button>
                <Button variant="outline" className={transcriptionTaskParameters.is_diarization ? 'text-primary' : ''} onClick={toggleUsers}>
                    <MessagesSquareIcon />
                </Button>
                <Button variant="outline" className={playbackHighlight ? 'text-primary' : ''} onClick={() => setPlaybackHighlight(!playbackHighlight)}>
                    <HighlightIcon />
                </Button>
                <Button variant="outline" className={obsceneWords ? 'text-primary' : ''} onClick={() => setObsceneWords(!obsceneWords)}>
                    <OctagonMinusIcon />
                </Button>
                <Button variant="outline" className={editorAutosave ? 'text-primary' : ''} onClick={() => setEditorAutosave(!editorAutosave)}>
                    <SaveIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
