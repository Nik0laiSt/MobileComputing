import { Request, Response } from 'express';
import { getTrainingById as getByIdService } from '../services/trainingService';
import { getTrainingByTitle as getByTitleService } from '../services/trainingService';
import { createTraining as createService} from '../services/trainingService';
import { updateTraining as updateService} from '../services/trainingService';
import { deleteTraining as deleteService} from '../services/trainingService';

export const getTrainingById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        return res.status(400).json({ message: 'Schulung nicht gefunden' });
      }
    res.json(training);
};

export const getTrainingByTitle = async (req: Request, res: Response) => {
    const title = req.params.title;
    const training = await getByTitleService(title);
    if (!training) {
        return res.status(400).json({ message: 'Schulung nicht gefunden' });
      }
    res.json(training);
};

export const createTraining = async (req: Request, res: Response) => {
    const { title, description, groupId } = req.body;
    const success = createService(title, description, groupId);
    res.json(success);
};

export const updateTraining = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        return res.status(400).json({ message: 'Schulung nicht gefunden' });
      }

    const { title, description, groupId } = req.body;
    const success = updateService(training.id, title, description, groupId);
    res.json(success);
};

export const deleteTraining = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        return res.status(400).json({ message: 'Schulung nicht gefunden' });
      }
    const success = deleteService(training.id);
    res.json(success);
};