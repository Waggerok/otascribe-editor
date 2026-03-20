import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    COPY_COMMAND,
    CUT_COMMAND,
    PASTE_COMMAND,
} from 'lexical';
import React, {useEffect} from 'react';

import {normalizeTextWhitespaces} from '@/shared/utils';

const ClipboardManagerPlugin: React.FC = () =>
{
    const [editor] = useLexicalComposerContext();

    useEffect(() =>
    {
        const unsubscribeCopyListener = editor.registerCommand(COPY_COMMAND, (event) =>
        {
            if (!editor.isEditable()) return false;
            if (!(event instanceof ClipboardEvent)) return false;
            event.stopPropagation();
            event.preventDefault();
            if (!$getSelection()) return true;
            const text = $getSelection()?.getTextContent();
            if (!text) return true;
            navigator.clipboard.writeText(normalizeTextWhitespaces(text));

            return true;
        },
        COMMAND_PRIORITY_CRITICAL);

        const unsubscribeCutListener = editor.registerCommand(
            CUT_COMMAND,
            (event: ClipboardEvent) =>
            {
                if (!editor.isEditable())
                {
                    return false;
                }

                event.preventDefault();
                event.stopPropagation();

                const selection = $getSelection();
                if (!$isRangeSelection(selection))
                {
                    return true;
                }

                navigator.clipboard.writeText(normalizeTextWhitespaces(selection.getTextContent()));

                editor.update(() =>
                {
                    for (const node of selection.getNodes())
                    {
                        node.remove();
                    }
                });

                return true;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        // TODO 20.07.2025: This should block pasting when all editor nodes selected, but does not work as well
        //  Rewrite or delete this
        const unsubscribePasteListener = editor.registerCommand(
            PASTE_COMMAND,
            () =>
            {
                const selection = $getSelection();
                if (!selection) return true;
                const nodes = selection.getNodes();
                const size = editor.getEditorState()._nodeMap.size - 1;

                return nodes.length === size;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        return () =>
        {
            unsubscribeCopyListener();
            unsubscribeCutListener();
            unsubscribePasteListener();
        };
    },
    [editor]);

    return null;
};

export default ClipboardManagerPlugin;
