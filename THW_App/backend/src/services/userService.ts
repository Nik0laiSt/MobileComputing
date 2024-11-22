import db from '../database/connection'; // Die Datenbankverbindung wird importiert
import * as bcrypt from 'bcrypt'; // Für die Hashing-Funktionalität der Passwörter
import { User } from '../models/User'; // Benutzer-Modell-Interface oder Klasse

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
    console.log(password);
    console.log(user.password_hash);
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








