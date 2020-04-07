import { ArticleType } from "../types";
import { SearchState } from './searcher.class';

export type SearcherType = (query: string, source: ArticleType, highlightCallback: (v: string) => JSX.Element) => [number, ArticleType];

export interface ISearchContext {
    switchStateTo(state: SearchState): void;
    handleSymbol(symbol: string): void;
}
