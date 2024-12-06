import { Request, Response } from 'express';
import { getTrainingsForCertification } from '../services/trainingService';
import { createCertificate as createCertificateService} from '../services/certificateService';
import { getAllAttendedRegistrationsForUser } from '../services/sessionRegistrationService';
import { getTrainingSessionById } from '../services/trainingSessionService';
import { getAllCertificatesForUser as getAllCertificatesForUserService } from '../services/certificateService';

export const getAllCertificatesForUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const certificates = await getAllCertificatesForUserService(id);
    res.json(certificates);
  };

export const createCertificate = async (certificationId: number, userId: number) => {
    const allTrainingsForCertification = await getTrainingsForCertification(certificationId);
    const attendedRegistrations = await getAllAttendedRegistrationsForUser(userId);
    var attendedTrainings = [];
    for (const registration of attendedRegistrations) {
        var attendedSession = await getTrainingSessionById(registration.session_id);
        attendedTrainings.push(attendedSession.training_id); 
    }

    for (const training of allTrainingsForCertification) {
        if(attendedTrainings.find(x => x.sessionId == training.id) == false){
            return; // not all trainings attended for certification
        }
    }

    createCertificateService(userId, certificationId);
};