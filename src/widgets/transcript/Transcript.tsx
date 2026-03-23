import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import replicaData from '@/shared/consts/replica.json';
import EditorProvider from './new-editor/EditorProvider';

interface TranscriptProps {
    contentValue: string;
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue }) => {
    
    const sentences = replicaData.transcription_result.sentences;

    return (
        <TabsContent value={contentValue} className="h-full px-2 outline-none">
            <EditorProvider sentences={sentences} />
        </TabsContent>
    );
};
