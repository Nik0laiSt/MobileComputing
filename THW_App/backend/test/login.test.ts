import * as request from 'supertest';
import * as userService from '../src/services/userService'; // Um den Service für das Testen zu mocken
import app from '../src/app';

jest.mock('../src/services/userService'); // Mock den Service

describe('User Controller - Login', () => {
  
  const mockUser = {
    id: 1,
    name: 'Max',
    prename: 'Mustermann',
    email: 'max.mustermann@example.com',
    password: 'securepassword', // Angenommen, das Passwort ist im Klartext
    role: 'user',
  };

  it('should return a token if login is successful', async () => {
    // Mock den User-Service, dass er einen Benutzer mit der E-Mail findet und das Passwort korrekt ist
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (userService.authenticateUser as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'max.mustermann@example.com',
        password: 'securepassword',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy(); // Prüfe, ob der Token in der Antwort vorhanden ist
  });

  it('should return 400 if user is not found', async () => {
    // Mock den User-Service, dass er den Benutzer mit der E-Mail nicht findet
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'max.mustermann@example.com',
        password: 'securepassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Benutzer nicht gefunden'); // Fehlermeldung überprüfen
  });

  it('should return 404 if password is incorrect', async () => {
    // Mock den User-Service, dass er den Benutzer findet, aber das Passwort falsch ist
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (userService.authenticateUser as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'max.mustermann@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Falsches Passwort'); // Fehlermeldung überprüfen
  });

  afterAll(() => {
    jest.resetAllMocks(); // Resette alle Mocks, um Tests zu isolieren
  });
});
