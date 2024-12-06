import React, { useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { useNavigate } from 'react-router-dom';
import { EventModel } from '@bryntum/calendar';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { calendarProps } from '../CalendarConfig';
import api from '../services/api';
import '../App.scss';

const CalendarPage: React.FC = () => {
    const navigate = useNavigate();
    const calendar = useRef<BryntumCalendar>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adjustPadding = () => {
            const header = document.querySelector('header');
            if (header && mainContentRef.current) {
                const headerHeight = header.offsetHeight;
                mainContentRef.current.style.paddingTop = `${headerHeight}px`;
            }
        };

        adjustPadding();
        window.addEventListener('resize', adjustPadding);

        return () => {
            window.removeEventListener('resize', adjustPadding);
        };
    }, []);

    const handleEventClick = async (event: EventModel) => {
        try {
            const response = await api.get(`/users/session/${event.id}`);
            if (response.status === 200) {
                const eventData = response.data;
                navigate(`/event/${event.id}`, { state: eventData });
            } else {
                console.error('Fehler beim Laden des Events:', response.status);
            }
        } catch (error) {
            console.error('API-Fehler:', error);
        }
    };

    return (
        <div className="calendar-page">
            <Header />
            <main className="main-content">
                <BryntumCalendar
                    mode='year'
                    ref={calendar}
                    {...calendarProps}
                    onEventClick={({ eventRecord }) => handleEventClick(eventRecord)}
                />
            </main>
            <Footer />
        </div>
    );
};

export default CalendarPage;
