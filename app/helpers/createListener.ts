import ListenerModel from '@/global/services/Listener.model';
import type EventModel from '@/global/services/Event.model';

function createListener<T>(callbackFn: Fns<EventModel<T>>) {
    return new ListenerModel(callbackFn);
}

export default createListener;
