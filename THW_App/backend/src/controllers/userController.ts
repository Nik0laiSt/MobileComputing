import { Request, Response } from 'express';
import { authenticateUser, getUserByEmail, getUserById} from '../services/userService';
import { createUser as createService} from '../services/userService';
import { updateUser as updateService} from '../services/userService';
import { deleteUser as deleteService} from '../services/userService';


export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        return res.status(400).json({ message: 'Benutzer nicht gefunden' });
      }
    res.json(user);
};

//getEventsRegistered(userID) -> Returns json   // Wichtig um Events zu bekommen, die im Kalender angezeigt werden sollen

//getEventsAssigned(userID) -> Events that are assigned to the Users Group to show on the Event Overview Page

//
export const createUser = async (req: Request, res: Response) => {
    const { name, prename, email, password } = req.body;
    const success = createService(name, prename, email, password);
    res.json(success);
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        return res.status(400).json({ message: 'Benutzer nicht gefunden' });
      }

    const { name, prename, email, password } = req.body;
    const success = updateService(user.id, name, prename, email, password);
    res.json(success);
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        return res.status(400).json({ message: 'Benutzer nicht gefunden' });
      }
    const success = deleteService(user.id);
    res.json(success);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Benutzer nicht gefunden' });
      }
  
    const success = await authenticateUser(user, password);
    if (!success) {
        return res.status(400).json({ message: 'Falsches Passwort' });
      }

    res.json(success);
};
