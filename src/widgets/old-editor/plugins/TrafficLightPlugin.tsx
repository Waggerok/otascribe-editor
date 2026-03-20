import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import React, {useEffect} from 'react';

import { useProjectStore } from '@/app/stores';
import {getRootReplicaNodes} from '@/widgets/editor/utils/editor';

const TrafficLightPlugin: React.FC = () =>
{
    const transcriptionTaskParameters = useProjectStore(state =>
        state.transcriptionTaskParams);

    const [editor] = useLexicalComposerContext();

    // Use effect for switch traffic light mode (display or not)
    useEffect(() =>
    {
        if (!transcriptionTaskParameters) return;

        editor.update(() =>
        {
            const trafficLightMode = transcriptionTaskParameters.words_extended_information;

            for (const node of getRootReplicaNodes())
            {
                node.getWritable().setTrafficLightMode(trafficLightMode ?? false);
            }
        });
    },
    [editor, transcriptionTaskParameters]);

    return null;
};

export default TrafficLightPlugin;
