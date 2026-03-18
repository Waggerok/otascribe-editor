import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

interface TranscriptProps {
    contentValue : string;
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue }) =>
{

    return (
        <TabsContent value={contentValue}>
            1
        </TabsContent>
    );
}
