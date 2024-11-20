
import { BryntumCalendarProps } from '@bryntum/calendar-react';

const eventProps: BryntumCalendarProps = {
    date : new Date(2022, 2, 15),
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
