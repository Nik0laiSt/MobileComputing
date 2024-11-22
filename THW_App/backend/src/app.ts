import express from 'express';
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/trainingSessionRoutes';
import trainingRoutes from './routes/trainingRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/trainingSessions', sessionRoutes);
app.use('/api/trainings', trainingRoutes);

export default app;
