import React, { useRef, useEffect } from 'react';
import { AvatarNode } from './AvatarNode';
import type { FocusPosition } from '../EditorProvider';

interface ReplicaNodeProps {
    speakerId: number;
    initialText: string;
    onChange?: (newText: string) => void;
    onSplit?: (textBefore: string, textAfter: string) => void;
    onMergeWithPrevious?: (textToMerge: string) => void;
    onNavigateUp?: () => void;
    onNavigateDown?: () => void;
    onFocus?: () => void;
    focusPosition?: FocusPosition;
}

export const ReplicaNode: React.FC<ReplicaNodeProps> = ({ 
    speakerId, 
    initialText, 
    onChange, 
    onSplit, 
    onMergeWithPrevious,
    onNavigateUp,
    onNavigateDown,
    onFocus,
    focusPosition
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const lastReportedText = useRef(initialText);

    // We use a completely uncontrolled component approach for typing, 
    // but manually update it when initialText changes externally.
    // Initialize content once on mount.
    useEffect(() => {
        if (editorRef.current && editorRef.current.textContent !== initialText) {
            editorRef.current.textContent = initialText;
            lastReportedText.current = initialText;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Sync external text changes (e.g., from split) to the DOM safely
    useEffect(() => {
        if (initialText !== lastReportedText.current && editorRef.current) {
            editorRef.current.textContent = initialText;
            lastReportedText.current = initialText;
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
        const newText = e.currentTarget.textContent || '';
        if (newText !== lastReportedText.current) {
            lastReportedText.current = newText;
            if (onChange) {
                onChange(newText);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentTarget = e.currentTarget;
        const textContent = currentTarget.textContent || '';
        
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        
        const range = selection.getRangeAt(0);

        // Get absolute offset
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(currentTarget);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const startOffset = preSelectionRange.toString().length;

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const textBefore = textContent.slice(0, startOffset);
            const textAfter = textContent.slice(startOffset);
            if (onSplit) {
                onSplit(textBefore, textAfter);
            }
        } else if (e.key === 'Backspace') {
            if (startOffset === 0 && onMergeWithPrevious) {
                e.preventDefault();
                onMergeWithPrevious(textContent);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (onNavigateUp) {
                onNavigateUp();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (onNavigateDown) {
                onNavigateDown();
            }
        }
    };

    // We use a completely uncontrolled component approach for typing, 
    // but manually update it when initialText changes externally.
    return (
        <div className="flex gap-4 items-start group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
            <AvatarNode speaker={{ id: speakerId, name: `C${speakerId + 1}` }} />
            <div
                ref={editorRef}
                className="flex-1 text-[15px] leading-relaxed text-gray-200 outline-none cursor-text break-words whitespace-pre-wrap"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
            >
                {/* 
                    Only set content on mount. 
                    React won't touch this div's children anymore because it has no React children or dangerouslySetInnerHTML.
                    We manage its content manually via refs.
                */}
            </div>
        </div>
    );
};