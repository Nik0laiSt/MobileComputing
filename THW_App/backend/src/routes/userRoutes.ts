import {Router} from 'express';
import { login, getUser, updateUser, deleteUser, createUser, getAllGroupsForUser, getAllCertificationsForUser, getSessionForUser } from '../controllers/userController';
import { getAllRegisteredSessionsForUser } from '../controllers/trainingSessionController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';
import { getAllTrainingsForUser } from '../controllers/trainingController';
import { getAllCertificatesForUser } from '../controllers/certificateController';

const router = Router();
router.get('', authenticateToken, getUser);
router.get('/groups', authenticateToken, getAllGroupsForUser);
router.get('/certifications', authenticateToken, getAllCertificationsForUser);
router.get('/certificates', authenticateToken, getAllCertificatesForUser);
router.get('/session/:id', authenticateToken, getSessionForUser);
router.get('/:id', authenticateToken, getUser);
router.get('/:id/sessions', authenticateToken, getAllRegisteredSessionsForUser);
router.get('/:id/trainings', authenticateToken, getAllTrainingsForUser);
router.post('/login', login);
router.post('/create', authenticateToken, checkRole('admin'), createUser);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateUser);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteUser);

export default router;
