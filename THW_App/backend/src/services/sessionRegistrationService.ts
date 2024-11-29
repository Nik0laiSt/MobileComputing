import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Registration } from '../models/SessionRegistration';

export const getRegistrationById = async (id: number): Promise<Registration | null> => {
    const [rows] = await db.query('SELECT * FROM training_sessions WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Registration; 
    }
    return null;
};

export const getAllRegistrationsForUser = async (userId: number): Promise<Registration[] | null> => {
    const [rows] = await db.query('SELECT * FROM training_sessions WHERE user_id = ?', [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Registration[]; 
    }
    return null;
};

export const getAllRegistrationsForTrainingSession = async (sessionId: number): Promise<Registration[] | null> => {
    const [rows] = await db.query('SELECT * FROM training_sessions WHERE session_id = ?', [sessionId]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Registration[]; 
    }
    return null;
};

export const createRegistration = async (sessionId: number, userId: number): Promise<boolean> => {
    const query = `
        INSERT INTO session_registrations (session_id, user_id) 
        VALUES (?, ?)
    `;
    
    const [result] = await db.execute(query, [sessionId, userId]);
    return (result as any).affectedRows > 0; 
};

export const deleteRegistration = async (sessionId: number, userId: number): Promise<boolean> => {
    const query = `
        DELETE FROM session_registrations
        WHERE session_id = ? AND user_id = ?;
    `;

    const [result] = await db.execute(query, [sessionId, userId]);
    return (result as any).affectedRows > 0;  
};

export const updateRegistration = async (sessionId: number, userId: number, attended: boolean): Promise<boolean> => {
    const query = `
        UPDATE session_registrations
        SET attended = ?
        WHERE session_id = ? AND user_Id = ?;
    `;

    const [result] = await db.execute(query, [attended, sessionId, userId]);
    return (result as any).affectedRows > 0;  
};