import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarProps } from '../CalendarConfig';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/dashboard'); // Redirect to dashboard or another page upon successful login
    };

    return (
        <div style={styles.pageContainer}>
            <main style={styles.mainContent}>
                <img 
                src="../../public/logo.svg"  // Adjust the filename to match your actual logo's filename in the public folder
                alt="App Logo"
                style={{
                height: 40,  // Adjust the height as necessary
                marginRight: 'auto',  // Aligns the search bar to the right
                }}
                />
                <h2>Login to THW App</h2>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </main>
        </div>
    );
};

export default LoginPage;

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
