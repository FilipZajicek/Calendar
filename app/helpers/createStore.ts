import React from 'react';
import StateService from '@/global/services/State.service';

function createStore<T>(service: StateService<T>) {
    return function useStore<R>(selector?: Fns<T, R>) {
        const parameters = React.useMemo(() => (
            service.createSelector(selector)
        ), [selector]);

        return React.useSyncExternalStore(...parameters);
    };
}

export default createStore;
