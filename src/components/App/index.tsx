import React, { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { searchFunctionally } from '../../searchers/functionalSearcher';
import { searchByStateMachine } from '../../searchers/stateMachineSearcher';
import { Searcher } from '../../searchers/Searcher.class';
import { ARTICLE_EXAMPLE } from '../../constants';
import { ArticleType } from '../../types';

export const App: React.FC = () => {

  const [highligtedArticle, highlightArticle] = useState<ArticleType>(ARTICLE_EXAMPLE);

  return (
    <>
      <header className='page__header'>
        <h1 className='page__title'>Поиск по тексту</h1>
        <p className='page__subtitle'>три варианта решения одной задачи</p>
      </header>

      <main className='page__main'>
        <div className='page__search-container'>
          <SearchForm
            caption='Ищем в функциональной парадигме'
            article={ARTICLE_EXAMPLE}
            onUpdateArticle={highlightArticle}
            searchBy={searchFunctionally}
            mix='page__searchform'
          />
          <SearchForm
            caption='Ищем с помощью конечного автомата'
            article={ARTICLE_EXAMPLE}
            onUpdateArticle={highlightArticle}
            searchBy={searchByStateMachine}
            mix='page__searchform'
          />
          <SearchForm
            caption='Ищем с помощью ООП'
            article={ARTICLE_EXAMPLE}
            onUpdateArticle={highlightArticle}
            searchBy={Searcher.search}
            mix='page__searchform'
          />
        </div>
        <article className='page__article article'>
          {highligtedArticle}
        </article>
      </main>

      <footer className='page__footer'></footer>
    </>
  );
};
