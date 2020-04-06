export class Searcher {

    static search(query, source, highlightCallback) {
        return new Searcher(new StateOutside(), query, source, highlightCallback).search();
    }

    state;
    result = [];
    draft = '';
    letterIndex = 0;
    counter = 0;

    get currentLetter() {
        return this.query[this.letterIndex];
    }

    constructor(state, query, source, highlightCallback) {
        this.query = query;
        this.source = source;
        this.highlightCallback = highlightCallback;
        this.switchStateTo(state);
    }

    switchStateTo(state) {
        this.state = state;
        this.state.setContext(this);
    }

    handleLetter(symbol) {
        this.state.handleLetter(symbol);
    }

    search() {
        [...this.source].forEach(symbol => this.handleLetter(symbol));
        return [this.counter, this.result];
    }

    addDraftToResult(symbol, withHighlight) {
        const handledDraft = withHighlight ? this.highlightCallback(this.draft) : this.draft;
        this.result.push(handledDraft, symbol);
    }

    isQueryFound() {
        return this.draft.length === this.query.length;
    }

}

class State {

    context;

    setContext(context) {
        this.context = context;
    }

    addToDraft(symbol) {
        this.context.draft += symbol;
        this.context.letterIndex++;
    };

    dropDraft() {
        this.context.draft = '';
        this.context.letterIndex = 0;
    }

}

class StateOutside extends State {

    handleLetter(symbol) {
        if (symbol === this.context.query[0]) {
            this.addToDraft(symbol);
            this.context.switchStateTo(new StateInside());
            return;
        }
        this.context.result.push(symbol);
    }

}

class StateInside extends State {

    handleLetter(symbol) {
        if (symbol === this.context.currentLetter) {
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