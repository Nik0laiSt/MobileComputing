import { Router } from 'express';
import { getTrainingSessionById, updateTrainingSession, deleteTrainingSession, createTrainingSession } from '../controllers/trainingSessionController';
import { deregisterUserForTrainingSession, getAllRegistrationsForTrainingSession, markAsAttended, registerUserForTrainingSession } from '../controllers/sessionRegistrationController';

const router = Router();

router.get('/trainingSessions/:id', getTrainingSessionById);
router.get('/trainingSessions/:id/registrations', getAllRegistrationsForTrainingSession);
router.post('/trainingSessions/:sessionId/register/:userId', registerUserForTrainingSession);
router.post('/trainingSessions/:sessionId/deregister/:userId', deregisterUserForTrainingSession);
router.get('/trainingSessions/:sessionId/attended/:userId', markAsAttended);
router.post('/trainingSessions/create', createTrainingSession);
router.post('/trainingSessions/:id/update', updateTrainingSession);
router.post('/trainingSessions/:id/delete', deleteTrainingSession);

export default router;