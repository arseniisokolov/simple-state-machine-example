import { SearcherType, SearchStateType } from "./types";

export const searchByStateMachine: SearcherType = (query, source) => {
    const result: string[] = [];
    let state = 'beforeEnd' as SearchStateType;
    let articlePart = '';
    let foundCandidate = '';
    let letterIndex = 0;

    const switchState = (newState: SearchStateType) => state = newState;

    for (let i = 0; i < source.length; i++) {
        const symbol: string = source[i];

        switch (state) {
            case 'beforeEnd':
                if (symbol === query[0]) {
                    articlePart += symbol;
                    letterIndex++;
                    foundCandidate += symbol;
                    continue;
                }
                if (symbol !== query[letterIndex]) {

                }
                if (foundCandidate.length === query.length) {

                    switchState('beforeEnd');
                }
                articlePart += symbol;
                break;
            case 'inside':
                if (symbol === query[letterIndex]) {
                    letterIndex++;
                    continue;
                }
                addToDraft(symbol);
                switchState('outside');
                break;
        }
    }

    return result;
}
