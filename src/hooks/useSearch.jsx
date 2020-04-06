import React, { useState, useEffect } from 'react';
import { HighlightedPhrase } from '../components/HighlightedPhrase';

export const useSearch = (updateArticle, updateStatistics, source, searcher) => {
    const [query, updateQuery] = useState('');

    const formatFloat = value => Math.floor(value * 100) / 100;

    const dropSearch = () => {
        updateArticle(source);
        updateStatistics([null, null]);
    }

    const updateSearch = () => {
        const start = performance.now();
        const [count, article] = searcher(query, source, (value) => <HighlightedPhrase phrase={value} />);
        updateArticle(article);
        updateStatistics([count, formatFloat(performance.now() - start)]);
    }

    useEffect(() => query ? updateSearch() : dropSearch(), [query]);

    return updateQuery;
}
