import type ListenerModel from './Listener.model';
import type EventModel from './Event.model';
import createListener from '../../app/helpers/createListener';

type Listener<T> = ListenerModel<T>;

class ObserverService<T> {
    private readonly observers: Set<Listener<T>>;

    subscribe(audience: Listener<T> | ReadonlyArray<Listener<T>>) {
        this.connect(audience);
        return () => this.disconnect(audience);
    }

    externally(callback: Fns<EventModel<T>>) {
        return this.subscribe(createListener(callback));
    }

    broadcast(event: EventModel<T>) {
        this.observers.forEach(notifyListener(event));
    }

    private disconnect(audience: Listener<T> | ReadonlyArray<Listener<T>>) {
        if (Array.isArray(audience)) {
            this.disconnectMany(audience);
            return;
        }

        this.disconnectOne(audience as Listener<T>);
    }

    private connect(audience: Listener<T> | ReadonlyArray<Listener<T>>) {
        if (Array.isArray(audience)) {
            this.connectMany(audience);
            return;
        }

        this.connectOne(audience as Listener<T>);
    }

    private connectMany(listeners: ReadonlyArray<Listener<T>>): void {
        listeners.forEach(this.connectOne.bind(this));
    }

    private disconnectMany(listeners: ReadonlyArray<Listener<T>>): void {
        listeners.forEach(this.disconnectOne.bind(this));
    }

    private connectOne(listener: Listener<T>): void {
        this.observers.add(listener);
    }

    private disconnectOne(listener: Listener<T>): void {
        this.observers.delete(listener);
    }

    constructor() {
        this.observers = new Set();
    }
}

function notifyListener<T>(event: EventModel<T>) {
    return function notify(listener: Listener<T>) {
        listener.receive(event);
    };
}

export default ObserverService;
