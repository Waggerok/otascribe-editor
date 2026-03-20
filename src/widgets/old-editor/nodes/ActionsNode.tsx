import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getNodeByKey, DecoratorNode} from 'lexical';
import {AArrowDownIcon, AArrowUpIcon, TrashIcon} from 'lucide-react';

import {$createReplicaNode, ReplicaNode} from './ReplicaNode';
import {useIsMobile} from '@/shared/hooks';
import {Button} from '@/shared/ui';
import { PasteDirection } from '@/widgets/editor/utils/constants';
import {getParentReplicaNodeRecursively} from '@/widgets/editor/utils/editor';

import type {LexicalNode, NodeKey, SerializedLexicalNode} from 'lexical';
import type {ReactNode} from 'react';

export type SerializedActionsNode = SerializedLexicalNode &
{
    type: 'actions'
    version: 1
};

export class ActionsNode extends DecoratorNode<ReactNode>
{
    static getType(): string
    {
        return 'actions';
    }

    static clone(node: ActionsNode): ActionsNode
    {
        return new ActionsNode(node.__key);
    }

    constructor(key?: NodeKey)
    {
        super(key);
    }

    createDOM(): HTMLElement
    {
        const dom = document.createElement('div');
        dom.className = 'actions-node';

        return dom;
    }

    updateDOM(): false
    {
        return false;
    }

    decorate(): ReactNode
    {
        return <Actions nodeKey={this.__key} />;
    }

    exportJSON(): SerializedActionsNode
    {
        return {
            type: 'actions',
            version: 1,
        };
    }

    static importJSON(): ActionsNode
    {
        return new ActionsNode();
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

export function $createActionsNode(): ActionsNode
{
    return new ActionsNode();
}

export function $isActionsNode(node: LexicalNode | null | undefined): node is ActionsNode
{
    return node instanceof ActionsNode;
}

const _ACTIONS = {
    [PasteDirection.BEFORE]: (parentReplicaNode: ReplicaNode, newNode: ReplicaNode) =>
    {
        parentReplicaNode.insertBefore(newNode);
    },

    [PasteDirection.AFTER]: (parentReplicaNode: ReplicaNode, newNode: ReplicaNode) =>
    {
        parentReplicaNode.insertAfter(newNode);
    },
};

function Actions({ nodeKey }: any)
{
    const [editor] = useLexicalComposerContext();
    const isMobile = useIsMobile();

    if (!editor.isEditable()) return null;

    const insertReplicaByDirection = (action: PasteDirection) =>
    {
        editor.update(() =>
        {
            const parentReplicaNode = getParentReplicaNodeRecursively($getNodeByKey(nodeKey));
            if(!parentReplicaNode) return;
            const replica = $createReplicaNode(' ', parentReplicaNode.__startTime, parentReplicaNode.__endTime, [], parentReplicaNode.__speaker);

            // Call applicable action
            _ACTIONS[action](parentReplicaNode, replica);
        });
    };

    const deleteCurrentReplica = () =>
    {
        editor.update(() =>
        {
            const parentReplicaNode = getParentReplicaNodeRecursively($getNodeByKey(nodeKey));
            if(!parentReplicaNode) return;
            parentReplicaNode.remove();
        });
    };

    const baseStyles = 'flex opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100';
    const mobileStyles = 'absolute right-0 top-0';

    const styles = isMobile ? `${baseStyles} ${mobileStyles} `: baseStyles;

    return <div className={styles}>
        <Button
            variant='ghost' size='icon'
            onClick={() => insertReplicaByDirection(PasteDirection.BEFORE)}
        >
            <AArrowUpIcon />
        </Button>
        <Button
            variant='ghost' size='icon'
            onClick={() => insertReplicaByDirection(PasteDirection.AFTER)}
        >
            <AArrowDownIcon />
        </Button>
        <Button
            variant='ghost' size='icon'
            className='hover:text-red-400'
            onClick={deleteCurrentReplica}
        >
            <TrashIcon />
        </Button>
    </div>;
}
