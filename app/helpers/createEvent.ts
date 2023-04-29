import EventModel from '@/global/services/Event.model';

function createEvent<T>(payload: T) {
    return new EventModel(payload);
}

export default createEvent;
