import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/calendar'); // Erfolgreiches Login leitet zur Kalender-Seite weiter
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 bg-white">
            <Row className="flex-grow-1 d-flex align-items-center justify-content-center">
                <Col xs={10} sm={8} md={8} lg={8} xl={8} className="text-center p-4 bg-white rounded shadow">
                    <img 
                        src="logo.svg"  // Adjust path to your logo
                        alt="App Logo"
                        className="mb-4"
                        style={{ height: 100 }}
                    />
                    <h2 className="mb-4">Login to THW App</h2>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
