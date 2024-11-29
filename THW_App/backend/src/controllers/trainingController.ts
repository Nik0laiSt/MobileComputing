import { Request, Response } from 'express';
import { getTrainingById as getByIdService } from '../services/trainingService';
import { getTrainingByName as getByNameService } from '../services/trainingService';
import { getTrainingByTitle as getByTitleService } from '../services/trainingService';
import { createTraining as createTrainingService} from '../services/trainingService';
import { createTrainingSession as createSessionService} from '../services/trainingSessionService';
import { updateTraining as updateService} from '../services/trainingService';
import { deleteTraining as deleteService} from '../services/trainingService';
import { getGroupByName } from '../services/groupService';

export const getTrainingById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        res.status(400).json({ message: 'Schulung nicht gefunden' });
        return;
      }
    res.json(training);
};

export const getTrainingByTitle = async (req: Request, res: Response) => {
    const title = req.params.title;
    const training = await getByTitleService(title);
    if (!training) {
        res.status(400).json({ message: 'Schulung nicht gefunden' });
        return;
      }
    res.json(training);
};

export const createTraining = async (req: Request, res: Response) => {
    const { name, description, group, maxUsers, minUsers, dateOptions } = req.body;
    const groupId = (await getGroupByName(group)).id;
    console.log(groupId)
    var success = createTrainingService(name, description, groupId);

    if(success){
      var training = await getByNameService(name);
      dateOptions.forEach(([startDate, endDate]) => {
        console.log(startDate, endDate)
        success = createSessionService(training.id, startDate, endDate, maxUsers, minUsers, "location");
      });   
    } 
    res.json(success);
};

export const updateTraining = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        res.status(400).json({ message: 'Schulung nicht gefunden' });
        return;
      }

    const { title, description, groupId } = req.body;
    const success = updateService(training.id, title, description, groupId);
    res.json(success);
};

export const deleteTraining = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const training = await getByIdService(id);
    if (!training) {
        res.status(400).json({ message: 'Schulung nicht gefunden' });
        return;
      }
    const success = deleteService(training.id);
    res.json(success);
};