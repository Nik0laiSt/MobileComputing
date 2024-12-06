
import { BryntumCalendarProps } from '@bryntum/calendar-react';
import { apiUrl, getAuth } from './services/api';

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
                url: `${apiUrl}/calendar/sessions?sessionState=unreg`,
                method: 'GET',
                headers: {
                    Authorization: getAuth(),
                },
                credentials: 'include',
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
