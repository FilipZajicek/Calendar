import React, {Fragment} from 'react';
import classNames from 'classnames';
import AddEventModal from '@/app/components/AddEventModal';
import useDayEvents from '@/app/hooks/useDayEvents';
import useCalendarStore from '../hooks/useCalendarStore';
import selectTime from '../helpers/selectTime';

const today = new Date();
today.setHours(0, 0, 0, 0);

function CalendarDay({dayInMonth}: Props) {
    const time = useCalendarStore(selectTime);
    const timeDate = new Date(time);

    const year = timeDate.getFullYear();
    const month = timeDate.getMonth();
    const date = new Date(year, month, dayInMonth + 1);
    const events = useDayEvents(date.getTime());

    const [showMenu, toggle] = React.useReducer((s) => !s, false);

    const label = date.toLocaleDateString(undefined, {day: 'numeric'});

    const isToday = date.getTime() === today.getTime();
    const isCurrentMonth = date.getMonth() === today.getMonth();


    return (
        <>
            <AddEventModal showMenu={showMenu} toggle={toggle}/>
            <button
                type="button"
                onClick={toggle}
                key={date.toLocaleString()}
                className={classNames(
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-grey-500',
                    'relative px-3 py-2 text-left hover:bg-gray-100 focus:z-10',
                )}
            >
                <time
                    dateTime={date.toLocaleString()}
                    className={
                        isToday
                            ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                            : undefined
                    }
                >
                    {label}
                </time>
                <ol className="mb-10">
                    {events.map((event) => (
                        <li key={event.id}>
                            <a className="group flex ">
                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                    {event.heading}
                                </p>
                                <time
                                    dateTime={event.from.toLocaleString()}
                                    className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                >
                                    {`${new Date(event.from).toLocaleTimeString([], {
                                        hour12: true,
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: undefined
                                    })} - ${new Date(event.to).toLocaleTimeString([], {
                                        hour12: true,
                                        hour: 'numeric',
                                        minute: "numeric",
                                        second: undefined
                                    })}`}
                                </time>
                            </a>
                        </li>
                    ))}
                    {events.length > 2 && (
                        <li className="text-gray-500">
                            +
                            {events.length - 2}
                            {' '}
                            more
                        </li>
                    )}
                </ol>
            </button>
        </>
    );
}

type Props = Readonly<{ dayInMonth: number; }>;

export default CalendarDay;

