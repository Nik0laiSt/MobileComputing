import { Request, Response } from 'express';
import { getRegistrationById as getByIdService } from '../services/sessionRegistrationService';
import { getAllRegistrationsForTrainingSession as getAllForSessionService } from '../services/sessionRegistrationService';
import { getAllRegistrationsForUser as getAllForUserService } from '../services/sessionRegistrationService';
import { createRegistration} from '../services/sessionRegistrationService';
import { updateRegistration} from '../services/sessionRegistrationService';
import { deleteRegistration} from '../services/sessionRegistrationService';

export const getRegistrationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        res.status(400).json({ message: 'Schulung nicht gefunden' });
        return;
      }
    res.json(training);
};

export const getAllRegistrationsForTrainingSession = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const registrations = await getAllForSessionService(id);
  if (!registrations) {
      res.status(400).json({ message: 'Keine Anmeldungen gefunden' });
      return;
    }
  res.json(registrations);
};

export const getAllRegistrationsForUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const registrations = await getAllForUserService(id);
  if (!registrations) {
      res.status(400).json({ message: 'Keine Anmeldungen gefunden' });
      return;
    }
  res.json(registrations);
};

export const registerUserForTrainingSession = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    const sessionId = parseInt(req.params.sessionId, 10);
    const success = createRegistration(sessionId, userId);
    res.json(success);
};

export const deregisterUserForTrainingSession = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const sessionId = parseInt(req.params.sessionId, 10);
  const success = deleteRegistration(sessionId, userId);
  res.json(success);
};

export const markAsAttended = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    const sessionId = parseInt(req.params.sessionId, 10);
    const success = updateRegistration(sessionId, userId, true);
    res.json(success);
};