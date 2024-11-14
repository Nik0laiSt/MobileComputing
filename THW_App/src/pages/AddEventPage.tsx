import React from 'react';
import Header from '../components/AppBar_Search';
import Footer from '../components/NavigationBar';
import AddEvent from '../components/AddEvent';
import { Container, Row, Col } from 'react-bootstrap';

const AddEventPage: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <Header />
      
      <Container fluid className="my-5" style={styles.mainContent}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
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
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    width: '100%',
  },
};
