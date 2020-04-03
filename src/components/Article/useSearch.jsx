import React, { useState, useEffect } from 'react';

export const useSearch = (updateArticle, updateTiming, updateCounter, source, searcher) => {
    const [query, updateQuery] = useState('');

    useEffect(() => {
        const start = performance.now();
        const [count, article] = searcher(query, source, (value) => <b>{value}</b>);
        updateCounter(count);
        updateArticle(article);
        updateTiming([start, performance.now()]);
    }, [query])

    return updateQuery;
}
