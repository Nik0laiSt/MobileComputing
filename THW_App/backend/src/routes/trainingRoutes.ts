import { Router } from 'express';
import { getTrainingById, getTrainingByTitle, updateTraining, deleteTraining, createTraining } from '../controllers/trainingController';

const router = Router();

router.get('/trainings/:id', getTrainingById);
router.get('/trainings/:title', getTrainingByTitle);
router.post('/trainings/create', createTraining);
router.post('/trainings/:id/update', updateTraining);
router.post('/trainings/:id/delete', deleteTraining);

export default router;