import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, PencilIcon, PlusCircleIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import type { SpeakerInfo } from '../store/editorStore';
import { AvatarNode } from './AvatarNode';
import { Button } from '@/components/ui/button';

interface SpeakerDropdownProps {
    sentenceIndex: number;
}

export const SpeakerDropdown: React.FC<SpeakerDropdownProps> = ({ sentenceIndex }) => {
    const updateSpeaker = useEditorStore(state => state.updateSpeaker);
    const renameSpeaker = useEditorStore(state => state.renameSpeaker);
    const deleteSpeaker = useEditorStore(state => state.deleteSpeaker);
    const getUniqueSpeakers = useEditorStore(state => state.getUniqueSpeakers);

    const speakerId = useEditorStore(state => state.sentences[sentenceIndex]?.speaker_id);
    const speakerName = useEditorStore(state => state.sentences[sentenceIndex]?.speaker_name);

    const [uniqueSpeakers, setUniqueSpeakers] = useState<SpeakerInfo[]>([]);
    const [editingSpeakerId, setEditingSpeakerId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");

    if (speakerId === undefined) return null;

    const currentSpeakerName = speakerName || `C${speakerId + 1}`;

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setUniqueSpeakers(getUniqueSpeakers());
            setEditingSpeakerId(null);
        }
    };

    const handleAddNewSpeaker = () => {
        const maxId = uniqueSpeakers.length > 0 ? Math.max(...uniqueSpeakers.map(s => s.id)) : 0;
        const newId = maxId + 1;
        const newName = `C${newId + 1}`;
        updateSpeaker(sentenceIndex, newId, newName);
    };

    const handleSaveEdit = (speakerId: number) => {
        if (editName.trim()) {
            renameSpeaker(speakerId, editName.trim());
            setUniqueSpeakers(getUniqueSpeakers());
        }
        setEditingSpeakerId(null);
    };

    const handleDelete = (speakerIdToDelete: number) => {
        deleteSpeaker(speakerIdToDelete);
        setUniqueSpeakers(getUniqueSpeakers());
    };

    return (
        <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <div className="flex select-none w-16 justify-start lg:pl-2 items-center py-0.5 rounded-lg transition-colors hover:bg-accent cursor-pointer">
                    <AvatarNode speaker={{ id: speakerId, name: currentSpeakerName }} />
                    <ChevronDownIcon className='size-4 mx-2 text-gray-400' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className='w-60'>
                <DropdownMenuLabel>Выберите спикера</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {uniqueSpeakers.map(speaker => {
                        const isEditing = editingSpeakerId === speaker.id;

                        return (
                            <DropdownMenuItem
                                key={speaker.id}
                                onSelect={(e) => {
                                    if (isEditing) {
                                        e.preventDefault();
                                        return;
                                    }
                                    const target = (e as Event & { originalEvent?: Event }).originalEvent?.target as HTMLElement;
                                    if (target && target.closest('.action-btn')) {
                                        e.preventDefault();
                                        return;
                                    }
                                    updateSpeaker(sentenceIndex, speaker.id, speaker.name);
                                }}
                                className={speaker.id === speakerId && !isEditing ? "bg-accent" : ""}
                            >
                                <div className="flex justify-between items-center gap-2 w-full">
                                    {isEditing ? (
                                        <>
                                            <input
                                                autoFocus
                                                type="text"
                                                className="flex-1 bg-transparent border border-input rounded px-2 py-1 text-sm outline-none"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyDown={(e) => {
                                                    e.stopPropagation();
                                                    if (e.key === 'Enter') handleSaveEdit(speaker.id);
                                                    if (e.key === 'Escape') setEditingSpeakerId(null);
                                                }}
                                            />
                                            <div className="flex gap-1 items-center action-btn">
                                                <Button size='icon-sm' variant='ghost' onClick={() => handleSaveEdit(speaker.id)} className="h-6 w-6">
                                                    <CheckIcon className="size-3" />
                                                </Button>
                                                <Button size='icon-sm' variant='ghost' onClick={() => setEditingSpeakerId(null)} className="h-6 w-6">
                                                    <XIcon className="size-3" />
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <AvatarNode speaker={speaker} />
                                                <span className="truncate">{speaker.name}</span>
                                            </div>
                                            <div className="flex gap-1 items-center action-btn">
                                                <Button
                                                    size='icon-sm'
                                                    variant='ghost'
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingSpeakerId(speaker.id);
                                                        setEditName(speaker.name);
                                                    }}
                                                >
                                                    <PencilIcon className="size-3" />
                                                </Button>
                                                <Button
                                                    size='icon-sm'
                                                    variant='ghost'
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    disabled={uniqueSpeakers.length <= 1}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(speaker.id);
                                                    }}
                                                >
                                                    <TrashIcon className="size-3" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAddNewSpeaker} className="cursor-pointer">
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <PlusCircleIcon className="size-4" />
                        <span>Новый спикер</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}