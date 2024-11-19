import { Calendar } from '@bryntum/calendar';

const calendar = new Calendar({
    //height   : '100%',
    date     : new Date(2020, 8, 1),
    modes    : {
        day    : null,
        week   : null,
        month  : true,
        year   : null,
        agenda : null
    },
    features : {
        eventMenu : {
            items : {
                // Removes the predefined deleteEvent item
                deleteEvent : null,
                editEvent:null
            }
        
        },
        eventTooltip : false,
        eventEdit:false,
        scheduleTooltip : false,
        scheduleMenu : {
            items : {
                // Knocks out the predefined addEvent item
                addEvent : null,}}
        
    }
    }
)
