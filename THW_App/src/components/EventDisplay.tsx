import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

interface EventProps {
    startDate: string;
    endDate: string;
    name: string;
    resourceId?: string;
    description: string;
    maxUsers: number;
    minUsers: number;
    trainingsID?: string;
    dateOptions: string[];  // Array of available event dates for selection
}

const EventDisplay: React.FC<EventProps> = ({
    startDate,
    endDate,
    name,
    resourceId,
    description,
    maxUsers,
    minUsers,
    trainingsID,
    dateOptions,
}) => {
    const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0] || '');

    const handleRegister = () => {
        // Here, you would typically send the selected date to the backend or handle the registration logic
        alert(`Registered for ${name} on ${selectedDate}`);
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 bg-light">
            <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Event Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Event Name:</Typography></Col>
                            <Col><Typography variant="body1">{name}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Start Date:</Typography></Col>
                            <Col><Typography variant="body1">{new Date(startDate).toLocaleString()}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">End Date:</Typography></Col>
                            <Col><Typography variant="body1">{new Date(endDate).toLocaleString()}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Resource ID:</Typography></Col>
                            <Col><Typography variant="body1">{resourceId || 'N/A'}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Description:</Typography></Col>
                            <Col><Typography variant="body1">{description}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Max Users:</Typography></Col>
                            <Col><Typography variant="body1">{maxUsers}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Min Users:</Typography></Col>
                            <Col><Typography variant="body1">{minUsers}</Typography></Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><Typography variant="subtitle1" color="textSecondary">Training ID:</Typography></Col>
                            <Col><Typography variant="body1">{trainingsID || 'N/A'}</Typography></Col>
                        </Row>

                        <Divider sx={{ mt: 2, mb: 2 }} />

                        {/* Date Selection for Registration */}
                        <Typography variant="h6" gutterBottom>
                            Select a Date to Register
                        </Typography>
                        <Select
                            fullWidth
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {dateOptions.map((date, index) => (
                                <MenuItem key={index} value={date}>
                                    {new Date(date).toLocaleString()}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            disabled={!selectedDate}  // Disable if no date is selected
                        >
                            Register
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default EventDisplay;
