import { Router } from 'express';
import { getTrainingById, getTrainingByTitle, updateTraining, deleteTraining, createTraining } from '../controllers/trainingController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authenticateToken, getTrainingById);
router.get('/:title', authenticateToken, getTrainingByTitle);
router.post('/create', authenticateToken, createTraining);
router.post('/:id/update', authenticateToken, updateTraining);
router.post('/:id/delete', authenticateToken, deleteTraining);

export default router;