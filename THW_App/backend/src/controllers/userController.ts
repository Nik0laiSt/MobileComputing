import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    res.json(user);
};
