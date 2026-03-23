import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { SpeakerDropdown } from './SpeakerDropdown';
import TimeNode from './TimeNode';

interface ReplicaNodeProps {
    index: number;
}

const ReplicaNodeComponent: React.FC<ReplicaNodeProps> = ({ index }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    
    const sentence = useEditorStore(state => state.sentences[index]);
    const showTimings = useEditorStore(state => state.showTimings);
    const plugins = useEditorStore(state => state.plugins);
    const showUsers = useEditorStore(state => state.showUsers);
    const focusPosition = useEditorStore(state =>  state.activeNode?.index === index ? state.activeNode.position : null);
    
    const updateSentence = useEditorStore(state => state.updateSentence);
    const setActiveNode = useEditorStore(state => state.setActiveNode);

    const initialText = sentence?.text || '';

    const lastReportedHtml = useRef(initialText);

    // Initialize content once on mount.
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== initialText) {
            editorRef.current.innerHTML = initialText;
            lastReportedHtml.current = initialText;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Sync external text changes (e.g., from split) to the DOM safely
    useEffect(() => {
        if (initialText !== lastReportedHtml.current && editorRef.current) {
            editorRef.current.innerHTML = initialText;
            lastReportedHtml.current = initialText;
        }
    }, [initialText]);

    useEffect(() => {
        if (focusPosition !== null && editorRef.current) {
            editorRef.current.focus();
            
            const selection = window.getSelection();
            if (!selection) return;
            
            const range = document.createRange();
            
            if (typeof focusPosition === 'number') {
                let currentOffset = 0;
                let found = false;

                const traverseNodes = (node: Node) => {
                    if (found) return;
                    if (node.nodeType === Node.TEXT_NODE) {
                        const nodeLength = node.textContent?.length || 0;
                        if (currentOffset + nodeLength >= focusPosition) {
                            range.setStart(node, focusPosition - currentOffset);
                            range.collapse(true);
                            found = true;
                        } else {
                            currentOffset += nodeLength;
                        }
                    } else {
                        for (let i = 0; i < node.childNodes.length; i++) {
                            traverseNodes(node.childNodes[i]);
                        }
                    }
                };
                
                traverseNodes(editorRef.current);
                
                if (!found) {
                    range.selectNodeContents(editorRef.current);
                    range.collapse(false); // fallback to end
                }
            } else {
                range.selectNodeContents(editorRef.current);
                if (focusPosition === 'start') {
                    range.collapse(true); // collapse to start
                } else {
                    range.collapse(false); // collapse to end
                }
            }
            
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [focusPosition]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newHtml = e.currentTarget.innerHTML || '';
        if (newHtml !== lastReportedHtml.current) {
            lastReportedHtml.current = newHtml;
            updateSentence(index, newHtml);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const nodeCtx = { index, sentence, editorRef };
        const editorState = useEditorStore.getState();
        for (const plugin of plugins) {
            if (plugin.onKeyDown) {
                const handled = plugin.onKeyDown(e, nodeCtx, editorState);
                if (handled) break; // Stop processing other plugins if handled
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const nodeCtx = { index, sentence, editorRef };
        const editorState = useEditorStore.getState();
        for (const plugin of plugins) {
            if (plugin.onPaste) {
                const handled = plugin.onPaste(e, nodeCtx, editorState);
                if (handled) break; // Stop processing other plugins if handled
            }
        }
    };

    if (!sentence) return null;

    return (
        <div className="flex gap-4 items-start hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
            {showUsers && <SpeakerDropdown sentenceIndex={index} />}
            {showTimings && <TimeNode startMilliseconds={sentence.start_millis} endMilliseconds={sentence.end_millis} />}
            <div
                ref={editorRef}
                className="flex-1 text-[15px] leading-relaxed text-gray-200 outline-none cursor-text break-words whitespace-pre-wrap"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onFocus={() => setActiveNode({ index, position: null })}
            />
        </div>
    );
};

export const ReplicaNode = React.memo(ReplicaNodeComponent);