import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import AddEvent from '../components/AddEvent';
import { Container, Row, Col } from 'react-bootstrap';
import EventDisplay from '../components/EventDisplay';
import dummyData from '../../public/dummyData.json';  // JSON-Daten
import { JsonOptions } from 'vite';

interface EventData {
    startDate: string;
    endDate: string;
    name: string;
    resourceId?: string;
    description: string;
    maxUsers: number;
    minUsers: number;
    trainingsID?: string;
    dateOptions: string[];
}

const EventDisplayPage: React.FC = () => {
    const [eventInfo, setEventInfo] = React.useState<EventData | null>(null);

    React.useEffect(() => {
        // Funktion, um eventuelle Standardwerte festzulegen
        const defaultData: EventData = {
            startDate: dummyData.startDate || '',
            endDate: dummyData.endDate || '',
            name: dummyData.name || 'Unnamed Event',
            resourceId: dummyData.resourceId || 'No Resource ID',
            description: dummyData.description || 'No description provided.',
            maxUsers: dummyData.maxUsers || 10,
            minUsers: dummyData.minUsers || 1,
            trainingsID: dummyData.trainingsID || 'No Training ID',
            dateOptions: dummyData.dateOptions || ['No date options available']
        };
        
        setEventInfo(defaultData);  // Daten mit Standardwerten in den Zustand setzen
    }, []);  // Hier wird sichergestellt, dass `useEffect` keine Rückgabe hat
    React.useEffect(() => {
        // JSON-Daten aus der Datei laden
        setEventInfo(dummyData as EventData);
    }, []);
  return (
    <div style={styles.pageContainer}>
      <Header />
      
      <Container fluid className="my-5" style={styles.mainContent}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
           {eventInfo ? <EventDisplay {...eventInfo} /> : <p>Loading event data...</p> }
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default EventDisplayPage;

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    width: '100%',
  },
};
