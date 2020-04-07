import { SearcherType } from "./types";

export const searchByStateMachine: SearcherType = (query, source, highlightCallback) => {
    const result = [];
    let state = 'outside';
    let draft = '';
    let letterIndex = 0;
    let counter = 0;

    const addToDraft = (symbol) => {
        draft += symbol;
        letterIndex++;
    };

    const dropDraft = () => {
        draft = '';
        letterIndex = 0;
    }

    const switchState = (newState) => state = newState;

    for (let i = 0; i < source.length; i++) {
        const symbol = source[i];

        switch (state) {
            case 'outside':
                if (symbol === query[0]) {
                    addToDraft(symbol);
                    switchState('inside');
                    continue;
                }
                result.push(symbol);
                break;
            case 'inside':
                if (symbol === query[letterIndex]) {
                    addToDraft(symbol);
                    continue;
                }
                if (draft.length === query.length) {
                    result.push(highlightCallback(draft));
                    counter++;
                } else {
                    result.push(draft);
                }
                result.push(symbol);
                dropDraft();
                switchState('outside');
                break;
        }
    }

    return [counter, result as JSX.Element[]];
}
