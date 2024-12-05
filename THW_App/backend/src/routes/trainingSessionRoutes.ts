import { Router } from 'express';
import { 
    getTrainingSessionById, 
    updateTrainingSession, 
    deleteTrainingSession, 
    deregisterUserForTrainingSession,
    markAsAttended, 
    registerUserForTrainingSession,
    getRegisteredSessionUsersById  } from '../controllers/trainingSessionController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authenticateToken, getTrainingSessionById)
router.get('/:id/registrations', authenticateToken, getRegisteredSessionUsersById);
router.post('/:sessionId/register', authenticateToken, registerUserForTrainingSession);
router.post('/:sessionId/register/:userId', authenticateToken, registerUserForTrainingSession);
router.post('/:sessionId/deregister/:userId', authenticateToken, deregisterUserForTrainingSession);
router.post('/:sessionId/attended/:userId', authenticateToken, checkRole('leader'), markAsAttended);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateTrainingSession);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteTrainingSession);

export default router;