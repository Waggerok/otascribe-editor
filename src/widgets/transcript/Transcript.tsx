import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import replicaData from '@/shared/consts/replica.json';
import EditorProvider from './new-editor/EditorProvider';
import type { Sentence } from './new-editor/types';

interface TranscriptProps {
    contentValue: string;
    sentences?: Sentence[];
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue, sentences }) => {
    
    const displaySentences = sentences || replicaData.transcription_result.sentences;

    return (
        <TabsContent value={contentValue} className="h-full px-2 outline-none">
            <EditorProvider sentences={displaySentences} />
        </TabsContent>
    );
};
