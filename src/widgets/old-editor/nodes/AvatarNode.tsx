import { DecoratorNode } from 'lexical';
import { ChevronDownIcon } from 'lucide-react';
import { memo, type ReactNode } from 'react';

import { useProjectStore } from '@/app/stores';
import { useEditorStore } from '@/app/stores/editor.store';
import { Avatar } from '@/shared/ui';
import { AvatarFallback } from '@/shared/ui/Avatar';
import { getInitials, getSpeakerColor } from '@/shared/utils/formatting';

import type { Speaker } from '@/entities';
import type {LexicalNode, NodeKey, SerializedLexicalNode} from 'lexical';

export type SerializedAvatarNode = SerializedLexicalNode &
{
    speaker: Speaker
    type: 'avatar'
    version: 1
};

export class AvatarNode extends DecoratorNode<ReactNode>
{
    __speaker: Speaker;

    static getType(): string
    {
        return 'avatar';
    }

    static clone(node: AvatarNode): AvatarNode
    {
        return new AvatarNode(node.__speaker, node.__key);
    }

    constructor(speaker: Speaker, key?: NodeKey)
    {
        super(key);
        this.__speaker = speaker;
    }

    createDOM(): HTMLElement
    {
        const dom = document.createElement('div');
        dom.classList.add('avatar-node');

        return dom;
    }

    updateDOM(): false
    {
        return false;
    }

    decorate(): ReactNode
    {
        return <AvatarComponent
            speaker={this.__speaker}
            nodeKey={this.__key}
        />;
    }

    exportJSON(): SerializedAvatarNode
    {
        return {
            type: 'avatar',
            version: 1,
            speaker: this.__speaker,
        };
    }

    static importJSON(serializedNode: SerializedAvatarNode): AvatarNode
    {
        return new AvatarNode(serializedNode.speaker);
    }

    setSpeaker(speaker: Speaker)
    {
        this.getWritable().__speaker = speaker;
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

export function $createAvatarNode(speaker: Speaker): AvatarNode
{
    return new AvatarNode(speaker);
}

export function $isAvatarNode(node: LexicalNode | null | undefined): node is AvatarNode
{
    return node instanceof AvatarNode;
}

interface AvatarComponentProperties
{
    speaker: Speaker
    nodeKey: NodeKey
}

export const AvatarComponent = memo(function AvatarComponent({ speaker, nodeKey }: AvatarComponentProperties)
{
    const transcriptionTaskParameters = useProjectStore(state =>
        state.transcriptionTaskParams);

    const editMode = useEditorStore(state =>
        state.editMode);
    const setSpeakerMenu = useEditorStore(state =>
        state.setSpeakerMenu);

    const handleOpenSpeakerMenu = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        if (!editMode) return;
        event.stopPropagation();
        setSpeakerMenu({ speaker, nodeKey, trigger: event.target as HTMLElement });
    };

    if (!transcriptionTaskParameters.is_diarization) return null;

    return (
        <div
            onClick={handleOpenSpeakerMenu}
            className={`flex select-none w-16 justify-start lg:pl-2 items-center py-0.5 rounded-lg ${editMode && 'transition-colors hover:bg-accent cursor-pointer'}`}
        >
            <NodeAvatar speaker={speaker} />
            {editMode && <ChevronDownIcon className='size-4 mx-2' />}
        </div>
    );
});

export const NodeAvatar = memo(({ speaker }: {speaker: Speaker}) =>
    (
        <Avatar className="size-6 text-[10px] text-white">
            <AvatarFallback style={{ backgroundColor: getSpeakerColor(speaker.name) }}>
                { getInitials(speaker.name, 2) }
            </AvatarFallback>
        </Avatar>
    ));
NodeAvatar.displayName = 'NodeAvatar';
