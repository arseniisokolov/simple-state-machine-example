import { ISearchContext } from '../types';

export class Searcher implements ISearchContext {

    public static search(query: string, source: string, highlightCallback: (v: string) => JSX.Element): [number, JSX.Element[]] {
        return new Searcher(new StateOutside(), query, source, highlightCallback).runSearch();
    }

    public _result = [];
    private _state: State;
    private _letterIndex = 0;
    private _draft = '';
    private _counter = 0;
    private _query: string;
    private _source: string;
    private _highlightCallback: (v: string) => JSX.Element;

    public get currentQueryLetter(): string {
        return this._query[this._letterIndex];
    }

    public set letterIndex(value: number) {
        if (isFinite(value) && typeof value === 'number') {
            this._letterIndex = value;
        }
    }

    public set draft(value: string) {
        if (typeof value === 'string') {
            this._draft = value;
        }
    }
    public set counter(value: number) {
        if (isFinite(value) && typeof value === 'number') {
            this._counter = value;
        }
    }

    private constructor(state: State, query: string, source: string, highlightCallback: (v: string) => JSX.Element) {
        this._query = query;
        this._source = source;
        this._highlightCallback = highlightCallback;
        this.switchStateTo(state);
    }

    public switchStateTo(state: State) {
        this._state = state;
        this._state.setContext(this);
    }

    public handleSymbol(symbol: string) {
        this._state.handleSymbol(symbol);
    }


    public addDraftToResult(symbol: string, withHighlight: boolean) {
        const handledDraft = withHighlight ? this._highlightCallback(this._draft) : this._draft;
        this._result.push(handledDraft, symbol);
    }

    public isQueryFound(): boolean {
        return this._draft.length === this._query.length;
    }

    public isFirstSymbol(symbol: string): boolean {
        return symbol === this._query[0];
    }

    public addToResult(value: string) {
        this._result.push(value);
    }

    private runSearch(): [number, JSX.Element[]] {
        [...this._source].forEach(symbol => this.handleSymbol(symbol));
        return [this._counter, this._result];
    }

}

abstract class State {

    protected context: Searcher;

    public abstract handleSymbol(symbol: string): void;

    public setContext(context: Searcher) {
        this.context = context;
    }

    protected addToDraft(symbol: string) {
        this.context.draft += symbol;
        this.context.letterIndex++;
    };

    protected dropDraft() {
        this.context.draft = '';
        this.context.letterIndex = 0;
    }

}

class StateOutside extends State {

    public handleSymbol(symbol: string) {
        if (this.context.isFirstSymbol(symbol)) {
            this.addToDraft(symbol);
            this.context.switchStateTo(new StateInside());
            return;
        }
        this.context.addToResult(symbol);
    }

}

class StateInside extends State {

    public handleSymbol(symbol: string) {
        if (symbol === this.context.currentQueryLetter) {
            this.addToDraft(symbol);
            return;
        }
        if (this.context.isQueryFound()) {
            this.context.addDraftToResult(symbol, true);
            this.context.counter++;
        } else {
            this.context.addDraftToResult(symbol, false);
        }
        this.dropDraft();
        this.context.switchStateTo(new StateOutside());
    }

}