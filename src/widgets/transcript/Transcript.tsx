import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import EditorProvider from './new-editor/EditorProvider';
import { BasePlugins } from './new-editor/plugins';

interface TranscriptProps {
    contentValue: string;
}

export const Transcript: React.FC<TranscriptProps> = ({ contentValue }) => {
    
    return (
        <TabsContent value={contentValue} className="h-full px-2 outline-none">
            <EditorProvider plugins={BasePlugins} />
        </TabsContent>
    );
};
