import { Calendar } from '@bryntum/calendar';
import { BryntumCalendar } from '@bryntum/calendar-react';

export const calendar = new BryntumCalendar({
    //const calendarRef = useRef<BryntumCalendar>(null);
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
        drag: false,
        eventMenu : false,
       /* {
            items : {
                 Removes the predefined deleteEvent item
                deleteEvent : null,
                editEvent:null
            }
        
        },*/
    
        // Turn the Schedule menu off completely, will not be created
        scheduleMenu : false,
                // Turn the TimeAxis Header menu off completely, will not be created
        //timeAxisHeaderMenu : false,
        eventTooltip : false,
        eventEdit:false,
        scheduleTooltip : false,
        /*scheduleMenu : {
            items : {
                // Knocks out the predefined addEvent item
                addEvent : null,}} */
        
    },
    listeners : {
        beforeEventEdit() {
            // Show custom editor here
            // ...

            // Prevent built-in editor
            return false;
        }
    }
    }
)
