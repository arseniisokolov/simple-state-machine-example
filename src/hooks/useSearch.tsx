import React, { useState, useEffect } from 'react';
import { HighlightedPhrase } from '../components/HighlightedPhrase/index.tsx';
import { SearcherType } from '../searchers/types.ts';
import { ArticleType } from '../types';

export const useSearch = (updateArticle: (v: ArticleType) => void, updateStatistics: (v: [number, number]) => void, source: string, searchBy: SearcherType) => {
    const [query, updateQuery] = useState('');

    const formatFloat = (value: number): number => Math.floor(value * 100) / 100;

    const highlightPhrase = (value: string): JSX.Element => <HighlightedPhrase phrase={value} />;

    const dropSearch = () => {
        updateArticle(source);
        updateStatistics([null, null]);
    }

    const updateSearch = () => {
        const start = performance.now();
        const [count, article] = searchBy(query, source, highlightPhrase);
        updateArticle(article);
        updateStatistics([count, formatFloat(performance.now() - start)]);
    }

    useEffect(() => query ? updateSearch() : dropSearch(), [query]);

    return updateQuery;
}
