export interface ISearchContext {
    switchStateTo(state: State): void;
    handleSymbol(symbol: string): void;
}