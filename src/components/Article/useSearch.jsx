import React, { useState, useEffect } from 'react';

export const useSearch = (updateArticle, updateTiming, source, searcher) => {
    const [query, updateQuery] = useState('');

    useEffect(() => {
        const start = performance.now();
        updateArticle(searcher(query, source, (value) => <b>{value}</b>));
        updateTiming([start, performance.now()]);
    }, [query])

    return updateQuery;
}
