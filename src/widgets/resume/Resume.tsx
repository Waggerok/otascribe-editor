import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

interface ResumeProps {
    contentValue : string;
}

export const Resume: React.FC<ResumeProps> = ({ contentValue }) =>
{

    return (
       <TabsContent value={contentValue}>
            2
        </TabsContent>
    );
}
