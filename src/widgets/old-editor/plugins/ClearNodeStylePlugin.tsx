import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getSelection, $isRangeSelection, $isTextNode} from 'lexical';
import React, {useCallback, useEffect} from 'react';

import { useHotkeys } from '@/shared';
import {CUSTOM_NODE_STYLE_PREFIX, PLAYBACK_NODE_STYLE_PREFIX, SPOILER_NODE_STYLE_PREFIX} from '@/widgets/editor/utils/constants';

const ClearNodeStylePlugin: React.FC = () =>
{

    const [editor] = useLexicalComposerContext();
    const hotkeys = useHotkeys();

    const clearSelectionStyle = useCallback(() =>
    {
        if (!editor) return;

        editor.update(() =>
        {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            for (const node of selection.getNodes())
            {
                if (!$isTextNode(node)) continue;
                const style = node.getStyle();

                if (style.includes(PLAYBACK_NODE_STYLE_PREFIX)) continue;
                if (style.includes(SPOILER_NODE_STYLE_PREFIX)) continue;
                if (style.includes(CUSTOM_NODE_STYLE_PREFIX)) continue;
                node.setStyle('');
            }
        });
    }, [editor]);

    // Hot key for clearing node style (remove accuracy styling)
    useEffect(() =>
    {
        hotkeys.meta().shift().code('KeyU').trigger(() =>
        {
            clearSelectionStyle();

        });
        hotkeys.ctrl().shift().code('KeyU').trigger(() =>
        {
            clearSelectionStyle();

        });
    }, [clearSelectionStyle, hotkeys]);

    return null;
};

export default ClearNodeStylePlugin;
