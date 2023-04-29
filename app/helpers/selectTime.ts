import type {CalendarState} from '@/global/services/Calendar.service';

function selectTime(state: CalendarState) {
    return state.today;
}

export default selectTime;
