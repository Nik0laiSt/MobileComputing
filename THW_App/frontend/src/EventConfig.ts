
import { BryntumCalendarProps } from '@bryntum/calendar-react';

const eventProps: BryntumCalendarProps = {
    date : new Date(),
    dragFeature: false, // Drag-and-Drop deaktivieren
    eventEditFeature: false,
    eventCopyPasteFeature: false,
    enableDeleteKey: false,
    eventMenuFeature: false,
    scheduleMenuFeature: false, // Deaktiviert das Kontextmenü für leere Bereiche
    eventTooltipFeature: false, // Deaktiviert die Eventübersicht beim Klick
    crudManager : {
        transport : {
            load : {
                url: `http://localhost:5000/api/calendar/sessions`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
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
