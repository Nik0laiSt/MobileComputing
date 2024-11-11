import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import * as bcrypt from 'bcrypt'; // Für die Hashing-Funktionalität der Passwörter
import { User } from '../models/User'; // Benutzer-Modell-Interface oder Klasse

// Anzahl der Runden für den Passwort-Hashing-Prozess
const SALT_ROUNDS = 10;

export const getUserById = async (id: number): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
};

export const createUser = async (user: User): Promise<number> => {
    const { name, email, password, role } = user;
    
    // Passwort-Hashing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // SQL-Abfrage für die Benutzererstellung
    const query = `
        INSERT INTO users (name, email, password_hash, role) 
        VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [name, email, hashedPassword, role]);
    return (result as any).insertId; // Rückgabe der ID des erstellten Benutzers
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as User; // Rückgabe des ersten gefundenen Benutzers
    }
    return null; // Wenn kein Benutzer gefunden wird
};

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    const user = await findUserByEmail(email);
    if (!user) return false; // Benutzer existiert nicht

    // Passwortüberprüfung
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

export const getUserGroups = async (userId: number): Promise<string[]> => {
    const query = `
        SELECT g.name 
        FROM groups g
        JOIN user_groups ug ON g.id = ug.group_id
        WHERE ug.user_id = ?
    `;
    
    const [rows] = await db.execute(query, [userId]);
    return rows.map((row: any) => row.name); // Gibt nur die Gruppennamen zurück
};

export const addUserToGroup = async (userId: number, groupId: number): Promise<void> => {
    const query = `
        INSERT INTO user_groups (user_id, group_id) 
        VALUES (?, ?)
    `;
    
    await db.execute(query, [userId, groupId]);
};

export const updateUserRole = async (userId: number, newRole: 'Helfer' | 'Gruppenleiter' | 'Admin'): Promise<void> => {
    const query = `
        UPDATE users 
        SET role = ? 
        WHERE id = ?
    `;
    
    await db.execute(query, [newRole, userId]);
};






