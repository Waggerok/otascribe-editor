import React, { useMemo, type RefObject } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import type { IRecord } from '@/shared/types/transcription/record';

interface EditorProviderProps {
    record: IRecord
    saveReference: RefObject<() => void>;
    cancelReference: RefObject<() => void>;
    hasChanges: boolean;
    setHasChanges: (value: boolean) => void;
    onRemoveLastReplica: () => void;
}

const EditorProvider: React.FC<EditorProviderProps> = ({ cancelReference, saveReference, hasChanges, setHasChanges, record, onRemoveLastReplica }) =>
{
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