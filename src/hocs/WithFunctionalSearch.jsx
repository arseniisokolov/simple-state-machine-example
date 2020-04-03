import React from 'react';

export const WithFunctionalSearch = (OriginalComponent) => (props) => {

    const findEntries = (query, source) => source.split(query).map(function (culm) {
        return this.pos += culm.length + query.length
    }, { pos: -query.length }).slice(0, -1);

    const getFormatted = (value) => {
        if (!value) {
            return props.source;
        }
        const entries = findEntries(value, props.source).map(i => ([i, i + value.length]));
        if (!entries.length) {
            return props.source;
        }
        return entries.reduce((acc, curr, index) => {
            return [...acc, props.source.slice(entries[index - 1] ? entries[index - 1][1] : 0, curr[0]), <b>{props.source.slice(curr[0], curr[1])}</b>];
        }, []).concat([props.source.slice(entries[entries.length - 1][1])]);
    }

    return <OriginalComponent {...props} onUpdate={(value) => props.onUpdate(getFormatted(value))} />
}
