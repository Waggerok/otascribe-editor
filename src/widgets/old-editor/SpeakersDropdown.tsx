import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $getRoot, type LexicalNode } from 'lexical';
import { PencilIcon, PlusCircleIcon, XIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { $isAvatarNode, NodeAvatar } from './nodes/AvatarNode';
import { useEditorStore, useModalStore } from '@/app/stores';
import { $isReplicaNode } from '@/features';
import { m } from '@/shared/generated/paraglide/messages';
import { Button, Input } from '@/shared/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/shared/ui/CustomDropdownMenu';
import { firstOrDefault } from '@/shared/utils/arrays';
import {getRootReplicaNodes} from '@/widgets/editor/utils/editor';

import type { Sentense, Speaker } from '@/entities';

const findAvatarNode = (nodes: LexicalNode[]) =>
    nodes.find((c) => $isAvatarNode(c));

const SpeakersDropdown: React.FC = () =>
{
    const speakerMenu = useEditorStore(state =>
        state.speakerMenu);
    const setSpeakerMenu = useEditorStore(state =>
        state.setSpeakerMenu);

    const speakers = useEditorStore(state =>
        state.speakers);
    const setSpeakers = useEditorStore(state =>
        state.setSpeakers);
    const onForceUpdate = useEditorStore(state =>
        state.onForceUpdate);

    const openModal = useModalStore(state =>
        state.openModal);

    const [editor] = useLexicalComposerContext();
    const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
    const [newSpeakerName, setNewSpeakerName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const startEditing = (speaker: Speaker) =>
    {
        setEditingSpeaker(speaker);
        setNewSpeakerName(speaker.name);
        setError(null);
    };

    const cancelEditing = () =>
    {
        setEditingSpeaker(null);
        setNewSpeakerName('');
        setError(null);
    };

    const validateName = (name: string): boolean =>
    {
        if (!name.trim())
        {
            setError('Имя не может быть пустым');

            return false;
        }
        if (name.length > 30)
        {
            setError('Имя слишком длинное (макс. 30 символов)');

            return false;
        }
        setError(null);

        return true;
    };

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>, speaker: Speaker) =>
    {
        event.preventDefault();
        event.stopPropagation();
        startEditing(speaker);
    };

    const submitEdit = () =>
    {
        if (!editingSpeaker || !validateName(newSpeakerName)) return;

        const newSentences: Sentense[] = [];
        const updatedSpeakers = speakers.map(sp =>
            sp.id === editingSpeaker.id ? { ...sp, name: newSpeakerName.trim() } : sp,
        );

        const newSpeaker = { ...editingSpeaker, name: newSpeakerName.trim() };
        editor.update(() =>
        {
            const root = $getRoot();
            for (const node of root.getChildren())
            {
                if (!$isReplicaNode(node)) continue;
                const avatarNode = node.getChildren().find(c =>
                    $isAvatarNode(c));
                if (!avatarNode) continue;
                if (avatarNode.__speaker.id === editingSpeaker.id)
                {
                    node.getWritable().__speaker = newSpeaker;
                    avatarNode.setSpeaker(newSpeaker);
                }

                newSentences.push(node.toSentense());
            }
        });

        onForceUpdate?.(updatedSpeakers, newSentences);
        cancelEditing();
        setSpeakers(updatedSpeakers);
    };

    const handleSpeakerChange = useCallback((speaker: Speaker) =>
    {
        if (!speakerMenu) return;

        editor.update(() =>
        {
            const node = $getNodeByKey(speakerMenu.nodeKey);
            if (!node) return;
            if (!$isAvatarNode(node)) return;
            const replica = node.getParent();
            if (!replica) return;
            if (!$isReplicaNode(replica)) return;
            node.setSpeaker(speaker);
        });

        setSpeakerMenu({...speakerMenu, speaker});
    },
    [editor, speakerMenu, setSpeakerMenu]);

    const handleInsertSpeaker = useCallback(() =>
    {
        setSpeakers([
            ...speakers,
            { id: Date.now(), name: `Собеседник ${speakers.length + 1}` },
        ]);
    },
    [speakers, setSpeakers]);

    const listReference = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        if (listReference.current)
        {
            listReference.current.scrollTop = listReference.current.scrollHeight;
        }
    }, [speakers]);

    const handleRemoveSpeaker = useCallback((event: React.MouseEvent<HTMLButtonElement>, speakerForRemove: Speaker) =>
    {
        event.preventDefault();
        event.stopPropagation();
        setSpeakerMenu(null);
        openModal('alert',
            {
                title: m['modal.alert.delete.speaker_title'](),
                text: (
                    <>
                        {m['modal.alert.delete.speaker_text']({ speaker : speakerForRemove.name})}<br />
                        {m['modal.alert.delete.speaker_text_paragraph']()}
                    </>
                ),
                action: () =>
                {
                    const newSpeakers = speakers.filter((s) => s.id !== speakerForRemove.id);
                    const newSentences: Sentense[] = [];

                    editor.update(() =>
                    {
                        const speakerReplace = firstOrDefault(newSpeakers, { id: Date.now(), name: 'Собеседник 1' });

                        for (const child of getRootReplicaNodes())
                        {
                            const avatar = findAvatarNode(child.getChildren());
                            if (!avatar) continue;

                            if (avatar.getLatest().__speaker.id === speakerForRemove.id)
                                avatar.setSpeaker(speakerReplace);

                            newSentences.push(child.toSentense());
                        }

                        if (!newSpeakers.includes(speakerReplace))
                            newSpeakers.push(speakerReplace);

                        editor.blur();
                    });

                    onForceUpdate?.(newSpeakers, newSentences);
                    setSpeakers(newSpeakers);
                },
                actionText: m['ui.button.delete'](),
                closeText: m['ui.button.cancel'](),
            });
    },
    [setSpeakerMenu, openModal, speakers, editor, onForceUpdate, setSpeakers]);

    const handleSpeakerClose = (isOpen: boolean) =>
    {
        if (!isOpen) setSpeakerMenu(null);
    };

    const renderSpeakers = () =>
    {
        const renderSpeaker = (sp: Speaker) =>
        {
            if (editingSpeaker && editingSpeaker.id === sp.id)
            {
                return (
                    <div className="flex flex-col w-[96%] gap-1 m-auto my-2">
                        <Input
                            className="h-8 px-2 mt-2"
                            value={newSpeakerName}
                            onChange={(event) =>
                            {
                                setNewSpeakerName(event.target.value);
                                validateName(event.target.value);
                            }}
                            onKeyDown={(event) =>
                            {
                                if (event.key === 'Enter') submitEdit();
                                if (event.key === 'Escape') cancelEditing();
                            }}
                            autoFocus
                        />
                        {error && <div className="text-xs text-red-500">{error}</div>}
                        <div className="flex justify-end gap-1 mt-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(event) =>
                                {
                                    event.stopPropagation();
                                    cancelEditing();
                                }}
                                className="h-6 px-2"
                            >
                                {m['ui.button.cancel']()}
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={(event) =>
                                {
                                    event.stopPropagation();
                                    submitEdit();
                                }}
                                className="h-6 px-2"
                                disabled={!!error}
                            >
                                {m['ui.button.save']()}
                            </Button>
                        </div>
                    </div>
                );
            }

            return (
                <DropdownMenuItem
                    key={sp.id}
                    className={`flex justify-between items-center ${speakerMenu?.speaker.id === sp.id ? 'bg-accent' : ''}`}
                    onClick={(event) =>
                    {
                        event.preventDefault();

                        return !editingSpeaker && handleSpeakerChange(sp);
                    }}
                >
                    <div className='flex gap-2 items-center min-w-40 max-w-60'>
                        <NodeAvatar speaker={sp} />
                        <div className='truncate'>{sp.name}</div>
                    </div>
                    <div className='text-gray-400'>
                        <Button
                            className='size-6 px-1.5'
                            variant='ghost'
                            onClick={(event) =>
                                handleEdit(event, sp)}
                        >
                            <PencilIcon className='size-3' />
                        </Button>
                        <Button
                            className='size-6 px-1.5'
                            variant='ghost'
                            onClick={(event) =>
                                handleRemoveSpeaker(event, sp)}
                        >
                            <XIcon className='size-3' />
                        </Button>
                    </div>
                </DropdownMenuItem>
            );
        };

        return speakers.map(speaker => renderSpeaker(speaker));
    };

    return (
        speakerMenu && <DropdownMenu
            openState={true}
            setOpenState={handleSpeakerClose}
            trigger={speakerMenu.trigger}
        >
            <DropdownMenuContent align='start' className='z-100 overflow-visible bg-background min-w-[16rem] rounded-md p-1'>
                <DropdownMenuLabel className='flex gap-4 items-center justify-between py-0.5 pr-0.5'>
                    <span>{m['page.project.editor.speaker_dropdown_title']()}</span>
                    <Button variant='ghost' className='size-6' onClick={handleInsertSpeaker}>
                        <PlusCircleIcon className='size-4 text-gray-400' />
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto" ref={listReference}>
                    {renderSpeakers()}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SpeakersDropdown;
