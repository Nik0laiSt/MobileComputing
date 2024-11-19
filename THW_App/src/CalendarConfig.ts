
import { BryntumCalendarProps } from '@bryntum/calendar-react';
import { Calendar } from '@bryntum/calendar';

const calendarProps: BryntumCalendarProps = {
    date : new Date(2022, 2, 15),

    crudManager : {
        transport : {
            load : {
                url : 'data.json'
            }
        },
        autoLoad : true
    },
    modes : {
        agenda : null,
    }
    
};

export { calendarProps };