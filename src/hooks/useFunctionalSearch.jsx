import React, { useState, useEffect } from 'react';

export const useFunctionalSearch = (updateArticle, source) => {
    const [query, updateQuery] = useState('');

    useEffect(() => {
        updateArticle(getFormatted(query));
    }, [query])

    const findEntries = (query, source) => source.split(query).map(function (culm) {
        return this.pos += culm.length + query.length
    }, { pos: -query.length }).slice(0, -1);

    const getFormatted = (value) => {
        if (!value) {
            return source;
        }
        const entries = findEntries(value, source).map(i => ([i, i + value.length]));
        if (!entries.length) {
            return source;
        }
        return entries.reduce((acc, curr, index) => {
            return [...acc, source.slice(entries[index - 1] ? entries[index - 1][1] : 0, curr[0]), <b>{source.slice(curr[0], curr[1])}</b>];
        }, []).concat([source.slice(entries[entries.length - 1][1])]);
    }

    return updateQuery;
}
