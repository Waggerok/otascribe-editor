import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { type ReactNode, useEffect } from 'react';

import SpeakersDropdown from './SpeakersDropdown';
import { generateInitialConfig, useEditorStore } from '@/app/stores/editor.store';

import type { IRecord } from '@/entities';

interface ReplicasProviderProperties
{
    children: ReactNode;
    record: IRecord,
    editMode?: boolean;
}

export const ReplicasProvider = ({
    children,
    record,
    editMode = false,
    ...properties
}: ReplicasProviderProperties) =>
{
    const { initialConfig, speakers } = generateInitialConfig(record, editMode);

    useEffect(() =>
    {
        useEditorStore.setState({
            speakers,
            editMode,
            ...properties,
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
        <LexicalComposer initialConfig={initialConfig} >
            {children}
            <SpeakersDropdown />
        </LexicalComposer>
    );
};
