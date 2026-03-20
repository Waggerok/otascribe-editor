import { createContext, useContext } from 'react';
import type { EditorContextState } from '../types';

export const EditorContext = createContext<EditorContextState | null>(null);

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};