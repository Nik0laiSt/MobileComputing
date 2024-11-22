import {Router} from 'express';
import express from 'express';
import { login, getUser, updateUser, deleteUser, createUser } from '../controllers/userController';
import { getAllRegistrationsForUser } from '../controllers/sessionRegistrationController';
import { getAllSessionsForUser } from '../controllers/trainingSessionController';

const router = Router();
router.get('/:id', getUser);
router.get('/:id/registrations', getAllRegistrationsForUser);
router.get('/:id/sessions', getAllSessionsForUser);
router.post('/login', login);
router.post('/create', createUser);
router.post('/:id/update', updateUser);
router.post('/:id/delete', deleteUser);

export default router;
