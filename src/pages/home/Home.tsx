import { useProjectStore } from '@/app/stores/project.store';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ACCESS_TOKEN_KEY, LOGIN_KEY, PASSWORD_KEY } from '@/shared';
import api from '@/shared/generated/api';
import type { OtaProject } from '@/shared/generated/api/generated';
import { useProjects } from '@/shared/hooks/projects/use-projects';
import { ResumeIcon, TranscribeIcon } from '@/shared/icons';
import { Resume, Transcript } from '@/widgets';
import { Menu } from '@/widgets/transcript/new-editor/Menu';
import { ChevronDownIcon, DownloadIcon } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import type { Sentence } from '@/widgets/transcript/new-editor/types';

const Home: React.FC = () => {

    //Core Logic of editor

    const [activeTab, setActiveTab] = useQueryState("tab", parseAsString.withDefault("transcript"));

    const handleTabChange = (value: string) => {
        setActiveTab(value as 'transcript' | 'resume')
    };

    //Api logic

    const handleLogin = async () => {
        try {
            const res = await api.AuthorizationApi.loginForAccessTokenApiAuthLoginPost(
                navigator.userAgent,
                LOGIN_KEY,
                PASSWORD_KEY,
            )
            localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
        }
        catch (e) {
            console.error('Ошибка при входе', e);
        }
    };

    const { projects } = useProjects();
    const currentProject = useProjectStore(state => state.currentProject);
    const setCurrentProject = useProjectStore(state => state.setCurrentProject);

    // Локальное состояние для загруженных предложений
    const [projectSentences, setProjectSentences] = useState<Sentence[] | undefined>(undefined);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!currentProject?.project_id) return;
            try {
                const response = await api.ProjectsApi.getUserProjectApiProjectProjectIdGet(currentProject.project_id);
                const transcriptionData = response.data.editable_transcription_result || response.data.transcription_result;
                const sentences = transcriptionData?.sentences;
                
                if (sentences) {
                    const mappedSentences: Sentence[] = sentences.map((s) => ({
                        start_millis: s.start_millis ?? 0,
                        end_millis: s.end_millis ?? 0,
                        text: s.text ?? '',
                        speaker_id: s.speaker_id ?? 0,
                        speaker_name: s.speaker_name ?? null
                    }));
                    setProjectSentences(mappedSentences);
                } else {
                    setProjectSentences(undefined);
                }
            } catch (e) {
                console.error('Ошибка при получении деталей проекта', e);
            }
        };

        fetchProjectDetails();
    }, [currentProject?.project_id]);

    return (
        <div className='h-screen flex flex-col'>
            <div className="flex justify-between p-4">

                <div className="flex items-center gap-4">
                    <h1 className='text-2xl text-primary'>
                        Otascribe Text Editor
                    </h1>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                {currentProject ? currentProject.name : "Выберите проект"}
                                <ChevronDownIcon className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <DropdownMenuItem 
                                        key={project.project_id} 
                                        onClick={() => setCurrentProject(project as unknown as OtaProject)}
                                        className="cursor-pointer"
                                    >
                                        {project.name}
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>
                                    Нет доступных проектов
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button onClick={handleLogin}>
                    Login
                </Button>
            </div>

            <div className="flex items-center justify-center p-4">
                <div className="flex flex-col w-full">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
                        <Card className="flex w-full p-6 min-h-40">
                            <div className="flex justify-between">
                                {activeTab === 'transcript' ? <Menu /> : <div />}
                                <div className="flex gap-1">

                                    <ButtonGroup>
                                        {activeTab === 'transcript'
                                            ?
                                            <Button>
                                                <TranscribeIcon />
                                            </Button>
                                            :
                                            <Button>
                                                <ResumeIcon />
                                            </Button>
                                        }
                                        <Button>
                                            <DownloadIcon />
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
                            <Transcript contentValue="transcript" sentences={projectSentences} />
                            <Resume contentValue="resume" />
                        </Card>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Home;