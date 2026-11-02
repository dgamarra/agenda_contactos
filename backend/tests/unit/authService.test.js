const { register, login, generateToken } = require('../../src/services/authService');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/User');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debería crear un usuario exitosamente', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        save: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      const result = await register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.name).toBe('Test User');
      expect(result.email).toBe('test@example.com');
      expect(result.token).toBe('mock-token');
    });

    it('debería lanzar error si el email ya existe', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      await expect(
        register({ name: 'Test', email: 'test@example.com', password: '123456' })
      ).rejects.toThrow('El email ya está registrado');
    });
  });

  describe('login', () => {
    it('debería iniciar sesión exitosamente', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        matchPassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });
      jwt.sign.mockReturnValue('mock-token');

      const result = await login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.email).toBe('test@example.com');
      expect(result.token).toBe('mock-token');
    });

    it('debería lanzar error con credenciales inválidas', async () => {
      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false),
      };
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      await expect(
        login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toThrow('Credenciales inválidas');
    });
  });

  describe('generateToken', () => {
    it('debería generar un token JWT', () => {
      jwt.sign.mockReturnValue('test-token');
      const token = generateToken('user123');
      expect(token).toBe('test-token');
    });
  });
});