import { DecoratorNode } from 'lexical';

import { useAudioStore, useProjectStore } from '@/app/stores';
import { formatMilliseconds } from '@/shared/utils/formatting';
import { millisecondsToSeconds } from '@/shared/utils/strings';

import type { LexicalNode, NodeKey, SerializedLexicalNode } from 'lexical';
import type { ReactNode } from 'react';

export type SerializedTimingNode = SerializedLexicalNode &
{
    startMilliseconds: number
    endMilliseconds: number
    type: 'timing'
    version: 1
};

export class TimingNode extends DecoratorNode<ReactNode>
{
    __startMilliseconds: number;
    __endMilliseconds: number;

    static getType(): string
    {
        return 'timing';
    }

    static clone(node: TimingNode): TimingNode
    {
        return new TimingNode(node.__startMilliseconds, node.__endMilliseconds, node.__key);
    }

    constructor(startTime: number, endTime: number, key?: NodeKey)
    {
        super(key);
        this.__startMilliseconds = startTime;
        this.__endMilliseconds = endTime;
    }

    createDOM(): HTMLElement
    {
        const dom = document.createElement('div');
        dom.classList.add('timing-node');

        return dom;
    }

    updateDOM(): false
    {
        return false;
    }

    decorate(): ReactNode
    {
        return <TimingComponent
            startMilliseconds={this.__startMilliseconds}
            endMilliseconds={this.__endMilliseconds}
            nodeKey={this.__key}
        />;
    }

    exportJSON(): SerializedTimingNode
    {
        return {
            type: 'timing',
            version: 1,
            startMilliseconds: this.__startMilliseconds,
            endMilliseconds: this.__endMilliseconds,
        };
    }

    static importJSON(serializedNode: SerializedTimingNode): TimingNode
    {
        return new TimingNode(serializedNode.startMilliseconds, serializedNode.endMilliseconds);
    }

    getTextContent(): string
    {
        return '';
    }

    isInline(): boolean
    {
        return true;
    }
}

export function $createTimingNode(startTime: number, endTime: number): TimingNode
{
    return new TimingNode(startTime, endTime);
}

export function $isTimingNode(node: LexicalNode | null | undefined): node is TimingNode
{
    return node instanceof TimingNode;
}

interface TimingComponentProperties
{
    startMilliseconds: number
    endMilliseconds: number
    nodeKey: NodeKey
}

function TimingComponent({ startMilliseconds, endMilliseconds }: TimingComponentProperties)
{
    const timeMarks = useProjectStore(state =>
        state.timeMarks);
    const rewind = useAudioStore(state =>
        state.rewind);

    const handleRewind = (milliseconds: number) =>
    {
        rewind(millisecondsToSeconds(milliseconds));
    };

    return (
        <div className="select-none mr-2 text-gray-500 dark:text-gray-400 [&_span]:cursor-pointer text-nowrap">
            {timeMarks && <>
                <span
                    onClick={() => handleRewind(startMilliseconds)}
                >
                    {formatMilliseconds(startMilliseconds)}
                </span>
                {' – '}
                <span
                    onClick={() => handleRewind(endMilliseconds)}
                >
                    {formatMilliseconds(endMilliseconds)}
                </span>
            </>}
        </div>
    );
}
