import { SearcherType, SearchStateType } from "./types";

export const searchByStateMachine: SearcherType = (query, article) => {
    const result: string[] = [];
    let state = 'inside' as SearchStateType;
    let articlePart = '';
    let foundCandidate = '';
    let letterIndex = 0;

    const switchState = (newState: SearchStateType) => state = newState;

    for (let i = 0; i < article.length; i++) {
        const symbol: string = article[i];

        switch (state) {
            case 'outside':
                if (symbol === query[0]) {
                    foundCandidate += symbol;
                    letterIndex++;
                    switchState('inside');
                    continue;
                }
                articlePart += symbol;
                break;
            case 'inside':
                if (foundCandidate === query) {
                    result.push(articlePart);
                    articlePart = symbol;
                    foundCandidate = '';
                    letterIndex = 0;
                    switchState('outside');
                }
                if (symbol === query[letterIndex]) {
                    foundCandidate += symbol;
                    letterIndex++;
                    continue;
                }
                articlePart += foundCandidate;
                foundCandidate = '';
                letterIndex = 0;
                switchState('outside');
                break;
        }
    }
    console.log(result);

    return result.length ? result : [article];
}
