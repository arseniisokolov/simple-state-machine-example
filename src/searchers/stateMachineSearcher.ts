import { SearcherType, SearchStateType } from "./types";

export const searchByStateMachine: SearcherType = (query, article) => {
    const result: string[] = [];
    let state = 'inside' as SearchStateType;
    let articlePart = '';
    let foundCandidate = '';
    let letterIndex = 0;

    const addToCandidate = (symbol: string) => {
        foundCandidate += symbol;
        letterIndex++;
    };

    const dropCandidate = () => {
        foundCandidate = '';
        letterIndex = 0;
    };

    const switchState = (newState: SearchStateType) => state = newState;

    for (let i = 0; i < article.length; i++) {
        const symbol: string = article[i];

        switch (state) {
            case 'outside':
                if (symbol === query[0]) {
                    addToCandidate(symbol);
                    switchState('inside');
                    continue;
                }
                articlePart += symbol;
                break;
            case 'inside':
                if (foundCandidate === query) {
                    result.push(articlePart);
                    articlePart = symbol;
                    dropCandidate();
                    switchState('outside');
                }
                if (symbol === query[letterIndex]) {
                    addToCandidate(symbol);
                    continue;
                }
                articlePart += foundCandidate;
                dropCandidate();
                switchState('outside');
                break;
        }
    }

    return result.length ? result : [article];
}
