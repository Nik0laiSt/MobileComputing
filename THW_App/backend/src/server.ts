import app from './app';
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/trainingSessionRoutes';
import trainingRoutes from './routes/trainingRoutes';

const cors = require('cors');
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173', // Erlaube nur das Frontend auf localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Erlaube diese HTTP-Methoden
    allowedHeaders: ['Content-Type', 'Authorization'], // Erlaube diese Header
  };

// CORS für alle Routen aktivieren
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/trainingSessions', sessionRoutes);
app.use('/api/trainings', trainingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
