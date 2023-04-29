class EventModel<T> {
    private readonly _current: T;

    get current(): T {
        return this._current;
    }

    constructor(current: T) {
        this._current = current;
    }
}

export default EventModel;
