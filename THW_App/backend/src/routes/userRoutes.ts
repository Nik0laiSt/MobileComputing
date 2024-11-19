import {Router} from 'express';
import express from 'express';
import { login, getUser, updateUser, deleteUser, createUser } from '../controllers/userController';

const routes = Router();
const app = express();
routes.get('/users/:id', getUser);
routes.get('/users/:id/registrations', getUser);
routes.post('/api/login', login);
routes.post('/users/create', createUser);
routes.post('/users/:id/update', updateUser);
routes.post('/users/:id/delete', deleteUser);

const PORT = 5000;
app.use('/api', routes); // Hier übergeben wir den Router an den Express-Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
