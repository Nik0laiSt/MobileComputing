import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Certificate } from '../models/Certificate';

export const getAllCertificatesForUser = async (userId: number): Promise<Certificate[] | null> => {
    const [rows] = await db.query('SELECT * FROM certificates WHERE user_id = ?', [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Certificate[]; 
    }
    return null;
};

export const createCertificate = async (userId: number, certificationId: number): Promise<boolean> => {
    const query = `
        INSERT INTO certificates (user_id, certification_id) 
        VALUES (?, ?)
    `;
    
    const [result] = await db.execute(query, [userId, certificationId]);
    return (result as any).affectedRows > 0; 
};
