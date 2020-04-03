import React, { useState, useEffect } from 'react';

export const useStateMachineSearch = (updateArticle, source) => {
    const [query, updateQuery] = useState('');

    useEffect(() => {
        updateArticle(getFormatted(query));
    }, [query]);

    const getFormatted = () => {
        const result = [];
        let state = 'outside';
        let draft = '';
        let letterIndex = 0;

        const increment = (symbol) => {
            draft += symbol;
            letterIndex++;
        };

        const drop = () => {
            draft = '';
            letterIndex = 0;
        }
        const getHighlited = () => <b>{draft}</b>;

        for (let i = 0; i < source.length; i++) {
            const symbol = source[i];

            switch (state) {
                case 'outside':
                    if (symbol === query[0]) {
                        increment(symbol);
                        state = 'inside'
                    } else {
                        result.push(symbol);
                    };
                    break;
                case 'inside':
                    if (symbol === query[letterIndex]) {
                        increment(symbol);
                    } else {
                        result.push(draft.length === query.length ? getHighlited() : draft, symbol);
                        drop();
                        state = 'outside'
                    }
                    break;
            }
        }
        return result;
    };

    return updateQuery;
}
