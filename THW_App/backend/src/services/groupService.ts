import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import { Group } from '../models/Group'; 

export const getGroupByName = async (name: string): Promise<Group | null> => {
    const query = `SELECT * FROM groups WHERE name = ?`;
    const [rows] = await db.execute(query, [name]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Group; 
    }
    return null;
};

export const getGroupsForUser = async (userId: number): Promise<Group[] | null> => {
    const query = `SELECT  g.id, g.name FROM user_groups ug JOIN groups g ON ug.group_id = g.id WHERE user_id = ?`;
    const [rows] = await db.execute(query, [userId]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Group[]; 
    }
    return null;
};