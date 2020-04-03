export const searchFunctionally = (query, source, highlightCallback) => {

    const findEntries = (query, source) => source.split(query).map(function (culm) {
        return this.pos += culm.length + query.length
    }, { pos: -query.length }).slice(0, -1);

    if (!query) {
        return source;
    }

    const entries = findEntries(query, source).map(i => ([i, i + query.length]));

    if (!entries.length) {
        return source;
    }

    const formattedArticle = entries.reduce((acc, curr, index) => {
        return [...acc, source.slice(entries[index - 1] ? entries[index - 1][1] : 0, curr[0]), highlightCallback(source.slice(curr[0], curr[1]))];
    }, []).concat([source.slice(entries[entries.length - 1][1])]);

    return [entries.length, formattedArticle];
}
