import { FunctionComponent, useRef } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import { useMediaQuery } from 'react-responsive'


const App: FunctionComponent = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


    return (
      <Router>
        <Routes>
          {/* Root-Route leitet auf die Login-Seite */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Login-Seite als Standardseite */}
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/calendar" element={<CalendarPage/>}/>
          <Route path="/events" element={<EventPage/>}/>
        </Routes>
      </Router>
    );
};

export default App;
