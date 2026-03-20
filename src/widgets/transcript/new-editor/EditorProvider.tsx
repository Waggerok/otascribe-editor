import React, { useState } from 'react';
import { ReplicaNode } from './nodes/ReplicaNode';
import { EditorContext } from './context/EditorContext';
import { BasePlugins } from './plugins';
import type { Sentence, FocusPosition, EditorPlugin } from './types';

interface EditorProviderProps {
    sentences: Sentence[];
    plugins?: EditorPlugin[];
}

const EditorProvider: React.FC<EditorProviderProps> = ({ 
    sentences: initialSentences,
    plugins = BasePlugins
}) => {
    const [sentences, setSentences] = useState<Sentence[]>(initialSentences);
    const [activeNode, setActiveNode] = useState<{ index: number, position: FocusPosition } | null>(null);

    const splitSentence = (index: number, htmlBefore: string, htmlAfter: string) => {
        const currentSentence = sentences[index];
        const newSentences = [...sentences];
        
        newSentences[index] = {
            ...currentSentence,
            text: htmlBefore
        };
        
        newSentences.splice(index + 1, 0, {
            ...currentSentence,
            text: htmlAfter
        });
        
        setSentences(newSentences);
        setActiveNode({ index: index + 1, position: 'start' });
    };

    const mergeWithPrevious = (index: number, htmlToMerge: string) => {
        if (index > 0) {
            const newSentences = [...sentences];
            const prevSentence = newSentences[index - 1];
            
            let mergedHtml = prevSentence.text;
            let spaceAdded = 0;
            
            // To be strictly correct with HTML, adding a space between nodes can be tricky if they end in tags,
            // but for simplicity we append. We can improve this in the Merge plugin if needed.
            const cleanPrev = mergedHtml.replace(/<[^>]*>?/gm, '');
            const cleanMerge = htmlToMerge.replace(/<[^>]*>?/gm, '');
            
            if (cleanPrev.length > 0 && cleanMerge.length > 0 && !cleanPrev.endsWith(' ') && !cleanMerge.startsWith(' ')) {
                mergedHtml += ' ' + htmlToMerge;
                spaceAdded = 1;
            } else {
                mergedHtml += htmlToMerge;
            }
            
            const newCursorPos = prevSentence.text.replace(/<[^>]*>?/gm, '').length + spaceAdded;

            newSentences[index - 1] = {
                ...prevSentence,
                text: mergedHtml
            };

            newSentences.splice(index, 1);
            setSentences(newSentences);
            setActiveNode({ index: index - 1, position: newCursorPos });
        }
    };

    const updateSentence = (index: number, newHtml: string) => {
        const newSentences = [...sentences];
        newSentences[index] = {
            ...newSentences[index],
            text: newHtml
        };
        setSentences(newSentences);
    };

    const navigateUp = (index: number) => {
        if (index > 0) {
            setActiveNode({ index: index - 1, position: 'end' });
        }
    };

    const navigateDown = (index: number) => {
        if (index < sentences.length - 1) {
            setActiveNode({ index: index + 1, position: 'end' });
        }
    };

    const contextValue = {
        sentences,
        activeNode,
        setActiveNode,
        updateSentence,
        splitSentence,
        mergeWithPrevious,
        navigateUp,
        navigateDown,
        plugins
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <div className="flex flex-col gap-5 pb-20 h-200">
                {sentences.map((sentence, index) => (
                    <ReplicaNode
                        key={`${sentence.start_millis}-${index}`}
                        index={index}
                    />
                ))}
            </div>
        </EditorContext.Provider>
    );
}

export default EditorProvider;