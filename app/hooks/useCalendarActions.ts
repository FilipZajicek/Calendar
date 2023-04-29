import {useCalendarProvider} from '@/app/providers/Calendar.provider';
import React from 'react';
import {CalendarEvent} from '@/global/services/Calendar.service';

function useCalendarActions() {
    const service = useCalendarProvider();

    function createEvent(data: Omit<CalendarEvent, 'hashEntries' | 'id'>) {
        service.addEvent(data);
    }

    function goNextMonth() {
        service.setTimeToNextMonth();
    }

    function goPrevMonth() {
        service.setTimeToPrevMonth();
    }

    function goTomorrow() {
        service.setTimeToTomorrow();
    }

    function goYesterday() {
        service.setTimeToYesterday();
    }

    function viewDay() {
        service.setViewToDay();
    }

    function viewWeek() {
        service.setViewToWeek();
    }

    function viewMonth() {
        service.setViewToMonth();
    }

    function goToday() {
        service.setTimeToToday();
    }

    return {
        goTomorrow: React.useCallback(goTomorrow, [service]),
        goYesterday: React.useCallback(goYesterday, [service]),
        viewDay: React.useCallback(viewDay, [service]),
        viewWeek: React.useCallback(viewWeek, [service]),
        viewMonth: React.useCallback(viewMonth, [service]),
        goNextMonth: React.useCallback(goNextMonth, [service]),
        goPrevMonth: React.useCallback(goPrevMonth, [service]),
        goToday: React.useCallback(goToday, [service]),
        createEvent: React.useCallback(createEvent, [service]),
    };
}

export default useCalendarActions;
