import { Router } from 'express';
import { login, getUser, updateUser, deleteUser, createUser } from '../controllers/userController';

const router = Router();

router.get('/users/:id', getUser);
router.get('/users/:id/registrations', getUser);
router.post('/users/login', login);
router.post('/users/create', createUser);
router.post('/users/:id/update', updateUser);
router.post('/users/:id/delete', deleteUser);

export default router;
