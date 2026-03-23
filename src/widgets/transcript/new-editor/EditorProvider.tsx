import React, { useEffect, useMemo } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import { BasePlugins } from './plugins';
import type { Sentence, EditorPlugin } from './types';
import { useEditorStore } from './store/editorStore';
import { ClockIcon, MessagesSquareIcon, OctagonMinusIcon, Redo2Icon, SaveIcon, Undo2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

interface EditorProviderProps {
    sentences: Sentence[];
    plugins?: EditorPlugin[];
}

const EditorProvider: React.FC<EditorProviderProps> = ({
    sentences: initialSentences,
    plugins = BasePlugins
}) => {

    const sentencesLength = useEditorStore(state => state.sentences.length);
    const historyLength = useEditorStore(state => state.history.length);
    const {setInitialData, showTimings, toggleTimings, showUsers, toggleUsers, undo, redo, historyIndex} = useEditorStore();

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < historyLength - 1;

    useEffect(() => {
        setInitialData(initialSentences, plugins);
    }, [initialSentences, plugins, setInitialData]);

    const renderNodes = useMemo(() => {
        return Array.from({ length: sentencesLength }).map((_, index) => (
            <ReplicaNode key={index} index={index} />
        ));
    }, [sentencesLength]);

    return (
        <div className="flex flex-col h-200 relative">
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
            <div className="flex flex-col pb-20">
                {renderNodes}
            </div>
        </div>
    );
}

export default EditorProvider;