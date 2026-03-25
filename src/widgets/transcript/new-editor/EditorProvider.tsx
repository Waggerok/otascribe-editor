import React, { useEffect, useMemo } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import { BasePlugins } from './plugins';
import type { Sentence, EditorPlugin } from './types';
import { useEditorStore } from './store/editorStore';
import { Menu } from './Menu';

interface EditorProviderProps {
    sentences: Sentence[];
    plugins?: EditorPlugin[];
}

const EditorProvider: React.FC<EditorProviderProps> = ({
    sentences: initialSentences,
    plugins = BasePlugins
}) => {

    const sentencesLength = useEditorStore(state => state.sentences.length);
    const setInitialData = useEditorStore(state => state.setInitialData);
    
    useEffect(() => {
        setInitialData(initialSentences, plugins);
    }, [initialSentences, plugins, setInitialData]);

    const renderNodes = useMemo(() => {
        return Array.from({ length: sentencesLength }).map((_, index) => (
            <ReplicaNode key={index} index={index} />
        ));
    }, [sentencesLength]);

    return (
        <div className="flex flex-col h-200">
            <div className="flex flex-col overflow-auto overflow-x-hidden">
                {renderNodes}
            </div>
        </div>
    );
}

export default EditorProvider;