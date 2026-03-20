import type { EditorPlugin } from '../types';
import { getSelectionOffset, splitHtmlAtSelection } from '../utils/dom';

export const NavigationPlugin: EditorPlugin = {
    name: 'Navigation',
    onKeyDown: (e, nodeCtx, editorCtx) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            editorCtx.navigateUp(nodeCtx.index);
            return true;
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            editorCtx.navigateDown(nodeCtx.index);
            return true;
        }
    }
};

export const SplitPlugin: EditorPlugin = {
    name: 'Split',
    onKeyDown: (e, nodeCtx, editorCtx) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!nodeCtx.editorRef.current) return true;
            
            const { htmlBefore, htmlAfter } = splitHtmlAtSelection(nodeCtx.editorRef.current);
            editorCtx.splitSentence(nodeCtx.index, htmlBefore, htmlAfter);
            return true;
        }
    }
};

export const MergePlugin: EditorPlugin = {
    name: 'Merge',
    onKeyDown: (e, nodeCtx, editorCtx) => {
        if (e.key === 'Backspace') {
            if (!nodeCtx.editorRef.current) return;
            const startOffset = getSelectionOffset(nodeCtx.editorRef.current);
            if (startOffset === 0) {
                e.preventDefault();
                // Send innerHTML instead of textContent to preserve formatting
                editorCtx.mergeWithPrevious(nodeCtx.index, nodeCtx.editorRef.current.innerHTML);
                return true;
            }
        }
    }
};

export const BoldPlugin: EditorPlugin = {
    name: 'Bold',
    onKeyDown: (e, nodeCtx, editorCtx) => {
        // Handle Ctrl+B or Cmd+B
        if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            document.execCommand('bold');
            // After formatting, update the sentence to save the new HTML
            if (nodeCtx.editorRef.current) {
                editorCtx.updateSentence(nodeCtx.index, nodeCtx.editorRef.current.innerHTML);
            }
            return true;
        }
    }
};

export const PastePlugin: EditorPlugin = {
    name: 'Paste',
    onPaste: (e, nodeCtx, editorCtx) => {
        e.preventDefault();
        
        // Get plain text from clipboard
        const text = e.clipboardData.getData('text/plain');
        
        // Insert as plain text (this naturally replaces selection and handles cursor)
        document.execCommand('insertText', false, text);
        
        // Trigger an update so the context knows about the new HTML
        if (nodeCtx.editorRef.current) {
            editorCtx.updateSentence(nodeCtx.index, nodeCtx.editorRef.current.innerHTML);
        }
        
        return true;
    }
};

export const BasePlugins = [
    NavigationPlugin,
    SplitPlugin,
    MergePlugin,
    BoldPlugin,
    PastePlugin
];