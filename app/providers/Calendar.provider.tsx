import createContext from '../helpers/createContext';
import CalendarService from '@/global/services/Calendar.service';

const [Provider, useProvider] = createContext<CalendarService>('CalendarContext');

const instance = new CalendarService();

function CalendarProvider({children}: ElementChildren) {
    return (
        <Provider value={instance}>
            {children}
        </Provider>
    );
}

export {useProvider as useCalendarProvider};

export default CalendarProvider;
