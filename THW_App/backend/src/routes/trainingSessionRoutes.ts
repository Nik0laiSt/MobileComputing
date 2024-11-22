import { Router } from 'express';
import { getTrainingSessionById, updateTrainingSession, deleteTrainingSession, createTrainingSession } from '../controllers/trainingSessionController';
import { deregisterUserForTrainingSession, getAllRegistrationsForTrainingSession, markAsAttended, registerUserForTrainingSession } from '../controllers/sessionRegistrationController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authenticateToken, getTrainingSessionById);
router.get('/:id/registrations', authenticateToken, getAllRegistrationsForTrainingSession);
router.post('/:sessionId/register/:userId', authenticateToken, registerUserForTrainingSession);
router.post('/:sessionId/deregister/:userId', authenticateToken, deregisterUserForTrainingSession);
router.get('/:sessionId/attended/:userId', authenticateToken, markAsAttended);
router.post('/create', authenticateToken, createTrainingSession);
router.post('/:id/update', authenticateToken, updateTrainingSession);
router.post('/:id/delete', authenticateToken, deleteTrainingSession);

export default router;