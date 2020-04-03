import React, { useState } from 'react';
import { FunctionalSearchForm } from '../FunctionalSearchForm';

export const Article = ({ children }) => {

    const [article, formatArticle] = useState(children);

    return (
        <>
            <FunctionalSearchForm source={children} onUpdate={formatArticle} />
            {/* <SearchForm onChange={updateQuery} />
            <SearchForm onChange={updateQuery} /> */}
            <article>
                {article}
            </article>
        </>
    )
}
