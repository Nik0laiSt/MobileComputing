import express from 'express';
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/trainingSessionRoutes';
import trainingRoutes from './routes/trainingRoutes';
import calendarRoutes from './routes/calendarRoutes';

const app = express();
app.use(express.json());

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:5173','http://172.17.0.5:5173','http://162.55.214.84:5173'], // Erlaube nur das Frontend auf localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Erlaube diese HTTP-Methoden
    credentials: true, // Erlaube das Senden von Cookies oder Tokens
    allowedHeaders: ['Content-Type', 'Authorization'], // Erlaube diese Header
  };

// CORS für alle Routen aktivieren
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/trainingSessions', sessionRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/calendar', calendarRoutes);

export default app;
