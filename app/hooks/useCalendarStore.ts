import React from 'react';
import type {CalendarState} from '@/global/services/Calendar.service';
import {useCalendarProvider} from '../providers/Calendar.provider';

function useCalendarStore<R>(selector?: Fns<CalendarState, R>): R {
    const service = useCalendarProvider();
    const parameters = React.useMemo(() => (
        service.createSelector(selector)
    ), [selector, service]);

    return React.useSyncExternalStore(...parameters) as R;
}

export default useCalendarStore;
