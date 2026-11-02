process.env.JWT_SECRET = 'test-secret';

const request = require('supertest');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

jest.mock('../../src/models/User');
jest.mock('../../src/config/db', () => jest.fn());

const app = require('../../src/app');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('debería registrar un usuario exitosamente', async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        _id: 'newuser123',
        name: 'Test User',
        email: 'test@example.com',
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: '123456' });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('debería fallar con email inválido', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test', email: 'invalid-email', password: '123456' });

      expect(response.status).toBe(400);
    });

    it('debería fallar con password menor a 6 caracteres', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test', email: 'test@example.com', password: '123' });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión con credenciales válidas', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test',
        email: 'test@example.com',
        password: 'hashed',
        matchPassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('debería fallar con email incorrecto', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'password123' });

      expect(response.status).toBe(401);
      consoleSpy.mockRestore();
    });
  });
});
