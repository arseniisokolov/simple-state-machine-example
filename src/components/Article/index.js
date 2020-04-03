import React, { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { searchFunctionally } from '../../helpers/searchFunctionally';
import { searchByStateMachine } from '../../helpers/searchByStateMachine';
import { searchByOOP } from '../../helpers/searchByOOP';
import { useSearch } from './useSearch';

export const Article = ({ children }) => {
    const [[start, finish], updateTiming] = useState([]);
    const [article, updateArticle] = useState(children);
    const updateArticleByFunctional = useSearch(updateArticle, updateTiming, children, searchFunctionally);
    const updateArticleByStateMachine = useSearch(updateArticle, updateTiming, children, searchByStateMachine);
    const updateArticleByOOP = useSearch(updateArticle, updateTiming, children, searchByOOP);

    return (
        <>
            <SearchForm onUpdate={updateArticleByFunctional} />
            <SearchForm onUpdate={updateArticleByStateMachine} />
            <SearchForm onUpdate={updateArticleByOOP} />
            <div>
                {finish - start}
            </div>
            <article>
                {article}
            </article>
        </>
    )
}
