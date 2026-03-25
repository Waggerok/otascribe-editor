import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ACCESS_TOKEN_KEY, LOGIN_KEY, PASSWORD_KEY } from '@/shared';
import api from '@/shared/generated/api';
import { ResumeIcon, TranscribeIcon } from '@/shared/icons';
import { Resume, Transcript } from '@/widgets';
import { Menu } from '@/widgets/transcript/new-editor/Menu';
import { DownloadIcon } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import React from 'react';

const Home: React.FC = () => {

    const [activeTab, setActiveTab] = useQueryState("tab", parseAsString.withDefault("transcript"));

    const handleTabChange = (value: string) => {
        setActiveTab(value as 'transcript' | 'resume')
    };

    const handleLogin = async () => {
        try {
            const res = await api.AuthorizationApi.loginForAccessTokenApiAuthLoginPost(
                navigator.userAgent,
                LOGIN_KEY,
                PASSWORD_KEY,
            )
            await localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
        }
        catch (e) {
            console.error('Ошибка при входе', e);
        }
    };

    return (
        <div className='h-screen flex flex-col'>
            <div className="flex justify-between p-4">
                <h1 className='text-2xl text-primary'>
                    Otascribe Text Editor
                </h1>
                <Button onClick={handleLogin}>
                    Login
                </Button>
            </div>

            <div className="flex items-center justify-center p-4">
                <div className="flex flex-col w-full">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
                        <Card className="flex w-full p-6">
                            <div className="flex justify-between">
                                {activeTab === 'transcript' ? <Menu /> : <div />}
                                <div className="flex gap-1">

                                    <ButtonGroup>
                                        {activeTab === 'transcript' 
                                            ?
                                            <Button>
                                                <TranscribeIcon/>
                                            </Button>
                                            :
                                            <Button>
                                                <ResumeIcon/>
                                            </Button>
                                        }

                                        <Button>
                                            <DownloadIcon/>
                                        </Button>
                                    </ButtonGroup>
                                    
                                    <TabsList>
                                        <TabsTrigger value="transcript">
                                            <TranscribeIcon /> Транскрибация
                                        </TabsTrigger>
                                        <TabsTrigger value="resume">
                                            <ResumeIcon /> Резюме
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>
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