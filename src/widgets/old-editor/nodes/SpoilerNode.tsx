import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, DecoratorNode } from 'lexical';
import { memo, type ReactNode, useState } from 'react';

import { getParentReplicaNodeRecursively } from '@/widgets/editor/utils/editor';

import type { LexicalNode, NodeKey, SerializedLexicalNode } from 'lexical';

export type SerializedTimingNode = SerializedLexicalNode &
{
    text: string
    type: 'spoiler'
    version: 1
};

export class SpoilerNode extends DecoratorNode<ReactNode>
{
    __text: string;

    static getType(): string
    {
        return 'spoiler';
    }

    static clone(node: SpoilerNode): SpoilerNode
    {
        return new SpoilerNode(node.__text, node.__key);
    }

    constructor(text: string, key?: NodeKey)
    {
        super(key);
        this.__text = text;
    }

    createDOM(): HTMLElement
    {
        const dom = document.createElement('span');
        dom.classList.add('spoiler-node');

        return dom;
    }

    updateDOM(): false
    {
        return false;
    }

    decorate(): ReactNode
    {
        return <SpoilerComponentMemo
            word={this.__text}
            nodeKey={this.__key}
        />;
    }

    exportJSON(): SerializedTimingNode
    {
        return {
            type: 'spoiler',
            version: 1,
            text: this.__text,
        };
    }

    static importJSON(serializedNode: SerializedTimingNode): SpoilerNode
    {
        return new SpoilerNode(serializedNode.text);
    }

    getTextContent(): string
    {
        return this.__text;
    }

    isInline(): boolean
    {
        return true;
    }
}

export function $createSpoilerNode(text: string): SpoilerNode
{
    return new SpoilerNode(text);
}

export function $isSpoilerNode(node: LexicalNode | null | undefined): node is SpoilerNode
{
    return node instanceof SpoilerNode;
}

interface SpoilerComponentProperties
{
    word: string;
    nodeKey: NodeKey;
}

function SpoilerComponent({ nodeKey, word }: SpoilerComponentProperties)
{
    const [revealed, setRevealed] = useState(false);
    const [editor] = useLexicalComposerContext();

    const updateEditor = () =>
    {
        editor.update(() =>
        {
            const node = $getNodeByKey(nodeKey);
            const parentReplicaNode = getParentReplicaNodeRecursively(node);
            if (!parentReplicaNode || !node) return;

            parentReplicaNode.switchNodeTypeByObscene(node, true);
        });
    };

    const toggleReveal = () =>
    {
        if (editor.isEditable())
        {
            if (revealed) return;
            setRevealed(true);
            setTimeout(updateEditor, 200);

            return;
        }

        setRevealed(!revealed);
    };

    return (
        <span
            className="inline-block relative cursor-pointer select-none"
            onClick={toggleReveal}
            aria-label={revealed ? 'Hide spoiler' : 'Show spoiler'}
            role="button"
        >
            <span
                className=
                    {`
                    relative inline-block
                    select-text
                    transition-all duration-300 ease-in-out
                    ${revealed ?
            'text-current' :
            'text-transparent'
        }
                    ${revealed ? 'filter-none' : 'filter blur-[4px]'}
                    ${revealed ? 'drop-shadow-none' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'}
                `}
            >
                {word}
            </span>
            {!revealed && (
                <span
                    className="absolute inset-0 bg-obscene rounded-sm"
                />
            )}
        </span>
    );
}

const SpoilerComponentMemo = memo(SpoilerComponent);
