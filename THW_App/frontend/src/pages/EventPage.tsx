import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import '../App.scss';
import { eventProps } from '../EventConfig';

const EventPage: React.FC = () => {

    const calendar = useRef<BryntumCalendar>(null);
    

    return (
        <div style={styles.pageContainer}>
            <div style={styles.header}>
                <Header />
            </div>
            <main style={styles.mainContent}>
                <BryntumCalendar
                ref = {calendar}
                {...eventProps}
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

