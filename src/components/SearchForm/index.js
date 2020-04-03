import React, { useState, useEffect } from 'react'

export const SearchForm = ({ onUpdate }) => {

    const [query, updateQuery] = useState('');

    useEffect(() => {
        onUpdate(query);
    }, [query]);

    return (
        <form>
            <input placeholder='Например, COVID-19' value={query} onChange={({ target: { value } }) => updateQuery(value)} />
        </form>
    );
};
