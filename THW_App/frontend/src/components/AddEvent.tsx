import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Container } from 'react-bootstrap';
import { 
    FormControl, 
    InputLabel, 
    Input, 
    TextField, 
    Button, 
    FormHelperText, 
    IconButton 
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const AddEvent: React.FC = () => {
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [description, setDescription] = useState('');
    const [maxUsers, setMaxUsers] = useState<number | ''>('');
    const [minUsers, setMinUsers] = useState<number | ''>('');
    const [dateOptions, setDateOptions] = useState<[string, string][]>([['', '']]);
    const [error, setError] = useState<string | null>(null);

    const handleAddDateRange = () => {
        setDateOptions([...dateOptions, ['', '']]);
    };

    const handleRemoveDateRange = (index: number) => {
        setDateOptions(dateOptions.filter((_, i) => i !== index));
    };

    const handleDateChange = (index: number, field: 'start' | 'end', value: string) => {
        const updatedDateOptions = [...dateOptions];
        if (field === 'start') {
            updatedDateOptions[index][0] = value;
        } else {
            updatedDateOptions[index][1] = value;
        }
        setDateOptions(updatedDateOptions);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/trainings/create', {
                name,
                description,
                group,
                maxUsers,
                minUsers,
                dateOptions,
            }, 
            { 
                headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
              },
            });
            if (response.status === 201) {
                alert('Event created successfully!');
                // Reset form
                setName('');
                setGroup('');
                setDescription('');
                setMaxUsers('');
                setMinUsers('');
                setDateOptions([['', '']]);
                setError(null);
            }
        } catch (error) {
            setError('Error creating event. Please try again.');
        }
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 bg-white m-0">
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

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="group">Group</InputLabel>
                        <Input
                            id="group"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
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

                    <Box sx={{ marginTop: 4, marginBottom: 2 }}>
                        <h5>Date Options</h5>
                        {dateOptions.map(([start, end], index) => (
                            <Box
                                key={index}
                                sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}
                            >
                                <TextField
                                    type="datetime-local"
                                    label="Start Date"
                                    value={start}
                                    onChange={(e) => handleDateChange(index, 'start', e.target.value)}
                                    required
                                    fullWidth
                                    focused
                                />
                                <TextField
                                    type="datetime-local"
                                    label="End Date"
                                    value={end}
                                    onChange={(e) => handleDateChange(index, 'end', e.target.value)}
                                    required
                                    fullWidth
                                    focused
                                />
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleRemoveDateRange(index)}
                                    disabled={dateOptions.length === 1} // Prevent removing the last date range
                                >
                                    <RemoveCircleOutline />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddCircleOutline />}
                            onClick={handleAddDateRange}
                        >
                            Add Date Range
                        </Button>
                    </Box>

                    {error && (
                        <Box sx={{ color: 'red', marginBottom: 2 }}>
                            {error}
                        </Box>
                    )}

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Add Event
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddEvent;
