import {Router} from 'express';
import { login, getUser, updateUser, deleteUser, createUser } from '../controllers/userController';
import { getAllRegistrationsForUser } from '../controllers/sessionRegistrationController';
import { getAllSessionsForUser } from '../controllers/trainingSessionController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';

const router = Router();
router.get('/:id', authenticateToken, getUser);
router.get('/:id/registrations', authenticateToken, getAllRegistrationsForUser);
router.get('/:id/sessions', authenticateToken, getAllSessionsForUser);
router.post('/login', login);
router.post('/create', authenticateToken, checkRole('admin'), createUser);
router.post('/:id/update', authenticateToken, checkRole('admin'), updateUser);
router.post('/:id/delete', authenticateToken, checkRole('admin'), deleteUser);

export default router;
