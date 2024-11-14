import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Container, Row, Col } from 'react-bootstrap';

import { FormControl, InputLabel, Input, TextField, Button, FormHelperText } from '@mui/material';

const AddEvent: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [description, setDescription] = useState('');
    const [maxUsers, setMaxUsers] = useState<number | ''>('');
    const [minUsers, setMinUsers] = useState<number | ''>('');
    const [trainingsID, setTrainingsID] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/events', {
                startDate,
                endDate,
                name,
                resourceId,
                description,
                maxUsers,
                minUsers,
                trainingsID,
            });
            if (response.status === 201) {
                alert('Event created successfully!');
                // Reset form
                setStartDate('');
                setEndDate('');
                setName('');
                setResourceId('');
                setDescription('');
                setMaxUsers('');
                setMinUsers('');
                setTrainingsID('');
                setError(null);
            }
        } catch (error) {
            setError('Error creating event. Please try again.');
        }
    };

    return (
        
        <Container fluid className="d-flex flex-column min-vh-100 bg-white">
        <Box sx={{ flexGrow: 1, width: '100%', margin: 'auto', padding: 2 }}>
        <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="eventName">Event Name</InputLabel>
                    <Input
                        id="eventName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-describedby="eventName-helper-text"
                    />
                    <FormHelperText id="eventName-helper-text">Enter the name of the event</FormHelperText>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="startDate">Start Date</InputLabel>
                    <Input
                        type="datetime-local"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
            
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="endDate">End Date</InputLabel>
                    <Input
                        type="datetime-local"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="resourceId">Resource ID</InputLabel>
                    <Input
                        id="resourceId"
                        value={resourceId}
                        onChange={(e) => setResourceId(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField
                        id="description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="maxUsers">Max Users</InputLabel>
                    <Input
                        type="number"
                        id="maxUsers"
                        value={maxUsers}
                        onChange={(e) => setMaxUsers(Number(e.target.value))}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel htmlFor="minUsers">Min Users</InputLabel>
                    <Input
                        type="number"
                        id="minUsers"
                        value={minUsers}
                        onChange={(e) => setMinUsers(Number(e.target.value))}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="trainingsID">Training ID</InputLabel>
                    <Input
                        id="trainingsID"
                        value={trainingsID}
                        onChange={(e) => setTrainingsID(e.target.value)}
                    />
                </FormControl>

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add Event
                </Button>
            </form>     
        </Box>
        </Container>
        
    );
};

export default AddEvent;
