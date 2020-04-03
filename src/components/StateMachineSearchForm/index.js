import React, { useState, useEffect } from 'react'

export const SearchForm = ({ onChange }) => {

    const [query, updateQuery] = useState();

    useEffect(() => {
        onChange(query);
    }, [query]);

    return (
        <form>
            <input placeholder='Например, COVID-19' value={query} onChange={({ target: { value } }) => updateQuery(value)} />
        </form>
    );
};
