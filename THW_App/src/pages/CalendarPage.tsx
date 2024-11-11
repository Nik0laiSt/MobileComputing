import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { Calendar } from '@bryntum/calendar';

import { calendarProps } from '../CalendarConfig';
import '../App.scss';

const CalendarPage: React.FC = () => {

    const calendar = useRef<BryntumCalendar>(null);
    

    return (
        <div style={styles.pageContainer}>
            <Header />
            <main style={styles.mainContent}>
                <BryntumCalendar
                ref = {calendar}
                {...calendarProps}
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
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
};
