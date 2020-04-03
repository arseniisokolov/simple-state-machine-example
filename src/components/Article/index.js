import React, { useState } from 'react';
import { useFunctionalSearch } from '../../hooks/useFunctionalSearch';
import { useStateMachineSearch } from '../../hooks/useStateMachineSearch';
import { SearchForm } from '../SearchForm';

export const Article = ({ children }) => {
    const [article, updateArticle] = useState(children);
    const updateByFunctionally = useFunctionalSearch(updateArticle, children);
    const updateByStateMachine = useStateMachineSearch(updateArticle, children);

    return (
        <>
            <SearchForm onUpdate={updateByFunctionally} />
            <SearchForm onUpdate={updateByStateMachine} />
            <article>
                {article}
            </article>
        </>
    )
}
