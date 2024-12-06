import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import AddEvent from '../components/AddEvent';
import { Container, Row, Col } from 'react-bootstrap';

const AddEventPage: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <Header />
      <main className="main-content">
      <Container fluid className="m-0" style={styles.mainContent}>
        <Row className="justify-content-center">
          <Col>
            <AddEvent />
          </Col>
        </Row>
      </Container>
      </main>
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
    paddingTop: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to the top
    padding: '20px',
    width: '100%',
    height: '80%'
}
};
