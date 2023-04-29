import {useCalendarProvider} from '@/app/providers/Calendar.provider';
import React from 'react';
import CalendarService, {CalendarEvent, CalendarState} from '@/global/services/Calendar.service';
import EventModel from '@/global/services/Event.model';
import createListener from '@/app/helpers/createListener';
import ListenerModel from '@/global/services/Listener.model';

function useDayEvents(day: number) {
    const service = useCalendarProvider();
    const [daysEvents, setDaysEvents] = React.useState<CalendarEvent[]>([]);
    const previousDays = React.useRef<string | null>(null);

    const listenFn = React.useCallback((event: EventModel<CalendarState>) => {
        const {events} = event.current;
        const filteredEvents = events.filter((evItem) => (
            new Date(evItem.from).setHours(0, 0, 0, 0) === day
        ));
        const joinedEvents = filteredEvents.join(',');

        if (previousDays.current !== joinedEvents) {
            setDaysEvents(filteredEvents);
        }
    }, [day]);

    const listener: ListenerModel<CalendarState> = React.useMemo(() => (
        createListener(listenFn)
    ), [listenFn]);

    React.useEffect(() => {
        const unsubscribe = service.subscribe(listener);

        return () => {
            unsubscribe();
        };
    }, [listener, service]);

    return daysEvents;
}

export default useDayEvents;
