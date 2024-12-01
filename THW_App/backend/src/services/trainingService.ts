import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Training } from '../models/Training'; 

export const getTrainingById = async (id: number): Promise<Training | null> => {
    const [rows] = await db.query('SELECT * FROM trainings WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Training; 
    }
    return null;
};

export const getTrainingByName = async (name: string): Promise<Training | null> => {
    const query = `SELECT * FROM trainings WHERE title = ?`;
    const [rows] = await db.execute(query, [name]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Training; // Rückgabe des ersten gefundenen Trainings
    }
    return null; // Wenn kein Benutzer gefunden wird
};

// muss Titel bzw Name eindeutig sein? wenn ja Name = Id
export const getTrainingByTitle = async (title: string): Promise<Training | null> => {
    const [rows] = await db.query('SELECT * FROM trainings WHERE title = ?', [title]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Training; 
    }
    return null;
};

export const getTrainingsForGroup = async (groupId: number): Promise<Training[] | null> => {
    const query = `SELECT * FROM trainings WHERE group_id = ?`;
    const [rows] = await db.execute(query, [groupId]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Training[]; 
    }
    return null;
};

export const createTraining = async (name: string, description: string, certification: number, user: number): Promise<Training> => {
  
    const createTrainingQuery = `
        INSERT INTO trainings (title, description, certification_id, created_by) 
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(createTrainingQuery, [name, description, certification, user]);
    if(result && (result as any).affectedRows == 1){
        return {
            id: (result as any).insertId,
            title: name,
            description: description,
            certification_id: certification,
            created_by: user,
            created_at: new Date()
        };
    }
    return null; 
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