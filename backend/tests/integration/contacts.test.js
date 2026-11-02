process.env.JWT_SECRET = 'test-secret';

const request = require('supertest');
const Contact = require('../../src/models/Contact');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/Contact');
jest.mock('../../src/config/db', () => jest.fn());
jest.mock('../../src/models/User');

const app = require('../../src/app');

const mockToken = jwt.sign({ id: 'user123' }, 'test-secret', { expiresIn: '1h' });

describe('Contacts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
      }),
    });
  });

  describe('GET /api/contacts', () => {
    it('debería obtener lista de contactos', async () => {
      const mockContacts = [
        { _id: '1', name: 'Contact 1', user: 'user123' },
        { _id: '2', name: 'Contact 2', user: 'user123' },
      ];
      Contact.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockContacts),
      });

      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
    });
  });

  describe('POST /api/contacts', () => {
    it('debería crear un contacto', async () => {
      const newContact = {
        name: 'New Contact',
        phone: '123456789',
        user: 'user123',
      };
      Contact.create.mockResolvedValue({ ...newContact, _id: 'contact123' });

      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${mockToken}`)
        .send(newContact);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('debería fallar sin nombre', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ phone: '123456789' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/contacts/:id', () => {
    it('debería obtener un contacto específico', async () => {
      const mockContact = { _id: 'contact123', name: 'Test Contact', user: 'user123' };
      Contact.findOne.mockResolvedValue(mockContact);

      const response = await request(app)
        .get('/api/contacts/contact123')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('Test Contact');
    });
  });

  describe('DELETE /api/contacts/:id', () => {
    it('debería eliminar un contacto', async () => {
      Contact.findOne.mockResolvedValue({ _id: 'contact123', user: 'user123' });
      Contact.findByIdAndDelete.mockResolvedValue(true);

      const response = await request(app)
        .delete('/api/contacts/contact123')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('debería fallar si el contacto no existe', async () => {
      Contact.findOne.mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/contacts/nonexistent')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(404);
    });
  });
});
