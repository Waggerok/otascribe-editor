import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, INSERT_PARAGRAPH_COMMAND} from 'lexical';
import React, {useEffect} from 'react';

import {SKIP_FORMATTING_EVENTS} from '@/widgets/editor/utils/constants';

const OverrideEditorBehaviourPlugin: React.FC = () =>
{
    const [editor] = useLexicalComposerContext();

    useEffect(() =>
    {
        const unsubscribeFormattingListener = editor.registerCommand(
            FORMAT_TEXT_COMMAND,
            (event) => SKIP_FORMATTING_EVENTS.has(event),
            COMMAND_PRIORITY_CRITICAL,
        );

        const unsubscribeEnterListener = editor.registerCommand(
            INSERT_PARAGRAPH_COMMAND,
            () => true, // перехватываем, но ничего не делаем
            COMMAND_PRIORITY_CRITICAL,
        );

        return () =>
        {
            unsubscribeFormattingListener();
            unsubscribeEnterListener();
        };
    },
    [editor]);

    return null;
};

export default OverrideEditorBehaviourPlugin;
