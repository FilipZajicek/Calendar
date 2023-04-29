import ObserverService from './Observer.service';
import createEvent from '../../app/helpers/createEvent';
import React from 'react';

class StateService<T> extends ObserverService<T> {
    private _state: T;

    get state(): T {
        return this._state;
    }

    setState(factory: T | Fns<T, T>) {
        const update = factory instanceof Function ? factory(this._state) : factory;
        this._state = update;
        this.broadcast(createEvent(update));
    }

    mergeState(fragment: Partial<T>) {
        function merge(state: T) {
            return {...state, ...fragment};
        }

        this.setState(merge);
    }

    createSelector<R>(selector?: Fns<T, R>): Parameters<typeof React.useSyncExternalStore<R>> {
        return [
            this.externally.bind(this),
            selector ? () => selector(this.state) as R : () => this.state as R,
        ];
    }

    constructor(initialState: T) {
        super();

        this._state = initialState;
    }
}

export default StateService;
