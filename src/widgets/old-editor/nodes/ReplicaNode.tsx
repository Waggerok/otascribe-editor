import
{
    $createParagraphNode,
    $createTextNode,
    $getEditor,
    $isParagraphNode,
    $isTextNode,
    ElementNode,
    type LexicalNode,
    type NodeKey,
    type ParagraphNode,
    TextNode,
} from 'lexical';

import { $createActionsNode } from './ActionsNode';
import { $createAvatarNode, $isAvatarNode } from './AvatarNode';
import { $createSpoilerNode, $isSpoilerNode } from './SpoilerNode';
import { $createTimingNode } from './TimingNode';
import { useProjectStore } from '@/app/stores';
import { m } from '@/shared/generated/paraglide/messages';
import
{
    PLAYBACK_NODE_STYLE_PREFIX,
    SPOILER_NODE_STYLE_PREFIX,
    TRAFFIC_LIGHT_NORMAL_ACCURACY,
} from '@/widgets/editor/utils/constants';
import { getTrafficLightNodeStyle } from '@/widgets/editor/utils/editor';

import type { Sentense, Speaker } from '@/entities';
import type { WordExtendedInfo } from '@/shared/generated/api/generated';

function groupItems(
    items: TextNode[],
    textNodes: Map<NodeKey, WordExtendedInfo>,
    replica: ReplicaNode,
): WordExtendedInfo[]
{
    let result: WordExtendedInfo[] = [];
    let pr = false;

    for (const item of items)
    {
        if ($isParagraphNode(item))
        {
            result = [
                ...result,
                ...groupItems(item.getChildren(), textNodes, replica),
            ];
            continue;
        }

        const isSpoiler = $isSpoilerNode(item);
        if (!$isTextNode(item) && !isSpoiler) continue;

        const text = item.getTextContent().trim();
        if (text.length === 0)
        {
            pr = false;
            continue;
        }

        let wordInfo = textNodes.get(item.getKey());
        if (!wordInfo || wordInfo.word !== text)
        {
            wordInfo = {
                word: text,
                start_millis: replica.__startTime,
                end_millis: replica.__endTime,
                accuracy: 1,
                speaker_id: replica.__speaker.id,
                is_obscene: isSpoiler,
            };
        }

        if (wordInfo.word.includes(' '))
        {
            // eslint-disable-next-line unicorn/no-array-for-each
            wordInfo.word.split(' ').forEach((word: string) =>
            {
                if (word.trim().length === 0) return;

                result.push({
                    word: word,
                    start_millis: wordInfo.start_millis,
                    end_millis: wordInfo.end_millis,
                    accuracy: wordInfo.accuracy,
                    speaker_id: wordInfo.speaker_id,
                    is_obscene: wordInfo.is_obscene || false,
                });
            });

            continue;
        }

        if (
            wordInfo.accuracy === 1 &&
            pr &&
            // @ts-ignore
            !result.at(-1).word.includes(' ') &&
            !wordInfo.word.includes(' ')
        )
        {
            // @ts-ignore
            wordInfo.word = result.at(-1).word + wordInfo.word;
            result[result.length - 1] = wordInfo;
            continue;
        }

        result.push(wordInfo);
        pr = wordInfo.accuracy === 1;
    }

    return result;
}

const recolorHighlightNode = (textNode: TextNode) =>
{
    const isSpoiler = textNode.getStyle().includes(SPOILER_NODE_STYLE_PREFIX);
    const obsceneWords = useProjectStore.getState().obsceneWords;
    let style = `${PLAYBACK_NODE_STYLE_PREFIX}
            background-color: var(--playback-hiighlight);
            padding: 0.1em;
            border-radius: 0.5em;
            line-height: 1.8em;`;

    if (isSpoiler)
    {
        if (obsceneWords) return;
        style += SPOILER_NODE_STYLE_PREFIX;
    }

    textNode.setStyle(style);
};

const uncolorNode = (textNode: TextNode) =>
{
    const style = textNode.getStyle();
    if (!style.includes(PLAYBACK_NODE_STYLE_PREFIX)) return;

    if (style.includes(SPOILER_NODE_STYLE_PREFIX))
    {
        textNode.setStyle(SPOILER_NODE_STYLE_PREFIX);

        return;
    }

    if (textNode.__text === ' ')
    {
        textNode.setStyle('');

        return;
    }

    textNode.setStyle('/* CUSTOM */\n;padding: 0.1em; line-height: 1.8em;');
};

// TODO: Make placeholder for empty Replica
export class ReplicaNode extends ElementNode
{
    __initialText: string;
    __startTime: number;
    __endTime: number;
    __words: WordExtendedInfo[];
    __speaker: Speaker;
    __trafficLightMode: boolean = false;

    __textNodes: Map<NodeKey, WordExtendedInfo>;
    __obsceneWords: Map<NodeKey, WordExtendedInfo>;

