import {Router} from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getCalendarForUser, getCalendarSessionsForUser } from '../controllers/calendarController';

const router = Router();
router.get('/sessions', authenticateToken, getCalendarSessionsForUser);
router.get('/sessionRegistrations', authenticateToken, getCalendarForUser);

export default router;