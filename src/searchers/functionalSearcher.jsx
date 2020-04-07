export const searchFunctionally = (query, source, highlightCallback) => {

    const findEntries = (query, source) => source
        .split(query)
        .map(
            function (culm) {
                return this.position += culm.length + query.length;
            },
            { position: -query.length }
        )
        .slice(0, -1);

    const entries = findEntries(query, source).map(i => ([i, i + query.length]));

    if (!entries.length) {
        return [0, source];
    }

    const reducer = (acc, [start, end], index) => [...acc, source.slice(entries[index - 1] ? entries[index - 1][1] : 0, start), highlightCallback(source.slice(start, end))];
    const tale = source.slice(entries[entries.length - 1][1]);

    return [entries.length, [...entries.reduce(reducer, []), tale]];
}
