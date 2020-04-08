import { ISearchContext, SearcherType } from './types';

export class Searcher implements ISearchContext {

    public static search: SearcherType = (query, article) => {
        return new Searcher(new SearchOutsideState(), query, article).runSearch();
    };

    public _result: string[] = [];
    private _state: SearchState;
    private _letterIndex = 0;
    private _articlePart = '';
    private _foundCandidate = '';
    private _query: string;
    private _article: string;

    public get CurrentQueryLetter(): string {
        return this._query[this._letterIndex];
    }

    public get LetterIndex(): number {
        return this._letterIndex;
    }

    public set LetterIndex(value: number) {
        if (isFinite(value) && typeof value === 'number') {
            this._letterIndex = value;
        }
    }

    public get FoundCandidate(): string {
        return this._foundCandidate;
    }

    public set FoundCandidate(value: string) {
        if (typeof value === 'string') {
            this._foundCandidate = value;
        }
    }

    private constructor(state: SearchState, query: string, article: string) {
        this._query = query;
        this._article = article;
        this.switchStateTo(state);
    }

    public switchStateTo(state: SearchState) {
        this._state = state;
        this._state.setContext(this);
    }

    public handleSymbol(symbol: string) {
        this._state.handleSymbol(symbol);
    }

    public isQueryCompletelyFound(): boolean {
        return this._foundCandidate === this._query;
    }

    public isFirstSymbol(symbol: string): boolean {
        return symbol === this._query[0];
    }

    public addToArticlePart(value: string) {
        this._articlePart += value;
    }

    public finishArticlePart() {
        this._result.push(this._articlePart);
    }

    private runSearch(): string[] {
        [...this._article].forEach(symbol => this.handleSymbol(symbol));
        return this._result.length ? this._result : [this._article];
    }

}

export abstract class SearchState {

    protected context: Searcher;

    public abstract handleSymbol(symbol: string): void;

    public setContext(context: Searcher) {
        this.context = context;
    }

    protected addToCandidate(symbol: string) {
        this.context.FoundCandidate += symbol;
        this.context.LetterIndex++;
    };

    protected dropCandidate() {
        this.context.FoundCandidate = '';
        this.context.LetterIndex = 0;
    }

}

class SearchOutsideState extends SearchState {

    public handleSymbol(symbol: string) {
        if (this.context.isFirstSymbol(symbol)) {
            this.addToCandidate(symbol);
            this.context.switchStateTo(new SearchInsideState());
        } else {
            this.context.addToArticlePart(symbol);
        }
    }

}

class SearchInsideState extends SearchState {

    public handleSymbol(symbol: string) {
        if (this.context.isQueryCompletelyFound()) {
            this.context.finishArticlePart();
            this.context.addToArticlePart(symbol);
            this.dropCandidate();
            this.context.switchStateTo(new SearchOutsideState());
        }
        if (symbol === this.context.CurrentQueryLetter) {
            this.addToCandidate(symbol);
            return;
        }
        this.context.addToArticlePart(this.context.FoundCandidate);
        this.dropCandidate();
        this.context.switchStateTo(new SearchOutsideState());
    }

}