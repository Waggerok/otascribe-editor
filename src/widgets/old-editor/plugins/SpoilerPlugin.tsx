import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $isTextNode } from 'lexical';
import React, { useCallback, useEffect } from 'react';

import { $isSpoilerNode } from '../nodes/SpoilerNode';
import { useProjectStore } from '@/app/stores';
import { getRootReplicaNodes } from '@/widgets/editor/utils/editor';

const SpoilerPlugin: React.FC = () =>
{
    const [editor] = useLexicalComposerContext();
    const obsceneWords = useProjectStore(state =>
        state.obsceneWords);

    const switchObsceneWordsDisplaying = useCallback(() =>
    {
        // eslint-disable-next-line sonarjs/cognitive-complexity
        editor.update(() =>
        {
            for (const node of getRootReplicaNodes())
            {
                for (const [key, word] of node.getObsceneWords().entries())
                {
                    if (!word.is_obscene) continue;
                    const spoiler = $getNodeByKey(key);
                    if (!spoiler) continue;
                    if (obsceneWords && $isSpoilerNode(spoiler)) continue;
                    if (!obsceneWords && $isTextNode(spoiler)) continue;
                    node.switchNodeTypeByObscene(spoiler, !obsceneWords);
                }
            }
        });
    },
    [editor, obsceneWords]);

    useEffect(() =>
    {
        switchObsceneWordsDisplaying();
    },
    [switchObsceneWordsDisplaying]);

    return null;
};

export default SpoilerPlugin;
