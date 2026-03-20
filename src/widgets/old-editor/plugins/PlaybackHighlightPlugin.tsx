import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useCallback, useEffect, useState } from 'react';

import { useAudioStore, useProjectStore } from '@/app/stores';
import { ReplicaNode } from '@/widgets/editor';
import { getRootReplicaNodes } from '@/widgets/editor/utils/editor';

import type { WordExtendedInfo } from '@/shared/generated/api/generated';
import type { TextNode } from 'lexical';

const PlaybackHighlightPlugin: React.FC = () =>
{
    const [editor] = useLexicalComposerContext();

    const playbackHighlight = useProjectStore(state => state.playbackHighlight);
    const playbackHighlightMode = useProjectStore(state => state.playbackHighlightMode);
    const wavesurfer = useAudioStore(state => state.wavesurfer);

    const [focusedNode, setFocusedNode] = useState<ReplicaNode | null>(null);
    const [activeInfo, setActiveInfo] = useState<WordExtendedInfo & { node: TextNode } | null>(null);

    const onPlaybackTimeChanged = useCallback(() =>
    {
        if (!wavesurfer) return;
        const time = wavesurfer.getCurrentTime() * 1000;

        // Если режим слова и текущий фокус уже на той же реплике, просто обновим подсветку слова
        if (playbackHighlightMode === 'word' && focusedNode && focusedNode.__startTime <= time && time < focusedNode.__endTime)
        {
            if (activeInfo && activeInfo.start_millis <= time && time <= activeInfo.end_millis) return;

            editor.update(() =>
            {
                const info = focusedNode.highlightWordAtTime(time, activeInfo);
                if (!info) return;
                setActiveInfo(info);
            });

            return;
        }

        if (focusedNode && focusedNode.__startTime <= time && time < focusedNode.__endTime) return;

        editor.update(() =>
        {
            for (const currentNode of getRootReplicaNodes())
            {
                const start = currentNode.getStartTime();
                const end = currentNode.getEndTime();

                if (time >= start && time < end)
                {
                    if (focusedNode && focusedNode.__key === currentNode.__key) return;
                    if (focusedNode) focusedNode.disablePlaybackHighlight();

                    currentNode.enablePlaybackHighlight(playbackHighlightMode, time);
                    setFocusedNode(currentNode);

                    return;
                }
            }
        });
    }, [wavesurfer, playbackHighlightMode, focusedNode, editor, activeInfo]);

    useEffect(() =>
    {
        if (!playbackHighlight)
        {
            if (focusedNode)
            {
                editor.update(() =>
                {
                    focusedNode.disablePlaybackHighlight();
                });
            }
            setFocusedNode(null);

            return;
        }

        if (!wavesurfer) return;
        if (editor.isEditable()) return;

        const unsubscribeFromTimeUpdate = wavesurfer.on('timeupdate', onPlaybackTimeChanged);
        onPlaybackTimeChanged();

        return () =>
        {
            unsubscribeFromTimeUpdate();
        };
    },
    [editor, wavesurfer, playbackHighlight, playbackHighlightMode, focusedNode, onPlaybackTimeChanged]);

    return null;
};

export default PlaybackHighlightPlugin;
