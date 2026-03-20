import equal from 'fast-deep-equal';
import {
    $getNodeByKey,
    $getRoot,
    $isParagraphNode, $isTextNode,
    type EditorState, type LexicalEditor,
    type LexicalNode,
    type NodeKey,
    type RangeSelection,
    type SerializedEditorState,
} from 'lexical';

import { $isReplicaNode, ReplicaNode } from '@/widgets/editor';
import { TRAFFIC_LIGHT_BAD_ACCURACY, TRAFFIC_LIGHT_NORMAL_ACCURACY } from '@/widgets/editor/utils/constants';

import type { WordExtendedInfo } from '@/shared/generated/api/generated';

const _STYLES_FIELDS = new Set(['style', 'textStyle']);
const _MAX_RECURSIVE_PARENT_CALLS = 10;

/**
 * Function returns all replica nodes (all replicas) in the editor
 *
 * @returns {ReplicaNode[]} array of replica nodes in editor
 */
export function getRootReplicaNodes(): ReplicaNode[]
{
    return $getRoot().getChildren().filter((node) => $isReplicaNode(node));
}

/**
 * Function checks that the editor has any `ReplicaNode` in his map
 *
 * @param {EditorState} editorState
 *
 * @returns {boolean} result: true, if editor has any replica node
 */
export function hasAnyReplicas(editorState: EditorState): boolean
{
    let hasReplicas = false;
    for (const nodeInfo of editorState._nodeMap)
    {
        if ($isReplicaNode(nodeInfo[1]))
        {
            hasReplicas = true;
            break;
        }
    }

    return hasReplicas;
}

/**
 * This function recursively removes `style`, `textStyle` properties from all nested objects inside passed object
 *
 * @param object typically serialized editor state (into JSON format)
 *
 * @returns {object} object without nested style & textStyle properties
 */
function _recursivelyRemoveStylesFromNodes<T>(object: T): T | T[]
{
    if (Array.isArray(object))
    {
        return object.map(item => _recursivelyRemoveStylesFromNodes(item));
    }
    else if (typeof object === 'object' && object !== null)
    {
        const newObject: any = {};
        for (const key in object)
        {
            if (_STYLES_FIELDS.has(key)) continue;

            newObject[key] = _recursivelyRemoveStylesFromNodes(object[key]);
        }

        return newObject;
    }

    return object;
}

/**
 * Checks if there are any changes in the editor's state compared to the serialized state.
 *
 * @param {EditorState} editorState - The current state of the editor.
 * @param {SerializedEditorState} serializedEditorState - The previously serialized state of the editor.
 * @returns {boolean} - Returns true if there are changes, false otherwise.
 */
export function hasEditorChanges(editorState: EditorState, serializedEditorState: SerializedEditorState): boolean
{
    // Changing accuracy affects auto-save in this case.
    // Because if you remove the mark from the marked word (bad or normal accuracy), it will become part of the neighboring node.
    // Then, the nodes will change
    const state = _recursivelyRemoveStylesFromNodes(editorState.toJSON());
    const oldState = _recursivelyRemoveStylesFromNodes(serializedEditorState);

    return !equal(oldState, state);
}

/**
 * Recursively searches for the nearest parent node that is a `ReplicaNode` from the given node.
 *
 * This function traverses the parent hierarchy of the provided node, moving up the tree until it finds a node that is a `ReplicaNode`.
 * If no such node is found within the maximum allowed recursive calls, the function returns `undefined`.
 *
 * @param node - The starting node from which the search begins. This node is expected to be a `LexicalNode` or `null`. If `null` or `undefined`, the function immediately returns `undefined`.
 * @param _recursive_calls - An internal counter used to track the number of recursive calls made. This parameter is not intended for external use and is automatically managed by the function. Defaults to `0`.
 * @returns A `ReplicaNode` if one is found in the parent hierarchy; otherwise, `undefined`.
 */
export function getParentReplicaNodeRecursively(node: LexicalNode | null, _recursive_calls: number = 0): ReplicaNode | undefined
{
    if(!node) return undefined;
    if(_recursive_calls >= _MAX_RECURSIVE_PARENT_CALLS) return undefined;

    const nodeParent = node.getParent();
    if(!nodeParent) return undefined;
    if($isReplicaNode(nodeParent)) return nodeParent;

    return getParentReplicaNodeRecursively(nodeParent, _recursive_calls + 1);
}

export function getTrafficLightNodeStyle(wordInfo: WordExtendedInfo): string
{
    if (wordInfo.accuracy > TRAFFIC_LIGHT_NORMAL_ACCURACY) return '';

    let color = 'var(--bad-accuracy)';
    if (wordInfo.accuracy > TRAFFIC_LIGHT_BAD_ACCURACY) color = 'var(--normal-accuracy)';

    return (
        `background-color: ${color};
        padding: 0.1em;
        border-radius: 0.5em;
        line-height: 1.8em;`
    );
}

export function findAndSelectFirstParagraph(replicaNode: ReplicaNode)
{
    replicaNode.getChildren().find(
        n => $isParagraphNode(n) && n.selectStart(),
    );
}

export function getTextFromNodes(nodes: LexicalNode[]): string
{
    return nodes.map((node) => node.getTextContent()).join('');
}

export function getWordsFromNodes(
    lexicalNodes: LexicalNode[],
    textNodes: Map<NodeKey, WordExtendedInfo>,
    start_millis: number,
    end_millis: number,
): WordExtendedInfo[]
{
    return lexicalNodes.map(sib =>
    {
        const existing = textNodes.get(sib.getKey());
        if (existing && existing.word === sib.getTextContent().trim()) return existing;

        const text = sib.getTextContent().trim();
        if (text.length === 0) return;

        return {
            word: text,
            start_millis,
            end_millis,
            accuracy: 1,
        };
    }).filter(w => w !== undefined);
}

export function selectNodeByIndex(editor: LexicalEditor, node: any, index: number, pos: 'start' | 'end' = 'end')
{
    // TODO 20.07.2025: Timeout
    setTimeout(() =>
    {
        editor.update(() =>
            pos === 'start' ? node.getAllTextNodes()[index].selectStart() : node.getAllTextNodes()[index].selectEnd(),
        );
    }, 10,
    );
}

// TODO 26.07.2025: Rewrite to minimalize cognitive complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export const removeHighlightingFromSelection = (selection: RangeSelection) =>
{
    const node = $getNodeByKey(selection.focus.key);
    if (!node || !$isTextNode(node)) return;

    if (node.getStyle().length <= 4)
    {
        const next = node.getNextSibling();
        if (!next) return;
        if (!$isTextNode(next)) return;
        if (next.getStyle().length <= 4) return;
        const text = next.getTextContent().trim();
        if (text.length === 0) return;
        if (node.getTextContent().endsWith(' ')) return;
        next.setStyle('');

        return;
    }

    const replica = node.getParent()?.getParent();
    if (!replica || !$isReplicaNode(replica)) return;

    const word = replica.__textNodes.get(node.__key);
    if (word && word.word === node.getTextContent())
    {
        if (selection.anchor.key !== node.getKey()) return;
        const next = node.getNextSibling();
        if (!next) return;
        if (!$isTextNode(next)) return;
        const text = next.getTextContent();
        if (text.trim().length === 0) return;
        if (text.startsWith(' ')) return;
        if (next.getStyle().length >= 4) next.setStyle('');
    }

    node.setStyle('');
};
