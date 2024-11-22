import { Request, Response, NextFunction } from 'express';
import { authenticateUser, getUserByEmail, getUserById} from '../services/userService';
import { createUser as createService} from '../services/userService';
import { updateUser as updateService} from '../services/userService';
import { deleteUser as deleteService} from '../services/userService';
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        res.status(400).json({ message: 'Benutzer nicht gefunden' });
        return;
      }
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const { name, prename, email, password } = req.body;
    const success = createService(name, prename, email, password);
    res.json(success);
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        res.status(400).json({ message: 'Benutzer nicht gefunden' });
        return;
      }

    const { name, prename, email, password } = req.body;
    const success = updateService(user.id, name, prename, email, password);
    res.json(success);
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    if (!user) {
        res.status(400).json({ message: 'Benutzer nicht gefunden' });
        return;
      }
    const success = deleteService(user.id);
    res.json(success);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(400).json({ message: 'Benutzer nicht gefunden' });
  } else {
    const success = await authenticateUser(user, password);
    if (!success) {
      res.status(404).json({ message: 'Falsches Passwort' });
    } else {
      const token = generateJwtToken(user); // Generate a JWT token for the user
      res.status(200).json({ token });
    }
  }
};

const generateJwtToken = (user: any) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
