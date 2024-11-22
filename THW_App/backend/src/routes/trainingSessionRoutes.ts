import { Router } from 'express';
import { getTrainingSessionById, updateTrainingSession, deleteTrainingSession, createTrainingSession } from '../controllers/trainingSessionController';
import { deregisterUserForTrainingSession, getAllRegistrationsForTrainingSession, markAsAttended, registerUserForTrainingSession } from '../controllers/sessionRegistrationController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authenticateToken, getTrainingSessionById);
router.get('/:id/registrations', authenticateToken, getAllRegistrationsForTrainingSession);
router.post('/:sessionId/register/:userId', authenticateToken, registerUserForTrainingSession);
router.post('/:sessionId/deregister/:userId', authenticateToken, deregisterUserForTrainingSession);
router.post('/:sessionId/attended/:userId', authenticateToken, checkRole('admin'), markAsAttended);
router.post('/create', authenticateToken, checkRole('admin'), createTrainingSession);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateTrainingSession);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteTrainingSession);

export default router;