    constructor(
        text: string,
        startTime: number,
        endTime: number,
        words: WordExtendedInfo[],
        speaker: Speaker,
        textNodes?: Map<NodeKey, WordExtendedInfo>,
        obsceneWords?: Map<NodeKey, WordExtendedInfo>,
        key?: NodeKey,
    )
    {
        super(key);
        this.__initialText = text || ' ';
        this.__startTime = startTime || 0;
        this.__endTime = endTime || 0;
        this.__words = words || [];
        this.__speaker = speaker || { id: 0, name: `${m['general.unkown']()}` };
        this.__textNodes = textNodes || new Map();
        this.__obsceneWords = obsceneWords || new Map();
    }

    static getType(): string
    {
        return 'replica-node';
    }

    static clone(node: ReplicaNode): ReplicaNode
    {
        const newNode = new ReplicaNode(
            node.__initialText,
            node.__startTime,
            node.__endTime,
            node.__words,
            node.__speaker,
            node.__textNodes,
            node.__obsceneWords,
            node.__key,
        );
        newNode.__trafficLightMode = node.__trafficLightMode;

        return newNode;
    }

    _createWordsByExtendedInformation(paragraphNode: ParagraphNode)
    {

        const textNodes = new Map<string, WordExtendedInfo>,
            obsceneNodes = new Map<string, WordExtendedInfo>;

        let index = 0;
        for (const wordInfo of this.__words)
        {
            let wordNode = null;

            if (wordInfo.is_obscene)
            {
                wordNode = $createSpoilerNode(wordInfo.word);
                obsceneNodes.set(wordNode.getKey(), wordInfo);
            }
            else
            {
                const isEditMode = $getEditor().isEditable();
                let style = '';

                if (this.__trafficLightMode)
                    style = getTrafficLightNodeStyle(wordInfo);

                if (style.length === 0) style = isEditMode ? '/* CUSTOM */\npadding: 0.1em;line-height: 1.8em;' : 'padding: 0.1em;';
                wordNode = $createTextNode(wordInfo.word);
                style += ` /* MODIF ${index} */`;
                index++;
                wordNode.setStyle(style);
            }

            paragraphNode.append(wordNode);
            paragraphNode.append($createTextNode(' '));

            // TODO: Compatibility with current editor logic.
            textNodes.set(wordNode.getKey(), wordInfo);
        }

        this.setTextNodes(textNodes);
        this.setObsceneWords(obsceneNodes);
    }

    createChildrenNodes()
    {
        // Already initialized
        if (this.getChildrenSize() > 1) return;

        const avatarNode = $createAvatarNode(this.__speaker);
        const timingNode = $createTimingNode(this.__startTime, this.__endTime);
        const actionsNode = $createActionsNode();

        const paragraphNode = $createParagraphNode();

        if (this.__words.length > 0)
        {
            this._createWordsByExtendedInformation(paragraphNode);
        }
        else
        {
            const textNode = $createTextNode(this.__initialText);
            paragraphNode.append(textNode);
        }

        this.append(avatarNode, timingNode, paragraphNode, actionsNode);
    }

    createDOM(): HTMLElement
    {
        const dom = document.createElement('div');
        dom.className =
            'flex flex-row flex-wrap lg:flex-nowrap leading-[1.8em] min-h-9 mx-2 my-2 rounded-xl items-start relative group replica-node [&_p]:w-full [&>*:last-child]:w-full lg:[&>*:last-child]:w-auto';
        this.createChildrenNodes();

        return dom;
    }

    updateDOM(): boolean
    {
        return false;
    }

    static importJSON(): ReplicaNode
    {
        return $createReplicaNode();
    }

    getInitialText(): string
    {
        return this.getLatest().__initialText;
    }

    getStartTime(): number
    {
        return this.getLatest().__startTime;
    }

    getEndTime(): number
    {
        return this.getLatest().__endTime;
    }

    getTextNodes(): Map<string, WordExtendedInfo>
    {
        return new Map(this.getLatest().__textNodes);
    }

    setTextNodes(newTextNodes: Map<string, WordExtendedInfo>): void
    {
        this.getWritable().__textNodes = newTextNodes;
    }

    getObsceneWords(): Map<string, WordExtendedInfo>
    {
        return new Map(this.getLatest().__obsceneWords);
    }

    setObsceneWords(newObsceneWords: Map<string, WordExtendedInfo>): void
    {
        this.getWritable().__obsceneWords = newObsceneWords;
    }

    toSentense(): Sentense
    {
        const self = this.getLatest();

        return {
            id: 0,
            text: self.__initialText,
            start: self.__startTime,
            end: self.__endTime,
            speaker: self.__speaker,
            words: self.__words,
        };
    }

    generateWords(): WordExtendedInfo[]
    {
        const textNodes = this.getTextNodes();

        return groupItems(this.getChildren(), textNodes, this);
    }

