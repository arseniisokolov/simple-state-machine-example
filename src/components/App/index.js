import React, { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { searchFunctionally } from '../SearchForm/searchers/searchFunctionally';
import { searchByStateMachine } from '../SearchForm/searchers/searchByStateMachine';
import { searchByOOP } from '../SearchForm/searchers/searchByOOP';
import { ARTICLE_EXAMPLE } from '../../constants';

export const App = () => {

  const [highligtedArticle, highlightArticle] = useState();

  return (
    <>
      <header class='page__header'>
        <h1 class='page__title'>Поиск по тексту</h1>
      </header>
      <main class='page__main'>
        <div className='page__search-container'>
          <SearchForm article={ARTICLE_EXAMPLE} onUpdateArticle={highlightArticle} searcher={searchFunctionally} mix='page__searchform' />
          <SearchForm article={ARTICLE_EXAMPLE} onUpdateArticle={highlightArticle} searcher={searchByStateMachine} mix='page__searchform' />
          {/* <SearchForm onUpdate={updateArticleByOOP} /> */}
        </div>
        <article className='page__article article'>
          {highligtedArticle}
        </article>
      </main>
      <footer class='page__footer'></footer>
    </>
  );
};
