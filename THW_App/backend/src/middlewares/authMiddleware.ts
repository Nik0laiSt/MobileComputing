import * as jwt from 'jsonwebtoken';

// Middleware zur Token-Verifizierung
export const authenticateToken = (req, res, next) => {
    // Token aus dem Authorization-Header extrahieren
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log("error");
        return res.status(401).json({ message: 'Zugang verweigert, Token erforderlich' });
    }

    try {
        // Token verifizieren
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Benutzerinformationen im Request-Objekt speichern (z.B. userId)
        req.user = decoded;

        next(); // Weiter zum nächsten Middleware oder zur Route
    } catch (err) {
        res.status(403).json({ message: 'Ungültiges Token' });
    }
};


export function checkRole(role) {
    return (req, res, next) => {
        // Wenn die Rolle des Benutzers nicht übereinstimmt, verweigere den Zugriff
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Zugang verweigert: Unzureichende Berechtigungen' });
        }
        next(); // Rolle stimmt überein, weiter zur nächsten Route oder Funktion
    };
}
