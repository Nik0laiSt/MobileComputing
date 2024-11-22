import { Router } from 'express';
import { getTrainingSessionById, updateTrainingSession, deleteTrainingSession, createTrainingSession } from '../controllers/trainingSessionController';
import { deregisterUserForTrainingSession, getAllRegistrationsForTrainingSession, markAsAttended, registerUserForTrainingSession } from '../controllers/sessionRegistrationController';

const router = Router();

router.get('/:id', getTrainingSessionById);
router.get('/:id/registrations', getAllRegistrationsForTrainingSession);
router.post('/:sessionId/register/:userId', registerUserForTrainingSession);
router.post('/:sessionId/deregister/:userId', deregisterUserForTrainingSession);
router.get('/:sessionId/attended/:userId', markAsAttended);
router.post('/create', createTrainingSession);
router.post('/:id/update', updateTrainingSession);
router.post('/:id/delete', deleteTrainingSession);

export default router;