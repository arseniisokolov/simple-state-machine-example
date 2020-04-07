import React from 'react';
import { SearcherType, SearchStateType } from "./types";

export const searchByStateMachine: SearcherType = (query, source, highlightCallback) => {
    const result: JSX.Element[] = [];
    let state = 'outside' as SearchStateType;
    let draft = '';
    let letterIndex = 0;
    let counter = 0;

    const addToDraft = (symbol: string) => {
        draft += symbol;
        letterIndex++;
    };

    const dropDraft = () => {
        draft = '';
        letterIndex = 0;
    }

    const switchState = (newState: SearchStateType) => state = newState;
    const addToResult = (value: string) => result.push(<>{value}</>);

    for (let i = 0; i < source.length; i++) {
        const symbol: string = source[i];

        switch (state) {
            case 'outside':
                if (symbol === query[0]) {
                    addToDraft(symbol);
                    switchState('inside');
                    continue;
                }
                result.push(<>{symbol}</>);
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
                    addToResult(draft);
                }
                addToResult(symbol);
                dropDraft();
                switchState('outside');
                break;
        }
    }

    return [counter, result];
}
