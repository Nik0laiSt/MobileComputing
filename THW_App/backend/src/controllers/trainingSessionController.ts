import { Request, Response } from 'express';
import { getTrainingSessionById as getByIdService } from '../services/trainingSessionService';
import { updateTrainingSession as updateService} from '../services/trainingSessionService';
import { deleteTrainingSession as deleteService} from '../services/trainingSessionService';
import { getAllRegistrationsForUser as getAllRegistrationsForUserService } from '../services/sessionRegistrationService';
import { getAllSessionsForTraining as getAllSessionsForTrainingService } from '../services/trainingSessionService';
import { TrainingSession } from '../models/TrainingSession';
import { createRegistration} from '../services/sessionRegistrationService';
import { updateRegistration} from '../services/sessionRegistrationService';
import { deleteRegistration} from '../services/sessionRegistrationService';

export const getTrainingSessionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
        return;
      }
    res.json(training);
};

export const updateTrainingSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const session = await getByIdService(id);
    if (!session) {
        res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
        return;
      }

    const { trainingsId, startDate, endDate, location, maxParticipants } = req.body;
    const success = updateService(session.id, trainingsId, startDate, endDate, location, maxParticipants);
    res.json(success);
};

export const deleteTrainingSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
         res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
         return;
      }
    const success = deleteService(training.id);
    res.json(success);
};

export const getAllRegisteredSessionsForUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const sessions: (TrainingSession)[] = [];
  const registrations = await getAllRegistrationsForUserService(id);
  if (!registrations) {
      res.json(sessions);
      return;
    }
  for (const registration of registrations) {
    const session = await getByIdService(registration.sessionId);
    if (session !== null) {
      sessions.push(session);
    }
  }
  res.json(sessions);
};

export const getAllSessionsForTraining = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const trainings = await getAllSessionsForTrainingService(id);
  res.json(trainings);
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