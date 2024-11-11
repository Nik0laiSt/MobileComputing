import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarProps } from './CalendarConfig';
import './App.scss';

const App: FunctionComponent = () => {

    const calendar = useRef<BryntumCalendar>(null);

    return (
        <BryntumCalendar
            ref = {calendar}
            {...calendarProps}
        />
    );
};

export default App;
