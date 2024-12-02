import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import '../App.scss';
import { eventProps } from '../EventConfig';
import api from '../services/api';
import { EventModel } from '@bryntum/calendar';

const EventPage: React.FC = () => {
    const navigate= useNavigate();
    const calendar = useRef<BryntumCalendar>(null);

    const handleEventClick = async (event: EventModel) => {
        try {
            const response = await api.get(`/trainingSessions/${event.id}`);
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
                ref = {calendar}
                {...eventProps}
                onEventClick={({ eventRecord }) => handleEventClick(eventRecord)} // API-Aufruf ausführen
                />
            </main>
            <div style={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default EventPage;

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        width: '100%',           // Auch hier die Breite auf 100% setzen
        height: '100%'
       // boxSizing: 'border-box',  // Für besseren Padding/Border-Handling
    },
    footer: {
    },
};

