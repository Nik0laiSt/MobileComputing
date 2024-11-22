import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import AddEvent from '../components/AddEvent';
import { Container, Row, Col } from 'react-bootstrap';

const AddEventPage: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <Header />
      
      <Container fluid className="m-0" style={styles.mainContent}>
        <Row className="justify-content-center">
          <Col>
            <AddEvent />
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default AddEventPage;

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
}
};
