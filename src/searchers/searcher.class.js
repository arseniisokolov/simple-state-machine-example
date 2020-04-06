export class Searcher {

    static search(query, source, highlightCallback) {
        return new Searcher(new StateOutside(), query, source, highlightCallback).search();
    }

    state;
    result = [];
    draft = '';
    letterIndex = 0;
    counter = 0;

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
        } else {
            this.context.result.push(symbol);
        };
    }

}

class StateInside extends State {

    handleLetter(symbol) {
        if (symbol === this.context.query[this.context.letterIndex]) {
            this.addToDraft(symbol);
        } else {
            if (this.context.draft.length === this.context.query.length) {
                this.context.result.push(this.context.highlightCallback(this.context.draft));
                console.log(this.context.result);
                this.context.counter++;
            } else {
                this.context.result.push(this.context.draft);
            }
            this.context.result.push(symbol);
            this.dropDraft();
            this.context.switchStateTo(new StateOutside());
        }
    }

}