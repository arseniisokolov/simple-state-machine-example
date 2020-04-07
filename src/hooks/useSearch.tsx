import React, { useState, useEffect } from 'react';
import { HighlightedPhrase } from '../components/HighlightedPhrase/index';
import { UseSearchHookType } from './types';

export const useSearch: UseSearchHookType = (updateArticle, updateStatistics, article, searchBy) => {
    const [query, updateQuery] = useState('');

    const formatFloat = (value: number): number => Math.floor(value * 100) / 100;

    // const highlightPhrase = (value: string): JSX.Element => <HighlightedPhrase phrase={value} />;

    const dropSearch = () => {
        updateArticle(article);
        updateStatistics([null, null]);
    }

    const updateSearch = () => {
        const start = performance.now();
        const handledArticle = searchBy(query, article);
        console.log(handledArticle);
        updateStatistics([handledArticle.length - 1, formatFloat(performance.now() - start)]);
        updateArticle(handledArticle.reduce((acc, curr) => [...acc, curr, <HighlightedPhrase phrase={query} />], []));
    }

    useEffect(() => query ? updateSearch() : dropSearch(), [query]);

    return updateQuery;
}
