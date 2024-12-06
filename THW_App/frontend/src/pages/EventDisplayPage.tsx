import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import { Container, Row, Col } from 'react-bootstrap';
import EventDisplay from '../components/EventDisplay';
import Typography from '@mui/material/Typography';

// EventData Interface mit präzisem Typ
interface EventData {
    name: string;
    resourceId?: string;
    description: string;
    maxUsers: number;
    minUsers: number;
    trainingsID?: string;
    dateOptions: [string, string][]; // Präziser Typ für Start-/Enddatumspaare
}

const EventDisplayPage: React.FC = () => {
    //const [eventInfo, setEventInfo] = React.useState<EventData | null>(null);
/*
    React.useEffect(() => {
        // **Daten aus den Dummy-Daten extrahieren und umwandeln**
        const transformedData: EventData = {
            name: dummyData.name,
            resourceId: dummyData.resourceId,
            description: dummyData.description,
            maxUsers: dummyData.maxUsers,
            minUsers: dummyData.minUsers,
            trainingsID: dummyData.trainingsID,
            dateOptions: dummyData.dateOptions.map((option: string[]): [string, string] => {
                if (option.length !== 2) {
                    throw new Error('Invalid date option format, must be a pair of start and end dates.');
                }
                return [option[0], option[1]];
            }) // Sicherstellen, dass `dateOptions` den exakten Typ hat
        };

        setEventInfo(transformedData); // State mit korrekt formatierten Daten setzen
    }, []);
*/
    return (
        <div style={styles.pageContainer}>
            <Header />

            <Container fluid className="m-0 p-0" style={styles.mainContent}>
              <Row className="justify-content-center" style={{ width: '100%' }}>
                    <Col xs={12} style={{ padding: 0 }}>
                        <EventDisplay/>
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
    backgroundColor: '#f9f9f9',
},
mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to the top
    padding: '20px',
    width: '100%',
},
card: {
    width: '100%', // Make the card occupy the full width of the container
    //maxWidth: '1200px', // Limit the max width for large screens
    padding: '2px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
},
  loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
  },
};

// Media Query with MUI's `sx` for components like `Typography` and `CardContent`
<Typography 
  variant="h5" 
  component="div" 
  gutterBottom 
  sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
>
  Event Details
</Typography>

