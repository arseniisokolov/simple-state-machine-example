import React from 'react';

import { SearcherType } from "./types";

const findEntries = (query: string, source: string): number[] => source
    .split(query)
    .map(
        function (culm) {

            const context = this;
            return context.position += culm.length + query.length;
        },
        { position: -query.length }
    )
    .slice(0, -1);

export const searchFunctionally: SearcherType = (query, article, highlightCallback) => {

    const entries: [number, number][] = findEntries(query, article).map(i => ([i, i + query.length]));

    if (!entries.length) {
        return [0, article];
    }

    const sliceWord = (current: [number, number], index: number) => article.slice(entries[index - 1] ? entries[index - 1][1] : 0, current[0]);
    const reduceArticle = (acc: JSX.Element[], current: [number, number], index: number) => [...acc, <>{sliceWord(current, index)}</>, highlightCallback(article.slice(...current))];

    const tale = <>{article.slice(entries[entries.length - 1][1])} </>;

    return [entries.length, [...entries.reduce(reduceArticle, []), tale]];
}
