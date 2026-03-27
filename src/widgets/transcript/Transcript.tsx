import { TabsContent } from '@/components/ui/tabs';
import React, { useRef, useState } from 'react';
import EditorProvider from './new-editor/EditorProvider';
import { BasePlugins } from './new-editor/plugins';
import SaveMenu, { useAutoSaveState } from './new-editor/SaveMenu';
import { useProjectStore } from '@/app/stores/project.store';

interface TranscriptProps {
    contentValue: string;
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue }) => {

    const { textColor, autoSaveState } = useAutoSaveState();

    const saveReference = useRef<any>(null);
    const cancelReference = useRef<any>(null);

    const originalRecord = useProjectStore(state => state.originalRecord);
    const editableRecord = useProjectStore(state => state.editableRecord);
    const setEditableRecord = useProjectStore(state => state.setEditableRecord);

    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const handleSave = () => {
        if (!saveReference.current) return;
        saveReference.current();
    };

    const handleCancel = () => {
        if (!cancelReference.current) return;
        cancelReference.current();
    };

    const handleEmptyEditor = () =>
    {
        setHasChanges(false);
        setEditableRecord({ sentenses: [], speakers: [] });
    };

    const record = editableRecord! || originalRecord!;

    return (
        <TabsContent value={contentValue} className="h-full px-2 outline-none">
            <EditorProvider
                record={record}
                saveReference={saveReference}
                cancelReference={cancelReference}
                setHasChanges={setHasChanges}
                hasChanges={hasChanges}
                onRemoveLastReplica={handleEmptyEditor}
            />
            <SaveMenu
                color={textColor}
                state={autoSaveState}
                handleCancel={handleCancel}
                handleSave={handleSave}
            />
        </TabsContent>
    );
};
