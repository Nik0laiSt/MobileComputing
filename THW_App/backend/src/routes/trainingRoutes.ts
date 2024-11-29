import { Router } from 'express';
import { getTrainingById, getTrainingByTitle, updateTraining, deleteTraining, createTraining } from '../controllers/trainingController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';
import { getAllSessionsForTraining } from '../controllers/trainingSessionController';

const router = Router();

router.get('/:id', authenticateToken, getTrainingById);
router.get('/:title', authenticateToken, getTrainingByTitle);
router.get('/:id/sessions', authenticateToken, getAllSessionsForTraining);
router.post('/create', authenticateToken, checkRole('admin'), createTraining);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateTraining);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteTraining);

export default router;