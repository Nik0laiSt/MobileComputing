import { Request, Response } from 'express';
import { getTrainingSessionById as getByIdService } from '../services/trainingSessionService';
import { createTrainingSession as createService} from '../services/trainingSessionService';
import { updateTrainingSession as updateService} from '../services/trainingSessionService';
import { deleteTrainingSession as deleteService} from '../services/trainingSessionService';
import { getAllRegistrationsForUser as getAllRegistrationsForUserService } from '../services/sessionRegistrationService';
import { TrainingSession } from '../models/TrainingSession';

export const getTrainingSessionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        return res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
      }
    res.json(training);
};

export const createTrainingSession = async (req: Request, res: Response) => {
    const { trainingsId, startDate, endDate, location, maxParticipants } = req.body;
    const success = createService(trainingsId, startDate, endDate, location, maxParticipants);
    res.json(success);
};

export const updateTrainingSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const session = await getByIdService(id);
    if (!session) {
        return res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
      }

    const { trainingsId, startDate, endDate, location, maxParticipants } = req.body;
    const success = updateService(session.id, trainingsId, startDate, endDate, location, maxParticipants);
    res.json(success);
};

export const deleteTrainingSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        return res.status(400).json({ message: 'Schulungstermin nicht gefunden' });
      }
    const success = deleteService(training.id);
    res.json(success);
};

export const getAllSessionsForUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const registrations = await getAllRegistrationsForUserService(id);
  if (!registrations) {
      return res.status(400).json({ message: 'Keine Anmeldungen gefunden' });
    }
  const sessions: (TrainingSession)[] = [];
  for (const registration of registrations) {
    const session = await getByIdService(registration.sessionId);
    if (session !== null) {
      sessions.push(session);
    }

  }
  res.json(sessions);
};