import React, { useMemo, useEffect } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import type { EditorPlugin } from './types';
import { useProjectStore } from '@/app/stores/project.store';
import { useEditorStore } from './store/editorStore';

interface EditorProviderProps {
    plugins?: EditorPlugin[];
}

const EditorProvider: React.FC<EditorProviderProps> = ({ plugins }) => {

    const originalRecord = useProjectStore(state => state.originalRecord);
    const editableRecord = useProjectStore(state => state.editableRecord);
    
    const record = editableRecord || originalRecord;

    useEffect(() => {
        useEditorStore.setState({ plugins: plugins || [] });
    }, [plugins]);

    useEffect(() => {
        if (originalRecord) {
            useEditorStore.setState({ 
                history: [editableRecord || originalRecord],
                historyIndex: 0
            });
        } else {
            useEditorStore.setState({ history: [], historyIndex: -1 });
        }
    }, [originalRecord]);

    const renderNodes = useMemo(() => {
        if (!record) return null;
        return record.sentenses.map((sentence, index) => {
            return <ReplicaNode key={sentence.id ?? index} index={index} sentence={sentence} />;
        });
    }, [record]);

    return (
        <div className="flex flex-col h-200">
            <div className="flex flex-col overflow-auto overflow-x-hidden">
                {renderNodes}
            </div>
        </div>
    );
}

export default EditorProvider;