import CalendarDay from '@/app/components/CalendarDay';
import React from 'react';
import getDaysInMonth from '@/app/helpers/getDaysInMonth';
import useCalendarStore from '@/app/hooks/useCalendarStore';

function CalendarDayList() {
    const view = useCalendarStore((state) => state.show);
    const time = useCalendarStore((state) => state.today);

    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();

    const amountOfDaysAsArray = React.useMemo(() => {
        if (view === 'day') {
            return new Array(1).fill(0);
        }

        if (view === 'week') {
            return new Array(7).fill(0);
        }

        return new Array(getDaysInMonth(month, year)).fill(0);
    }, [view, month, year]);

    return (
        <div className="hidden w-full h-screen lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {amountOfDaysAsArray.map((_, day) => <CalendarDay dayInMonth={day}/>)}
        </div>
    );
}

export default CalendarDayList;
