import { Router } from 'express';
import { getTrainingById, getTrainingByTitle, updateTraining, deleteTraining, createTraining } from '../controllers/trainingController';

const router = Router();

router.get('/:id', getTrainingById);
router.get('/:title', getTrainingByTitle);
router.post('/create', createTraining);
router.post('/:id/update', updateTraining);
router.post('/:id/delete', deleteTraining);

export default router;