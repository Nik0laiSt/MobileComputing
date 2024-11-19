import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Training } from '../models/Training'; 

export const getTrainingById = async (id: number): Promise<Training | null> => {
    const [rows] = await db.query('SELECT * FROM trainings WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Training; 
    }
    return null;
};

// muss Titel bzw Name eindeutig sein? wenn ja Name = Id
export const getTrainingByTitle = async (title: string): Promise<Training | null> => {
    const [rows] = await db.query('SELECT * FROM trainings WHERE title = ?', [title]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Training; 
    }
    return null;
};

export const createTraining = async (title: string, description: string, groupId: string): Promise<boolean> => {
    const query = `
        INSERT INTO trainings (title, desciption, groupId) 
        VALUES (?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [title, description, groupId]);
    return (result as any).affectedRows > 0; 
};

export const deleteTraining = async (id: number): Promise<boolean> => {
    const query = `
        DELETE FROM trainings 
        WHERE id = ?;
    `;

    const [result] = await db.execute(query, [id]);
    return (result as any).affectedRows > 0;  
};

export const updateTraining = async (id: number, title: string, description: string, groupId: string): Promise<boolean> => {
    const query = `
        UPDATE trainings
        SET title = ?, description = ?, groupId = ?
        WHERE id = ?;
    `;

    const [result] = await db.execute(query, [title, description, groupId, id]);
    return (result as any).affectedRows > 0;  
};