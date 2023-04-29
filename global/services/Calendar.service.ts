import StateService from './State.service';

class CalendarService extends StateService<State> {
    private hash: Record<number, ReadonlyArray<Event['id']>> = {};

    getHash() {
        return this.hash;
    }

    addEvent(data: Omit<Event, 'hashEntries' | 'id'>) {
        const randomId = Math.random().toString(36).substr(2, 9);

        const fullEvent = {
            ...data,
            id: randomId,
            hashEntries: [] as Array<number>,
        };

        const fromDay = new Date(data.from).setHours(0, 0, 0, 0);
        const toDay = new Date(data.to).setHours(0, 0, 0, 0);

        if (fromDay !== toDay) {
            const daysBetween = (toDay - fromDay) / (24 * 60 * 60 * 1000);
            const hashes = new Array(daysBetween).fill(0).map((_, index) => (
                new Date(data.from + index * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
            ));

            fullEvent.hashEntries.push(...hashes);

            hashes.forEach((hash) => {
                this.hash[hash] = [
                    ...this.hash[hash] || [],
                    randomId,
                ];
            });

            this.setState((current) => ({
                ...current,
                events: [
                    ...current.events,
                    fullEvent,
                ],
            }));

            return;
        }

        const day = new Date(data.from).setHours(0, 0, 0, 0);

        fullEvent.hashEntries.push(day);

        this.hash[day] = [
            ...this.hash[day] || [],
            randomId,
        ];

        this.setState((current) => ({
            ...current,
            events: [
                ...current.events,
                fullEvent,
            ],
        }));
    }

    setViewToMonth() {
        this.setView('month');
    }

    setViewToWeek() {
        this.setView('week');
    }

    setViewToDay() {
        this.setView('day');
    }

    setTimeToToday() {
        this.setTime(Date.now());
    }

    setTimeToNextMonth() {
        const date = new Date(this.state.today);
        date.setMonth(date.getMonth() + 1);
        this.setTime(date.getTime());
    }

    setTimeToPrevMonth() {
        const date = new Date(this.state.today);
        date.setMonth(date.getMonth() - 1);
        this.setTime(date.getTime());
    }

    setTimeToTomorrow() {
        this.setTime(this.state.today + 24 * 60 * 60 * 1000);
    }

    setTimeToYesterday() {
        this.setTime(this.state.today - 24 * 60 * 60 * 1000);
    }

    private setView(view: 'month' | 'week' | 'day') {
        this.mergeState({show: view});
    }

    private setTime(time: number) {
        this.mergeState({today: time});
    }

    constructor() {
        super({
            today: Date.now(),
            show: 'month',
            events: [],
        });

        this.hash = {};
    }
}

type Event = Readonly<{
    id: string
    heading: string
    from: number
    to: number
    hashEntries: ReadonlyArray<number>
}>;

type State = Readonly<{
    today: number
    show: 'month' | 'week' | 'day'
    events: ReadonlyArray<Event>
}>;

export type {
    State as CalendarState,
    Event as CalendarEvent,
};

export default CalendarService;
