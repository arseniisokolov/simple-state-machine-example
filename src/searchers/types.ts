import { SearchState } from './searcher.class';
import { ArticleType } from '../types';

export type SearcherType = (query: string, article: string, highlightCallback: (v: string) => JSX.Element) => [number, ArticleType];

export interface ISearchContext {
    switchStateTo(state: SearchState): void;
    handleSymbol(symbol: string): void;
}
