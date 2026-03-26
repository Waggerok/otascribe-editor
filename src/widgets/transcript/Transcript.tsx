import { TabsContent } from '@/components/ui/tabs';
import React, { useMemo } from 'react';
import replicaData from '@/shared/consts/replica.json';
import EditorProvider from './new-editor/EditorProvider';
import { useProjectStore } from '@/app/stores/project.store';

interface TranscriptProps {
    contentValue: string;
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue }) => {
    
    const originalRecord = useProjectStore(state => state.originalRecord);

    const displaySentences = useMemo(() => {
        if (originalRecord?.sentenses && originalRecord.sentenses.length > 0) {
            return originalRecord.sentenses.map((s) => ({
                start_millis: s.start,
                end_millis: s.end,
                text: s.text,
                speaker_id: s.speaker?.id ?? 0,
                speaker_name: s.speaker?.name ?? null,
            }));
        }
        return '1'
    }, [originalRecord]);

    return (
        <TabsContent value={contentValue} className="h-full px-2 outline-none">
            <EditorProvider sentences={displaySentences} />
        </TabsContent>
    );
};
