import type EventModel from './Event.model';

class ListenerModel<T> {
    private readonly callbackFn: (event: EventModel<T>) => void;

    receive(event: EventModel<T>): void {
        this.callbackFn(event);
    }

    constructor(callbackFn: (event: EventModel<T>) => void) {
        this.callbackFn = callbackFn;
    }
}

export default ListenerModel;
