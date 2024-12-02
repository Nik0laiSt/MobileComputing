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
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

// **Export des Interfaces**
export interface EventProps {
    name: string;
    resourceId?: string;
    description: string;
    maxUsers: number;
    minUsers: number;
    trainingsID?: string;
    dateOptions: [string, string][]; // Array von [startDate, endDate]-Paaren
}


const EventDisplay: React.FC = () => {

  const { eventId } = useParams();
  const location = useLocation();
  const eventData = location.state; // Das übergebene State-Objekt
  const dateOptions: [string, string] = ['',''];
  
    // Transform dateOptions into a readable format
    const formattedDateOptions = dateOptions.map(([start, end]) => ({
        start,
        end,
        display: `${new Date(start).toLocaleString()} - ${new Date(end).toLocaleString()}`,
    }));

    // Initialize selected date range
    const [selectedRange, setSelectedRange] = useState<string>(
        formattedDateOptions.length > 0 ? formattedDateOptions[0].display : ''
    );

    const handleRegister = async () => {
        if (!selectedRange) {
            alert('Please select a date range!');
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/trainingSessions/:sessionId/register/:userId`,
                {
                    selectedRange,
                }
            );

            alert(`Registered for ${name} on ${selectedRange}`);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed!';
            alert(errorMessage);
        }
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 bg-light">
            <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 1000, margin: 'auto', padding: 2 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Event Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Event Details */}
                        <Row className="mb-3">
                            <Col>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Event Name:
                                </Typography>
                            </Col>
                            <Col>
                                <Typography variant="body1">{eventData.title}</Typography>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Description:
                                </Typography>
                            </Col>
                            <Col>
                                <Typography variant="body1">{eventData.description}</Typography>
                            </Col>
                        </Row>

                        {/* Date Selection for Registration */}
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Select a Date Range to Register
                        </Typography>
                        <Select
                            fullWidth
                            value={selectedRange}
                            onChange={(e) => setSelectedRange(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {formattedDateOptions.map(({ start, end, display }) => (
                                <MenuItem key={`${start}-${end}`} value={display}>
                                    {display}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            disabled={!selectedRange} // Disable if no date is selected
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