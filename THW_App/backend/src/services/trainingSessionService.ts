import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Registration } from '../models/SessionRegistration';
import { TrainingSession } from '../models/TrainingSession';

export const getTrainingSessionById = async (id: number): Promise<TrainingSession | null> => {
    const [rows] = await db.query('SELECT * FROM training_sessions WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as TrainingSession; 
    }
    return null;
};

export const getRegisteredSessionUsersById = async (id: number): Promise<Registration[] | null> => {
    const [rows] = await db.query('SELECT sr.id, session_id as sessionId, u.id as userId, u.name as userName, u.prename as userPrename, registration_date as registrationDate, attended FROM session_registrations as sr join users as u on user_id = u.id WHERE session_id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Registration[]; 
    }
    return [];
};

export const getAllSessionsForTraining = async (id: number): Promise<TrainingSession[] | null> => {
    const [rows] = await db.query('SELECT * FROM training_sessions WHERE training_id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as TrainingSession[]; 
    }
    return null;
};

export const createTrainingSession = async (trainingId: number, startDate: Date, endDate: Date, maxParticipants: number, minParticipants: number, location: string): Promise<boolean> => {
    const query = `
        INSERT INTO training_sessions (training_id, start_datetime, end_datetime, max_participants, min_participants, location) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;   
    
    const [result] = await db.execute(query, [trainingId, startDate, endDate, maxParticipants, minParticipants, location]);
    return (result as any).affectedRows > 0; 
};

export const deleteTrainingSession = async (id: number): Promise<boolean> => {
    const query = `
        DELETE FROM training_sessions
        WHERE id = ?;
    `;

    const [result] = await db.execute(query, [id]);
    return (result as any).affectedRows > 0;  
};

export const updateTrainingSession = async (id: number, trainingId: number, startDate: Date, endDate: Date, location:string, maxParticipants: number): Promise<boolean> => {
    const query = `
        UPDATE training_sessions
        SET training_id = ?, start_datetime = ?, end_datetime = ?, location = ?, max_participants = ?
        WHERE id = ?;
    `;

    const [result] = await db.execute(query, [trainingId, startDate, endDate, location, maxParticipants, id]);
    return (result as any).affectedRows > 0;  
};