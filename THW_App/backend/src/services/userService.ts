import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import * as bcrypt from 'bcrypt'; // Für die Hashing-Funktionalität der Passwörter
import { User } from '../models/User'; // Benutzer-Modell-Interface oder Klasse
import { Group } from '../models/Group';
import { Certification } from '../models/Certification';
import { TrainingSession } from '../models/TrainingSession';

// Anzahl der Runden für den Passwort-Hashing-Prozess
const SALT_ROUNDS = 10;

export const getUserById = async (id: number): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as User; // Rückgabe des ersten gefundenen Benutzers
    }
    return null; // Wenn kein Benutzer gefunden wird
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as User; // Rückgabe des ersten gefundenen Benutzers
    }
    return null; // Wenn kein Benutzer gefunden wird
};

export const getUserGroupsById = async (id: number): Promise<Group[] | null> => {
    const [rows] = await db.query('SELECT id, name, description FROM user_groups as ug join groups as g on group_id = id WHERE user_id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Group[]; // Rückgabe aller Gruppen eines Benutzers
    }
    return null; // Wenn keine Gruppen gefunden wurden
};

export const getUserGroupCertificationsById = async (id: number, group_id: number): Promise<Certification[] | null> => {
    const [rows] = await db.query('SELECT * FROM user_groups as ug join certifications as c on ug.group_id = c.group_id WHERE user_id = ? and ug.group_id = ?', [id, group_id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows as Certification[]; // Rückgabe aller Fortbildungen einer Gruppe
    }
    return null; // Wenn keine Fortbildungen gefunden wurden
};

export const getUserSessionById = async (id: number, session_id: number): Promise<TrainingSession | null> => {
    const [rows] = await db.query('SELECT * FROM user_sessions WHERE user_id = ? and session_id = ?', [id, session_id]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as TrainingSession; // Rückgabe aller Fortbildungen einer Gruppe
    }
    return null; // Wenn keine Fortbildungen gefunden wurden
};

export const createUser = async (name: string, prename: string, email: string, password: string): Promise<boolean> => {
    // Passwort-Hashing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // SQL-Abfrage für die Benutzererstellung
    const query = `
        INSERT INTO users (name, prename, email, password_hash) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [name, prename, email, hashedPassword]);
    return (result as any).affectedRows > 0; 
};

export const authenticateUser = async (user: User, password: string): Promise<boolean> => {
    // Passwortüberprüfung
    const isMatch = await bcrypt.compare(password, user.password_hash);
    return isMatch;
};

export const updateUser = async (id: number, name: string, prename: string, email: string, password: string): Promise<boolean> => {
    // Passwort-Hashing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const query = `
        UPDATE users
        SET name = ?, prename = ?, email = ?, password = ?
        WHERE id = ?;
    `;
    
    const [result] = await db.execute(query, [name, prename, email, hashedPassword, id]);
    return (result as any).affectedRows > 0;  
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const query = `
        DELETE FROM users 
        WHERE id = ?;
    `;
    
    const [result] = await db.execute(query, [id]);
    return (result as any).affectedRows > 0;  
};








