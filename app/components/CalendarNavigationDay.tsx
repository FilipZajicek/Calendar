function CalendarNavigationDay({dayLetter}: Props) {
    return (
        <div className="bg-white py-2">
            {dayLetter}
        </div>
    );
}

type Props = Readonly<{
    dayLetter: 'M' | 'T' | 'W' | 'F' | 'S'
}>;

export default CalendarNavigationDay;
