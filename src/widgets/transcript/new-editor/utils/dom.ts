export const getSelectionOffset = (container: HTMLElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(container);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    return preSelectionRange.toString().length;
};

export const splitHtmlAtSelection = (container: HTMLElement) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        return { htmlBefore: container.innerHTML, htmlAfter: '' };
    }

    const range = selection.getRangeAt(0);

    const preRange = range.cloneRange();
    preRange.selectNodeContents(container);
    preRange.setEnd(range.startContainer, range.startOffset);
    const preFrag = preRange.cloneContents();
    const preDiv = document.createElement('div');
    preDiv.appendChild(preFrag);
    const htmlBefore = preDiv.innerHTML;

    const postRange = range.cloneRange();
    postRange.selectNodeContents(container);
    postRange.setStart(range.endContainer, range.endOffset);
    const postFrag = postRange.cloneContents();
    const postDiv = document.createElement('div');
    postDiv.appendChild(postFrag);
    const htmlAfter = postDiv.innerHTML;

    return { htmlBefore, htmlAfter };
};
