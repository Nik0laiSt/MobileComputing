
import { BryntumCalendarProps } from '@bryntum/calendar-react';

const eventProps: BryntumCalendarProps = {
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
        year : null,
        month: null, 
        day: null,
        week:null
    }
    
};

export { eventProps };
