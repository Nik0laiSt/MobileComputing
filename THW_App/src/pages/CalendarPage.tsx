import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { Calendar } from '@bryntum/calendar';
import {calendar} from '../components/Calendar'
import { calendarProps } from '../CalendarConfig';
import '../App.scss';
import { EventModel } from '@bryntum/calendar';
import axios from 'axios';

const CalendarPage: React.FC = () => {
    const navigate= useNavigate();
    const calendar = useRef<BryntumCalendar>(null);
    const handleEventClick = async (event: EventModel) => {
        try {
            // API-Aufruf mit Axios, um Event-Daten zu laden
            const response = await axios.get(`/api/events/${event.id}`);

            // Optional: Prüfe oder verarbeite die API-Antwort
            if (response.status === 200) {
                const eventData = response.data;
                console.log('Event Data:', eventData);

                // Navigiere zur neuen Seite mit der Event-ID
                navigate(`/event/${event.id}`, { state: eventData }); // Event-Daten als state übergeben
            } else {
                console.error('Fehler beim Laden des Events:', response.status);
            }
        } catch (error) {
            console.error('API-Fehler:', error);
        }
    };
    return (
        <div style={styles.pageContainer}>
            <Header />
            <main style={styles.mainContent}>
                <BryntumCalendar
                ref = {calendar}
                {...calendarProps}
                onEventClick={({ eventRecord }) => handleEventClick(eventRecord)} // API-Aufruf ausführen
                />
            </main>
            <Footer />
        </div>
    );
};

export default CalendarPage;

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        minHeight: '100vh',
        width: '100%',           // Hier sicherstellen, dass die Breite 100% beträgt
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        width: '100%',           // Auch hier die Breite auf 100% setzen
        height: '100%'
       // boxSizing: 'border-box',  // Für besseren Padding/Border-Handling
    },
};
