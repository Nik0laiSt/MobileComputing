import {Router} from 'express';
import { login, getUser, updateUser, deleteUser, createUser } from '../controllers/userController';
import { getAllRegisteredSessionsForUser } from '../controllers/trainingSessionController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';
import { getAllTrainingsForUser } from '../controllers/trainingController';

const router = Router();
router.get('/:id', authenticateToken, getUser);
router.get('/:id/sessions', authenticateToken, getAllRegisteredSessionsForUser);
router.get('/:id/trainings', authenticateToken, getAllTrainingsForUser);
router.post('/login', login);
router.post('/create', authenticateToken, checkRole('admin'), createUser);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateUser);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteUser);

export default router;
