import React, { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { searchFunctionally } from '../SearchForm/searchers/searchFunctionally';
import { searchByStateMachine } from '../SearchForm/searchers/searchByStateMachine';
import { searchByOOP } from '../SearchForm/searchers/searchByOOP';
import { useSearch } from '../../hooks/useSearch';
import { ARTICLE_EXAMPLE } from '../../constants';

export const App = () => {

  const [[start, finish], updateTiming] = useState([]);
  const [count, updateCounter] = useState(0);
  const [article, updateArticle] = useState(ARTICLE_EXAMPLE);
  const updateArticleByFunctional = useSearch(updateArticle, updateTiming, updateCounter, ARTICLE_EXAMPLE, searchFunctionally);
  const updateArticleByStateMachine = useSearch(updateArticle, updateTiming, updateCounter, ARTICLE_EXAMPLE, searchByStateMachine);
  // const updateArticleByOOP = useSearch(updateArticle, updateTiming, children, searchByOOP);

  return (
    <>
      <SearchForm onUpdate={updateArticleByFunctional} />
      <SearchForm onUpdate={updateArticleByStateMachine} />
      {/* <SearchForm onUpdate={updateArticleByOOP} /> */}
      <div>
        {finish - start}
      </div>
      <div>
        {count}
      </div>
      <article className='article'>
        {/* <pre> */}
          {article}
        {/* </pre> */}
      </article>
    </>
  );
};
