import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { CalendarResource, CalendarSessions } from '../models/Calendar';

export const getCalResourcesForUser = async (userId: number): Promise<CalendarResource[] | null> => {
    const query = `SELECT * FROM cal_user_resources WHERE user_id = ?`;
    const [rows] = await db.execute(query, [userId]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as CalendarResource[]; 
    }
    return null;
};

export const getCalSessionsForUser = async (userId: number): Promise<CalendarSessions[] | null> => {
    const query = `SELECT * FROM cal_user_sessions WHERE user_id = ?`;
    const [rows] = await db.execute(query, [userId]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as CalendarSessions[]; 
    }
    return null;
};