
/**
 * Контекст определяет интерфейс, представляющий интерес для клиентов. Он также
 * хранит ссылку на экземпляр подкласса Состояния, который отображает текущее
 * состояние Контекста.
 */
class Searcher {

    state;

    constructor(state, query, source, highlightCallback) {
        this.query = query;
        this.source = source;
        this.highlightCallback = highlightCallback;
        this.transitionTo(state);
    }

    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    transitionTo(state) {
        console.log(`Context: Transition to ${(state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * Контекст делегирует часть своего поведения текущему объекту Состояния.
     */
    search() {
        this.state.search();
    }

    request2() {
        this.state.handle2();
    }
}

/**
 * Базовый класс Состояния объявляет методы, которые должны реализовать все
 * Конкретные Состояния, а также предоставляет обратную ссылку на объект
 * Контекст, связанный с Состоянием. Эта обратная ссылка может использоваться
 * Состояниями для передачи Контекста другому Состоянию.
 */
class State {
    context;

    result = [];
    draft = '';
    letterIndex = 0;

    increment(symbol) {
        this.draft += symbol;
        this.letterIndex++;
    };

    drop() {
        this.draft = '';
        this.letterIndex = 0;
    }

    setContext(context) {
        this.context = context;
    }
}

/**
 * Конкретные Состояния реализуют различные модели поведения, связанные с
 * состоянием Контекста.
 */
class StateOutside extends State {

    search() {
        for (let i = 0; i < this.context.source.length; i++) {
            const symbol = this.context.source[i];

            if (symbol === this.context.query[0]) {
                this.increment(symbol);
                this.context.transitionTo(new StateInside());
            } else {
                this.result.push(symbol);
            };

        }
        return this.result;
    }

}

class StateInside extends State {

    search() {
        for (let i = 0; i < this.context.source.length; i++) {
            const symbol = this.context.source[i];

            if (symbol === this.context.query[this.letterIndex]) {
                this.increment(symbol);
            } else {
                this.result.push(this.draft.length === this.query.length ? this.context.highlightCallback(this.draft) : this.draft, symbol);
                this.drop();
                this.context.transitionTo(new StateOutside());
            }
        }
        return this.result;
    }

}

export const searchByOOP = (query, source, highlightCallback) => {
    new Searcher(new StateOutside(), query, source, highlightCallback).search();
}
