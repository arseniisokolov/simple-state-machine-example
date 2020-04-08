import React, { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { searchFunctionally } from '../../searchers/functionalSearcher';
import { searchByStateMachine } from '../../searchers/stateMachineSearcher';
import { Searcher } from '../../searchers/Searcher.class';
import { ARTICLE_EXAMPLE } from '../../constants';
import { ArticleType } from '../../types';
import { SearcherType } from '../../searchers/types';

export const App: React.FC = () => {

  const [highligtedArticle, highlightArticle] = useState<ArticleType>();

  const FORMS_CONFIG: [string, SearcherType][] = [
    ['Ищем в функциональной парадигме', searchFunctionally],
    ['Ищем с помощью конечного автомата', searchByStateMachine],
    ['Ищем с помощью ООП', Searcher.search],
  ];

  return (
    <>
      <header className='page__header'>
        <h1 className='page__title'>Поиск по тексту</h1>
        <p className='page__subtitle'>три варианта решения одной задачи</p>
      </header>

      <main className='page__main'>
        <div className='page__search-container'>
          {
            FORMS_CONFIG.map(([caption, searchBy]) => (
              <SearchForm
                key={caption}
                caption={caption}
                article={ARTICLE_EXAMPLE}
                onUpdateArticle={highlightArticle}
                searchBy={searchBy}
                mix='page__searchform'
              />
            ))
          }
        </div>
        <article className='page__article article'>
          {highligtedArticle}
        </article>
      </main>

      <footer className='page__footer'></footer>
    </>
  );
};
