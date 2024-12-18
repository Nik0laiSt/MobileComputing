import { Request, Response } from 'express';
import { getTrainingById as getByIdService, getTrainingsForGroup } from '../services/trainingService';
import { getTrainingByTitle as getByTitleService } from '../services/trainingService';
import { createTraining as createTrainingService} from '../services/trainingService';
import { createTrainingSession as createSessionService} from '../services/trainingSessionService';
import { updateTraining as updateService} from '../services/trainingService';
import { deleteTraining as deleteService} from '../services/trainingService';
import { getGroupsForUser } from '../services/groupService';
import { getUserById } from '../services/userService';
import { Training } from '../models/Training';

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

export const getAllTrainingsForUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const trainings: (Training)[] = [];
  const user = await getUserById(id);
  const groups = await getGroupsForUser(user.id)
  if (!groups) {
      res.json(trainings);
      return;
    }

  for (const group of groups) {
    const trainingsForGroup = await getTrainingsForGroup(group.id);
    if (trainingsForGroup !== null) {
      trainings.concat(trainingsForGroup);
    }
  }
  res.json(trainings);
};

export const createTraining = async (req, res) => {
  var success = false;
  const { name, certification, description, maxUsers, minUsers, location, dateOptions } = req.body;

  var training = await createTrainingService(name, description, certification, req.user.id);
  if(training){
    success = true;
    dateOptions.forEach(async ([startDate, endDate]) => {
      console.log(startDate, endDate)
      success = success && await createSessionService(training.id, startDate, endDate, maxUsers, minUsers, location);
    });   
  } 
  res.json(training);
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