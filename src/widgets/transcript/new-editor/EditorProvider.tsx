import React, { useState } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';

interface Sentence {
    start_millis: number;
    end_millis: number;
    text: string;
    speaker_id: number;
    speaker_name: string | null;
}

interface EditorProviderProps {
    sentences: Sentence[];
}

export type FocusPosition = 'start' | 'end' | number | null;

const EditorProvider: React.FC<EditorProviderProps> = ({ sentences: initialSentences }) => {
    const [sentences, setSentences] = useState<Sentence[]>(initialSentences);
    const [activeNode, setActiveNode] = useState<{ index: number, position: FocusPosition } | null>(null);

    const handleSplit = (index: number, textBefore: string, textAfter: string) => {
        const currentSentence = sentences[index];
        const newSentences = [...sentences];
        
        // Update current node
        newSentences[index] = {
            ...currentSentence,
            text: textBefore
        };
        
        // Insert new node after
        newSentences.splice(index + 1, 0, {
            ...currentSentence,
            text: textAfter
        });
        
        setSentences(newSentences);
        setActiveNode({ index: index + 1, position: 'start' }); // Move focus to the newly created node at the start
    };

    const handleMergeWithPrevious = (index: number, textToMerge: string) => {
        if (index > 0) {
            const newSentences = [...sentences];
            const prevSentence = newSentences[index - 1];
            
            let mergedText = prevSentence.text;
            let spaceAdded = 0;
            
            // Auto-add space if needed to avoid sticking words together
            if (mergedText.length > 0 && textToMerge.length > 0 && !mergedText.endsWith(' ') && !textToMerge.startsWith(' ')) {
                mergedText += ' ' + textToMerge;
                spaceAdded = 1;
            } else {
                mergedText += textToMerge;
            }
            
            const newCursorPos = prevSentence.text.length + spaceAdded;

            newSentences[index - 1] = {
                ...prevSentence,
                text: mergedText
            };

            newSentences.splice(index, 1);
            setSentences(newSentences);
            setActiveNode({ index: index - 1, position: newCursorPos }); // Move focus to previous node at merge point
        }
    };

    const handleChange = (index: number, newText: string) => {
        const newSentences = [...sentences];
        newSentences[index] = {
            ...newSentences[index],
            text: newText
        };
        setSentences(newSentences);
    };

    const handleNavigateUp = (index: number) => {
        if (index > 0) {
            setActiveNode({ index: index - 1, position: 'end' });
        }
    };

    const handleNavigateDown = (index: number) => {
        if (index < sentences.length - 1) {
            setActiveNode({ index: index + 1, position: 'end' });
        }
    };

    // To ensure React properly updates the contentEditable when we modify sentences programmatically (e.g. split)
    // we should really use a unique stable key for each node. But for now, index + start_millis helps.
    // If a user types, we don't want to remount. The key only changes when index or start_millis changes.
    // To prevent remounting on simple typing, we could use an ID.
    // Let's generate stable IDs for nodes if possible.
    // For simplicity, we will stick to start_millis-index.

    return (
        <>
            <div className="flex flex-col gap-5 pb-20 h-200">
                {sentences.map((sentence, index) => (
                    <ReplicaNode
                        key={`${sentence.start_millis}-${index}`}
                        speakerId={sentence.speaker_id}
                        initialText={sentence.text}
                        focusPosition={activeNode?.index === index ? activeNode.position : null}
                        onChange={(newText) => handleChange(index, newText)}
                        onSplit={(textBefore, textAfter) => handleSplit(index, textBefore, textAfter)}
                        onMergeWithPrevious={(textToMerge) => handleMergeWithPrevious(index, textToMerge)}
                        onNavigateUp={() => handleNavigateUp(index)}
                        onNavigateDown={() => handleNavigateDown(index)}
                        onFocus={() => setActiveNode({ index, position: null })}
                    />
                ))}
            </div>
        </>
    );
}

export default EditorProvider;