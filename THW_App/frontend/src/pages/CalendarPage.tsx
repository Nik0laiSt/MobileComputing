import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarProps } from '../CalendarConfig';
import '../App.scss';
import { EventModel } from '@bryntum/calendar';
import api from '../services/api';

const CalendarPage: React.FC = () => {
    const navigate= useNavigate();
    const calendar = useRef<BryntumCalendar>(null);
    const handleEventClick = async (event: EventModel) => {
        try {
            // API-Aufruf mit Axios, um Event-Daten zu laden
            const response = await api.get(`/users/session/${event.id}`);

            // Optional: Prüfe oder verarbeite die API-Antwort
            if (response.status === 200) {
                const eventData = response.data;
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
            <div style={styles.header}>
                <Header />
            </div>
            <main style={styles.mainContent}>
                <BryntumCalendar
                mode='year'
                ref = {calendar}
                {...calendarProps}
                onEventClick={({ eventRecord }) => handleEventClick(eventRecord)} // API-Aufruf ausführen
                />
            </main>
            <div style={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default CalendarPage;

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        minHeight: '100vh',
        height: '100vh',  // Der Container nimmt die gesamte Höhe des Bildschirms ein
        width: '100%',           // Hier sicherstellen, dass die Breite 100% beträgt
    },
    header: {
    },
    mainContent: {
        flex: 1,
        //display: 'flex',
        //flexDirection: 'column' as const,
        paddingTop: '65px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        width: '100%',           // Auch hier die Breite auf 100% setzen
        height: '80%'
       // boxSizing: 'border-box',  // Für besseren Padding/Border-Handling
    },
    footer: {
    },
};
