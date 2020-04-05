import React, { useState, useEffect } from 'react';
import { HighlightedPhrase } from '../components/HighlightedPhrase';

export const useSearch = (updateArticle, updateTiming, updateCounter, source, searcher) => {
    const [query, updateQuery] = useState('');

    const dropSearch = () => {
        updateCounter(null);
        updateArticle(source);
        updateTiming([null, null]);
    }

    const updateSearch = () => {
        const start = performance.now();
        const [count, article] = searcher(query, source, (value) => <HighlightedPhrase phrase={value} />);
        updateCounter(count);
        updateArticle(article);
        updateTiming([start, performance.now()]);
    }

    useEffect(() => query ? updateSearch() : dropSearch(), [query]);

    return updateQuery;
}
