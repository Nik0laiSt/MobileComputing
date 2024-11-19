import { Router } from 'express';
import { getTrainingById, getTrainingByTitle, updateTraining, deleteTraining, createTraining } from '../controllers/trainingController';

const router = Router();

router.get('/api/trainings/:id', getTrainingById);
router.get('/api/trainings/:title', getTrainingByTitle);
router.post('/api/trainings/create', createTraining);
router.post('/api/trainings/:id/update', updateTraining);
router.post('/api/trainings/:id/delete', deleteTraining);

export default router;