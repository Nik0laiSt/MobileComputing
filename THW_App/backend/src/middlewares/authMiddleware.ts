const jwt = require('jsonwebtoken');

// Middleware zur Token-Verifizierung
export const authenticateToken = (req, res, next) => {
    // Token aus dem Authorization-Header extrahieren
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Zugang verweigert, Token erforderlich' });
    }

    try {
        // Token verifizieren
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Benutzerinformationen im Request-Objekt speichern (z.B. userId)
        req.user = decoded;

        next(); // Weiter zum nächsten Middleware oder zur Route
    } catch (err) {
        res.status(403).json({ message: 'Ungültiges Token' });
    }
};
