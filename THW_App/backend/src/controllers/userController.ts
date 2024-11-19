import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    res.json(user);
};

//getEventsRegistered(userID) -> Returns json   // Wichtig um Events zu bekommen, die im Kalender angezeigt werden sollen

//getEventsAssigned(userID) -> Events that are assigned to the Users Group to show on the Event Overview Page

//