    setTrafficLightMode(isTrafficLight: boolean)
    {
        const recolorNode = (textNode: TextNode, wordInfo: WordExtendedInfo | undefined) =>
        {
            if (!isTrafficLight)
            {
                textNode.setStyle(`${wordInfo?.word}:${wordInfo?.accuracy}`);

                return;
            }
            if (!wordInfo) return;
            if (wordInfo.is_obscene) return;
            if (wordInfo.accuracy > TRAFFIC_LIGHT_NORMAL_ACCURACY) return;

            textNode.setStyle(getTrafficLightNodeStyle(wordInfo));
        };

        const self = this.getWritable();
        const textNodes = this.getTextNodes();
        for (const child of self.getChildren())
        {
            if ($isParagraphNode(child))
            {
                for (const c of child.getChildren())
                {
                    if (!$isTextNode(c)) continue;
                    recolorNode(c, textNodes.get(c.getKey()));
                }
            }

            if (!$isTextNode(child)) continue;
            recolorNode(child, textNodes.get(child.getKey()));
        }

        self.__trafficLightMode = isTrafficLight;
    }

    getSpeaker()
    {
        const self = this.getLatest();
        let speaker = self.__speaker;

        for (const child of self.getChildren())
        {
            if (!$isAvatarNode(child)) continue;
            speaker = child.__speaker;
        }

        return speaker;
    }

    _switchNodesPlaybackHighlighting(enable: boolean)
    {
        const actionCallable = enable ? recolorHighlightNode : uncolorNode;

        for (const child of this.getWritable().getChildren())
        {
            if ($isParagraphNode(child))
            {
                for (const c of child.getChildren())
                {
                    if (!$isTextNode(c)) continue;
                    actionCallable(c);
                }
            }

            if (!$isTextNode(child)) continue;
            actionCallable(child);
        }
    }

    enablePlaybackHighlight(mode: 'replica' | 'word' = 'replica', currentTime?: number): void
    {
        if (mode === 'replica')
        {
            this._switchNodesPlaybackHighlighting(true);
        }
        else
        {
            this.highlightWordAtTime(currentTime || 0);
        }
    }

    disablePlaybackHighlight(): void
    {
        this._switchNodesPlaybackHighlighting(false);
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    highlightWordAtTime(currentTime: number, activeInfo?: WordExtendedInfo & { node: TextNode } | null): WordExtendedInfo & { node: TextNode } | null
    {
        const textNodes = this.getTextNodes();
        if (textNodes.size === 0)
        {
            this._switchNodesPlaybackHighlighting(true);

            return activeInfo ?? null;
        }

        for (const child of this.getWritable().getChildren())
        {
            if ($isParagraphNode(child))
            {
                for (const c of child.getChildren())
                {
                    if (!$isTextNode(c)) continue;

                    const wordInfo = textNodes.get(c.getKey());
                    if (wordInfo && currentTime >= wordInfo.start_millis && currentTime < wordInfo.end_millis)
                    {
                        if (activeInfo && activeInfo.node)
                            uncolorNode(activeInfo.node);
                        recolorHighlightNode(c);
                        activeInfo = {...wordInfo, node: c};
                    }
                }

                continue;
            }

            if (!$isTextNode(child)) continue;

            const wordInfo = textNodes.get(child.getKey());
            if (wordInfo && currentTime >= wordInfo.start_millis && currentTime < wordInfo.end_millis)
            {
                if (activeInfo && activeInfo.node)
                    uncolorNode(activeInfo.node);

                recolorHighlightNode(child);
                activeInfo = {...wordInfo, node: child};
            }
        }

        return activeInfo ?? null;
    }

    switchNodeTypeByObscene(node: LexicalNode, convertToText = false)
    {
        if (convertToText && $isTextNode(node)) return;
        const nodeKey = node.getKey();
        const nodes = this.getTextNodes();
        const spoilers = this.getObsceneWords();
        if (!nodes || nodes.size === 0) return;

        let newTextNode = null, wordInfo = null;

        if (convertToText)
        {
            newTextNode = $createTextNode(node.getTextContent());
            newTextNode = newTextNode.setStyle(SPOILER_NODE_STYLE_PREFIX);

            wordInfo = spoilers.get(nodeKey);
        }
        else
        {
            newTextNode = $createSpoilerNode(node.getTextContent());

            wordInfo = nodes.get(nodeKey);
        }
        if (!wordInfo) return;

        const newNode = node.replace(newTextNode);
        spoilers.delete(nodeKey);
        nodes.delete(nodeKey);

        spoilers.set(newNode.getKey(), wordInfo);
        // TODO: For compatibility with current editor logic
        nodes.set(newNode.getKey(), wordInfo);

        this.setObsceneWords(spoilers);
        this.setTextNodes(nodes);
    }
}

export function $createReplicaNode(
    text?: string,
    start?: number,
    end?: number,
    words?: WordExtendedInfo[],
    speaker?: Speaker,
): ReplicaNode
{
    return new ReplicaNode(
        text || ' ',
        start || 0,
        end || 0,
        words || [],
        speaker || { id: 0, name: 'Собеседник 0' },
    );
}

export function $isReplicaNode(
    node: LexicalNode | null | undefined,
): node is ReplicaNode
{
    return node instanceof ReplicaNode;
}
