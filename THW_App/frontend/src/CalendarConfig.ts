
import { BryntumCalendarProps } from '@bryntum/calendar-react';
import { Calendar } from '@bryntum/calendar';
import { EventModel } from '@bryntum/calendar'; // Importiere EventModel, um den Typ zu definieren


export const calendarProps: BryntumCalendarProps = {
    date : new Date(),
    dragFeature: false, // Drag-and-Drop deaktivieren
    eventEditFeature: false,
    eventCopyPasteFeature: false,
    enableDeleteKey: false,
    eventMenuFeature: false,
    scheduleMenuFeature: false, // Deaktiviert das Kontextmenü für leere Bereiche
    eventTooltipFeature: false, // Deaktiviert die Eventübersicht beim Klick


    /*{
        eventTooltipFeature: {
            template: ({ eventRecord }: { eventRecord: EventModel }) => `
                <div class="custom-tooltip">
                    <h4>${eventRecord.name}</h4>
                    <button class="tooltip-action" data-event-id="${eventRecord.id}">
                        View Details
                    </button>
                </div>
            `,
        },
        listeners: {
            // Beispiel-Listener für Tooltip-Buttons
            onTooltipButtonClick: ({ target }) => {
                if (target.classList.contains('tooltip-action')) {
                    const eventId = target.getAttribute('data-event-id');
                    console.log('View Details clicked for Event ID:', eventId);
                }
            },
        },
    },/*
    /* {
        items: {
            deleteEvent: false, // Entferne die Löschoption aus dem Menü
            duplicateEvent: false, // Entfernt die Duplicate-Option aus dem Menü
        },
    },*/
    crudManager : {
        transport : {
            load : {
                url: `http://localhost:5000/api/calendar/sessions?sessionState=reg`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            }
        },
        autoLoad : true
    },
    modes : {
        agenda : null,
    }
    
};
