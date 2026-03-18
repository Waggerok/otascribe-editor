import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeIcon, TranscribeIcon } from '@/shared/icons';
import { Resume, Transcript } from '@/widgets';
import { parseAsString, useQueryState } from 'nuqs';
import React from 'react';

const Home: React.FC = () => {

    const [activeTab, setActiveTab] = useQueryState("tab", parseAsString.withDefault("transcript"));

    const handleTabChange = (value: string) => {
        setActiveTab(value as 'transcript' | 'resume')
    }

    return (
        <div className='h-screen flex flex-col'>
            <h1 className='text-2xl text-primary p-4'>
                Otascribe Text Editor
            </h1>

            <div className="flex items-center justify-center p-4">
                <div className="flex flex-col w-full">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
                        <div className="flex justify-end w-full flex-wrap items-end gap-4">
                            <TabsList>
                                <TabsTrigger value="transcript">
                                    <TranscribeIcon /> Транскрибация
                                </TabsTrigger>
                                <TabsTrigger value="resume">
                                    <ResumeIcon /> Резюме
                                </TabsTrigger>
                            </TabsList>
                        </div>


                        <Card className="w-full p-6">
                            <Transcript contentValue="transcript" />
                            <Resume contentValue="resume" />
                        </Card>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Home;