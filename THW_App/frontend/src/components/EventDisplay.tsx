import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Grid, Grid2 } from '@mui/material';


export interface Session {
    attended: number
    certification_description: string
    certification_id: number
    certification_title: string
    group_id: number
    group_name: string
    registration_date: Date
    registration_id: number
    session_end: Date
    session_id: number
    session_location: string
    session_max_participants: number
    session_min_participants: number
    session_start: Date
    training_description: string
    training_id: number
    training_title: string
    user_id: number
}

export interface SessionRegistrations {
    id: number;
    sessionId: number;
    userId: number;
    userName: string;
    userPrename: string;
    registrationDate: Date;
    attended: boolean;
}

const EventDisplay: React.FC = () => {
    const navigate = useNavigate();
    const [reloadKey, setReloadKey] = useState(0);
    
    const location = useLocation();
    const session: Session = location.state;

    const [userRole, setUserRole] = useState('');
    const [sessionRegistrations, setSessionRegistrations] = useState<SessionRegistrations[]>();

    useEffect(() => {
        api.get(`/users`)
        .then(response => {
            setUserRole(response.data.role);
        })
        .catch(error => {
            setUserRole('');
        });
        api.get(`/trainingSessions/${session.session_id}/registrations`)
        .then(response => {
            setSessionRegistrations(response.data);
        })
        .catch(error => {
            setSessionRegistrations([]);
        });
    }, [reloadKey]);

    const handleRegister = () => {
        api.post(`/trainingSessions/${session.session_id}/register`)
        .then(response => {
          navigate(-1);
        });
    };

    const handleToggleCheck = (userId: number) => {
        api.post(`/trainingSessions/${session.session_id}/attended/${userId}`)
        .then(response => {
          console.log(response.data);
          setReloadKey((prevKey) => prevKey + 1);
        });
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 bg-light">
            <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 1000, margin: 'auto', padding: 2 }}>

            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div">{session.training_title}</Typography>
                    <Typography variant="body1" color="text.secondary">{session.training_description}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Certification</Typography>
                    <Typography variant="body1">{session.certification_title}</Typography>
                    <Typography variant="body2" color="text.secondary">{session.certification_description}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Group</Typography>
                    <Typography variant="body1">{session.group_name}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Training Time</Typography>
                    <Typography variant="body1">From: {session.session_start.toLocaleString()}</Typography>
                    <Typography variant="body1">To: {session.session_end.toLocaleString()}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Location</Typography>
                    <Typography variant="body1">{session.session_location}</Typography>
                    {userRole === '' && session.registration_date && (<>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Registration Date</Typography>
                    <Typography variant="body1">{session.registration_date.toLocaleString()}</Typography>
                    </>)}
                </CardContent>
            </Card>

            {userRole === 'leader' || userRole === 'admin' ? (
                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Registered Users</Typography>
                        <Grid2 container spacing={2}>
                            {sessionRegistrations && sessionRegistrations.map((registration) => (
                                <Grid item xs={12} sm={6} md={4} key={registration.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="body1">{registration.userPrename} {registration.userName}</Typography>
                                            {registration.registrationDate && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Registered at: {registration.registrationDate.toLocaleString()}
                                                </Typography>
                                            )}
                                            {userRole === 'leader' && (
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleToggleCheck(registration.userId)}
                                                    color={registration.attended ? "success" : "error"}
                                                >
                                                    {registration.attended ? 'Checked' : 'Check'}
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid2>
                    </CardContent>
                </Card>
            ) : null}

            {userRole === '' && !session.registration_id && (
                <Button variant="contained" onClick={() => handleRegister()}>
                    Register for this Training Session
                </Button>
            )}

            </Box>
        </Container>
    );
    
};

export default EventDisplay;