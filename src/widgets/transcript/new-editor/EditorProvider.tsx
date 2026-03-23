import React, { useEffect, useMemo } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import { BasePlugins } from './plugins';
import type { Sentence, EditorPlugin } from './types';
import { useEditorStore } from './store/editorStore';

interface EditorProviderProps {
    sentences: Sentence[];
    plugins?: EditorPlugin[];
}

const EditorProvider: React.FC<EditorProviderProps> = ({ 
    sentences: initialSentences,
    plugins = BasePlugins
}) => {
    const setInitialData = useEditorStore(state => state.setInitialData);
    const sentencesLength = useEditorStore(state => state.sentences.length);

    useEffect(() => {
        setInitialData(initialSentences, plugins);
    }, [initialSentences, plugins, setInitialData]);

    const renderNodes = useMemo(() => {
        return Array.from({ length: sentencesLength }).map((_, index) => (
            <ReplicaNode key={index} index={index} />
        ));
    }, [sentencesLength]);

    return (
        <div className="flex flex-col pb-20 h-200">
            {renderNodes}
        </div>
    );
}

export default EditorProvider;