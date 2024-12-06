import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from 'react-bootstrap';
import { 
    FormControl, 
    InputLabel, 
    Input, 
    TextField, 
    Button, 
    FormHelperText, 
    IconButton, 
    Select,
    MenuItem,
    CircularProgress,
    SelectChangeEvent
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import api from '../services/api';


interface Group {
    id: number;
    name: string;
  }
  
interface Certification {
    id: number;
    title: string;
}


const AddEvent: React.FC = () => {
    const [name, setName] = useState('');
    const [group, setGroup] = useState<number | ''>('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [certification, setCertification] = useState<number | ''>('');
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingCertifications, setLoadingCertifications] = useState(false);
    const [description, setDescription] = useState('');
    const [maxUsers, setMaxUsers] = useState<number | ''>('');
    const [minUsers, setMinUsers] = useState<number | ''>('');
    const [location, setLocation] = useState('');
    const [dateOptions, setDateOptions] = useState<[string, string][]>([['', '']]);
    const [error, setError] = useState<string | null>(null);


    // Laden der Gruppen beim Initialisieren der Komponente
    useEffect(() => {
        api.get('/users/groups')
        .then(response => {
            setGroups(response.data);
            setLoadingGroups(false);
        })
        .catch(error => {
            setError('Fehler beim Laden der Gruppen');
            setLoadingGroups(false);
        });
    }, []);

    // Laden der Zertifikate, wenn eine Gruppe ausgewählt wird
    useEffect(() => {
        if (group) {
        setLoadingCertifications(true);
        api.get(`/users/certifications?group=${group}`)
            .then(response => {
            setCertifications(response.data);
            setLoadingCertifications(false);
            setCertification(''); // Zertifikat zurücksetzen
            })
            .catch(error => {
            setError('Fehler beim Laden der Zertifikate');
            setLoadingCertifications(false);
            });
        }
    }, [group]);


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
            const response = await api.post('/trainings/create', {
                name,
                description,
                certification,
                maxUsers,
                minUsers,
                location,
                dateOptions,
            });
            console.log(response.status);
            if (response.status === 200) {
                alert('Event created successfully!');
                // Reset form
                setName('');
                setGroup('');
                setCertification('');
                setDescription('');
                setMaxUsers('');
                setMinUsers('');
                setLocation('');
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

                    <FormControl fullWidth margin="normal" error={!!error}>
                        <InputLabel id="group-label">Group</InputLabel>
                        <Select
                            labelId="group-label"
                            value={group}
                            onChange={(e) => setGroup(e.target.value as number)}
                            displayEmpty
                            fullWidth
                        >
                            {loadingGroups ? (
                            <MenuItem disabled>
                                <CircularProgress size={24} />
                            </MenuItem>
                            ) : (
                            groups.map(group => (
                                <MenuItem key={group.id} value={group.id}>
                                {group.name}
                                </MenuItem>
                            ))
                            )}
                        </Select>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>                    

                    <FormControl fullWidth margin="normal" disabled={!group} error={!!error}>
                        <InputLabel id="certification-label">Certification</InputLabel>
                        <Select
                            labelId="certification-label"
                            value={certification}
                            onChange={(e) => setCertification(e.target.value as number)}
                            displayEmpty
                            fullWidth
                        >
                            {loadingCertifications ? (
                            <MenuItem disabled>
                                <CircularProgress size={24} />
                            </MenuItem>
                            ) : (
                            certifications.map(cert => (
                                <MenuItem key={cert.id} value={cert.id}>
                                {cert.title}
                                </MenuItem>
                            ))
                            )}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input
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

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel htmlFor="location">Location</InputLabel>
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            aria-describedby="location-helper-text"
                        />
                        <FormHelperText id="location-helper-text">Enter the location, where the event will take place</FormHelperText>
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
