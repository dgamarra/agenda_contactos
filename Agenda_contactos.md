# Agenda de Contactos - Aplicación MERN Completa

## Descripción General

**Nombre del Proyecto:** Agenda de Contactos
**Stack Tecnológico:** MongoDB, Express.js, React, Node.js
**Tipo:** Aplicación Full Stack con Testing Completo
**Propósito:** Académico - Aprendizaje de MERN, Testing y Control de Versiones

---

## Índice

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Árbol de Directorios](#árbol-de-directorios)
3. [Backend Completo](#backend-completo)
4. [Frontend Completo](#frontend-completo)
5. [Testing](#testing)
6. [Docker](#docker)
7. [Documentación](#documentación)
8. [Scripts y Comandos](#scripts-y-comandos)

---

## 1. Arquitectura del Proyecto

```
agenda_contactos/
├── backend/                 # Servidor Express + MongoDB
├── frontend/               # React + TailwindCSS + Context API
├── tests/                  # Testing (Jest, Cypress)
├── docker/                 # Dockerfiles y docker-compose
├── package.json            # Scripts globales
├── README.md               # Documentación
└── .gitignore              # Git ignore
```

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │
│  │  Login   │ │ Register │ │Dashboard │ │   Context    │    │
│  │   Page   │ │   Page   │ │   Page   │ │   (Auth)     │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Axios + JWT
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (Express)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │
│  │  Auth    │ │Contacts  │ │  JWT     │ │   Error      │    │
│  │ Routes   │ │  Routes  │ │Middleware │ │   Handler   │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │
│  ┌──────────┐ ┌──────────┐ ┌────────────────────────────┐   │
│  │  Auth    │ │Contact   │ │   Express-Validator        │   │
│  │Controller│ │Controller│ │   Helmet, CORS, RateLimit  │   │
│  └──────────┘ └──────────┘ └────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB (Base de Datos)                  │
│  ┌────────────┐ ┌──────────┐                                │
│  │  Users     │ │ Contacts │                                │
│  │ Collection │ │Collection│                                │
│  └────────────┘ └──────────┘                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Árbol de Directorios

```
agenda_contactos/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Conexión MongoDB
│   │   ├── controllers/
│   │   │   ├── authController.js  # Registro, login, logout
│   │   │   └── contactController.js # CRUD contactos
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # Verificación JWT
│   │   ├── models/
│   │   │   ├── User.js            # Modelo usuario
│   │   │   └── Contact.js         # Modelo contacto
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Rutas auth
│   │   │   └── contactRoutes.js   # Rutas contactos
│   │   ├── services/
│   │   │   └── authService.js     # Lógica auth
│   │   ├── utils/
│   │   │   └── errorHandler.js    # Middleware errores
│   │   └── app.js                 # Configuración Express
│   ├── .env                       # Variables de entorno
│   ├── .env.example               # Template variables
│   ├── Dockerfile                 # Docker backend
│   ├── package.json
│   └── tests/
│       ├── unit/
│       │   └── authService.test.js
│       └── integration/
│           ├── auth.test.js
│           └── contacts.test.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ContactCard.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Loading.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── tests/
│   └── e2e/
│       ├── cypress/
│       │   └── e2e/
│       │       ├── happy-path.cy.js
│       │       ├── unhappy-path.cy.js
│       │       └── golden-path.cy.js
│       ├── cypress.config.js
│       └── package.json
│
├── docker/
│   └── docker-compose.yml
│
├── package.json
├── README.md
├── .gitignore
└── salida.md
```

---

## 3. Backend Completo

### 3.1 package.json

```json
{
  "name": "agenda-contactos-backend",
  "version": "1.0.0",
  "description": "Backend API REST para Agenda de Contactos",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node src/app.js",
    "test": "jest --coverage --detectOpenHandles",
    "test:unit": "jest tests/unit --coverage",
    "test:integration": "jest tests/integration --coverage",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

### 3.2 Variables de Entorno (.env.example)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agenda_contactos
JWT_SECRET=tu_jwt_secret_aqui_muy_largo_y_seguro_12345
NODE_ENV=development
JWT_EXPIRE=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3.3 Configuración de Base de Datos (src/config/db.js)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 3.4 Modelo de Usuario (src/models/User.js)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 3.5 Modelo de Contacto (src/models/Contact.js)

```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'El teléfono no puede exceder 20 caracteres'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'La empresa no puede exceder 100 caracteres'],
    },
    category: {
      type: String,
      enum: ['trabajo', 'personal', 'familia', 'amigo', 'otro'],
      default: 'personal',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ user: 1, name: 'text' });

module.exports = mongoose.model('Contact', contactSchema);
```

### 3.6 Middleware de Autenticación (src/middleware/authMiddleware.js)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token requerido' });
  }
};

module.exports = { protect };
```

### 3.7 Servicio de Auth (src/services/authService.js)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

module.exports = { register, login, generateToken };
```

### 3.8 Controlador de Auth (src/controllers/authController.js)

```javascript
const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await authService.login({ email, password });

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Sesión cerrada correctamente',
  });
};

const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getMe };
```

### 3.9 Controlador de Contactos (src/controllers/contactController.js)

```javascript
const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const getContacts = async (req, res, next) => {
  try {
    const { search, category, favorite } = req.query;
    const query = { user: req.user._id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (favorite === 'true') {
      query.favorite = true;
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, company, category, favorite } = req.body;

    const contact = await Contact.create({
      user: req.user._id,
      name,
      phone,
      email,
      company,
      category,
      favorite: favorite || false,
    });

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, company, category, favorite } = req.body;

    let contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, company, category, favorite },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contacto eliminado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    contact.favorite = !contact.favorite;
    await contact.save();

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
};
```

### 3.10 Rutas de Auth (src/routes/authRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const validateRegister = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);

module.exports = router;
```

### 3.11 Rutas de Contactos (src/routes/contactRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

const validateContact = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('category').optional().isIn(['trabajo', 'personal', 'familia', 'amigo', 'otro']),
  body('favorite').optional().isBoolean(),
];

router.route('/')
  .get(contactController.getContacts)
  .post(validateContact, contactController.createContact);

router.route('/:id')
  .get(contactController.getContact)
  .put(validateContact, contactController.updateContact)
  .delete(contactController.deleteContact);

router.put('/:id/favorite', contactController.toggleFavorite);

module.exports = router;
```

### 3.12 Manejo de Errores (src/utils/errorHandler.js)

```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = { message, statusCode: 404 };
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `El ${field} ya está en uso`;
    error = { message, statusCode: 400 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error del servidor',
  });
};

module.exports = errorHandler;
```

### 3.13 App Principal (src/app.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: 'Demasiadas solicitudes, intenta más tarde',
});

app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

module.exports = app;
```

---

## 4. Frontend Completo

### 4.1 package.json

```json
{
  "name": "agenda-contactos-frontend",
  "version": "1.0.0",
  "description": "Frontend React para Agenda de Contactos",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.6",
    "@testing-library/react": "^14.1.2",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "jsdom": "^23.0.1",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.10",
    "vitest": "^1.1.1"
  }
}
```

### 4.2 Configuración de Vite (vite.config.js)

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### 4.3 Tailwind Config (tailwind.config.js)

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

### 4.4 PostCSS Config (postcss.config.js)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4.5 index.html

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agenda de Contactos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.6 Estilos (src/index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
}

.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### 4.7 main.jsx

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 4.8 App.jsx

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

### 4.9 AuthContext (src/context/AuthContext.jsx)

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, ...userData } = response.data.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, ...userData } = response.data.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### 4.10 API Service (src/services/api.js)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contactService = {
  getAll: (params) => api.get('/contacts', { params }),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (data) => api.post('/contacts', data),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
  toggleFavorite: (id) => api.put(`/contacts/${id}/favorite`),
};

export default api;
```

### 4.11 Componentes

#### Layout.jsx

```javascript
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;
```

#### Navbar.jsx

```javascript
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="text-xl font-bold text-primary-600">
            Agenda de Contactos
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hola, {user?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

#### Loading.jsx

```javascript
function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loading;
```

#### ContactCard.jsx

```javascript
import { useState } from 'react';
import { contactService } from '../services/api';

function ContactCard({ contact, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      const response = await contactService.toggleFavorite(contact._id);
      onUpdate(response.data.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este contacto?')) return;
    setIsDeleting(true);
    try {
      await contactService.delete(contact._id);
      onDelete(contact._id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryColors = {
    trabajo: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    familia: 'bg-purple-100 text-purple-800',
    amigo: 'bg-yellow-100 text-yellow-800',
    otro: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{contact.name}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${categoryColors[contact.category] || 'bg-gray-100'}`}>
            {contact.category}
          </span>
        </div>
        <button
          onClick={handleToggleFavorite}
          className={`text-2xl ${contact.favorite ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          {contact.favorite ? '★' : '☆'}
        </button>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        {contact.phone && <p>📞 {contact.phone}</p>}
        {contact.email && <p>✉️ {contact.email}</p>}
        {contact.company && <p>🏢 {contact.company}</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onUpdate(contact, true)}
          className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
```

#### ContactForm.jsx

```javascript
import { useState, useEffect } from 'react';

function ContactForm({ contact, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    category: 'personal',
    favorite: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        phone: contact.phone || '',
        email: contact.email || '',
        company: contact.company || '',
        category: contact.category || 'personal',
        favorite: contact.favorite || false,
      });
    }
  }, [contact]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {contact ? 'Editar Contacto' : 'Nuevo Contacto'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="familia">Familia</option>
            <option value="amigo">Amigo</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            checked={formData.favorite}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <label htmlFor="favorite" className="text-sm text-gray-700">
            Marcar como favorito
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : contact ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
```

#### SearchBar.jsx

```javascript
function SearchBar({ onSearch, onFilterChange, filters }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="familia">Familia</option>
            <option value="amigo">Amigo</option>
            <option value="otro">Otro</option>
          </select>
          <button
            onClick={() => onFilterChange('favorite', filters.favorite === 'true' ? '' : 'true')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.favorite === 'true'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
```

### 4.12 Páginas

#### Login.jsx

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Iniciar Sesión
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

#### Register.jsx

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Crear Cuenta
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary-600 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
```

#### Dashboard.jsx

```javascript
import { useState, useEffect } from 'react';
import { contactService } from '../services/api';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: '', favorite: '' });

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.favorite) params.favorite = filters.favorite;

      const response = await contactService.getAll(params);
      setContacts(response.data.data);
    } catch (err) {
      setError('Error al cargar contactos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = async (formData) => {
    try {
      await contactService.create(formData);
      setShowForm(false);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear contacto');
    }
  };

  const handleUpdateContact = async (formData) => {
    try {
      await contactService.update(editingContact._id, formData);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar contacto');
    }
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const handleEditContact = (contact, isEdit = false) => {
    setEditingContact(isEdit ? contact : null);
    setShowForm(false);
  };

  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading && contacts.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Contactos</h1>
        <button
          onClick={() => { setShowForm(true); setEditingContact(null); }}
          className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Nuevo Contacto
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onUpdate={(updated) => {
              setContacts((prev) =>
                prev.map((c) => (c._id === updated._id ? updated : c))
              );
            }}
            onDelete={handleDeleteContact}
          />
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No hay contactos</p>
          <p className="text-sm">Crea tu primer contacto</p>
        </div>
      )}

      {(showForm || editingContact) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full">
            <ContactForm
              contact={editingContact}
              onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
```

#### NotFound.jsx

```javascript
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Página no encontrada</p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
```

---

## 5. Testing

### 5.1 Testing Unitario (Jest)

#### tests/unit/authService.test.js

```javascript
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
```

### 5.2 Testing de Integración

#### tests/integration/auth.test.js

```javascript
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

jest.mock('../../src/models/User');
jest.mock('../../src/config/db', () => jest.fn());

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
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'password123' });

      expect(response.status).toBe(401);
    });
  });
});
```

#### tests/integration/contacts.test.js

```javascript
const request = require('supertest');
const app = require('../../src/app');
const Contact = require('../../src/models/Contact');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/Contact');
jest.mock('../../src/config/db', () => jest.fn());

const mockToken = jwt.sign({ id: 'user123' }, 'test-secret', { expiresIn: '1h' });

describe('Contacts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
```

### 5.3 Testing E2E (Cypress)

#### package.json

```json
{
  "name": "agenda-contactos-e2e",
  "version": "1.0.0",
  "description": "Tests E2E con Cypress",
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open"
  },
  "devDependencies": {
    "cypress": "^13.6.2"
  }
}
```

#### cypress.config.js

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
```

#### happy-path.cy.js

```javascript
describe('Happy Path - Registro, Login, Contactos', () => {
  const timestamp = Date.now();
  const testUser = {
    name: 'Test User',
    email: `test${timestamp}@example.com`,
    password: 'password123',
  };
  const testContact = {
    name: 'Juan Pérez',
    phone: '1234567890',
    email: 'juan@example.com',
    company: 'Empresa Test',
    category: 'trabajo',
  };

  beforeEach(() => {
    cy.visit('/register');
  });

  it('Happy Path: Registro exitoso', () => {
    cy.get('input[name="name"]').type(testUser.name);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Mis Contactos').should('be.visible');
  });

  it('Happy Path: Login exitoso', () => {
    cy.get('a').contains('Inicia Sesión').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Happy Path: Crear contacto', () => {
    cy.get('button').contains('+ Nuevo Contacto').click();
    cy.get('input[name="name"]').type(testContact.name);
    cy.get('input[name="phone"]').type(testContact.phone);
    cy.get('input[name="email"]').type(testContact.email);
    cy.get('input[name="company"]').type(testContact.company);
    cy.get('select[name="category"]').select(testContact.category);
    cy.get('button[type="submit"]').click();
    cy.contains(testContact.name).should('be.visible');
  });

  it('Happy Path: Editar contacto', () => {
    cy.contains(testContact.name).parent().find('button').contains('Editar').click();
    cy.get('input[name="name"]').clear().type('Juan Actualizado');
    cy.get('button[type="submit"]').click();
    cy.contains('Juan Actualizado').should('be.visible');
  });

  it('Happy Path: Eliminar contacto', () => {
    cy.contains('Juan Actualizado').parent().find('button').contains('Eliminar').click();
    cy.on('window:confirm', () => true);
    cy.contains('Juan Actualizado').should('not.exist');
  });
});
```

#### unhappy-path.cy.js

```javascript
describe('Unhappy Path - Validaciones', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Unhappy Path: Password incorrecto', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Credenciales inválidas').should('be.visible');
  });

  it('Unhappy Path: Email inválido', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Email inválido').should('be.visible');
  });

  it('Unhappy Path: Formulario de registro vacío', () => {
    cy.visit('/register');
    cy.get('button[type="submit"]').click();
    cy.contains('El nombre es obligatorio').should('be.visible');
  });

  it('Unhappy Path: Contraseñas no coinciden', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('differentpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });

  it('Unhappy Path: Contraseña muy corta', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirmPassword"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('al menos 6 caracteres').should('be.visible');
  });
});
```

#### golden-path.cy.js

```javascript
describe('Golden Path - Flujo completo del usuario', () => {
  const timestamp = Date.now();
  const user = {
    name: 'Golden User',
    email: `golden${timestamp}@example.com`,
    password: 'password123',
  };

  it('Golden Path: Registro → Login → Crear → Buscar → Editar → Logout', () => {
    // 1. Registro
    cy.visit('/register');
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Golden User').should('be.visible');

    // 2. Crear contacto
    cy.get('button').contains('+ Nuevo Contacto').click();
    cy.get('input[name="name"]').type('Contacto de Prueba');
    cy.get('input[name="phone"]').type('9876543210');
    cy.get('input[name="email"]').type('contacto@test.com');
    cy.get('select[name="category"]').select('personal');
    cy.get('button[type="submit"]').click();
    cy.contains('Contacto de Prueba').should('be.visible');

    // 3. Buscar contacto
    cy.get('input[placeholder="Buscar contactos..."]').type('Prueba');
    cy.contains('Contacto de Prueba').should('be.visible');

    // 4. Editar contacto
    cy.contains('Contacto de Prueba').parent().find('button').contains('Editar').click();
    cy.get('input[name="name"]').clear().type('Contacto Editado');
    cy.get('button[type="submit"]').click();
    cy.contains('Contacto Editado').should('be.visible');

    // 5. Toggle favorito
    cy.contains('Contacto Editado').parent().find('button').contains('☆').click();
    cy.contains('Contacto Editado').parent().find('text').contains('★').should('exist');

    // 6. Logout
    cy.get('button').contains('Cerrar Sesión').click();
    cy.url().should('include', '/login');

    // 7. Login nuevamente
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Contacto Editado').should('be.visible');
  });
});
```

---

## 6. Docker

### 6.1 docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: agenda-mongodb
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    container_name: agenda-backend
    restart: always
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/agenda_contactos?authSource=admin
      - JWT_SECRET=agenda_jwt_secret_production_2024
      - NODE_ENV=production
      - JWT_EXPIRE=7d
    ports:
      - "5000:5000"
    depends_on:
      - mongodb

  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    container_name: agenda-frontend
    restart: always
    environment:
      - VITE_API_URL=/api
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### 6.2 Dockerfile Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/app.js"]
```

### 6.3 Dockerfile Frontend

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 6.4 nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 7. Documentación

### 7.1 README.md

```markdown
# Agenda de Contactos

Aplicación web full stack MERN (MongoDB, Express.js, React, Node.js) para gestión de contactos personales.

## 🚀 Características

- ✅ Registro e inicio de sesión con JWT
- ✅ CRUD completo de contactos
- ✅ Búsqueda y filtrado de contactos
- ✅ Sistema de favoritos
- ✅ Categorías (trabajo, personal, familia, amigo, otro)
- ✅ API REST segura
- ✅ Testing completo (Unitario, Integración, E2E)
- ✅ Dockerización completa
- ✅ Clean Code y buenas prácticas

## 📋 Requisitos

- Node.js 18+
- MongoDB 7+ (o cuenta MongoDB Atlas)
- Docker (opcional)

## ⚡ Instalación

### 1. Clonar el proyecto
```bash
git clone <repo-url>
cd agenda_contactos
```

### 2. Instalar dependencias
```bash
npm run install:all
```

### 3. Configurar variables de entorno
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agenda_contactos
JWT_SECRET=tu_secret_seguro
```

### 4. Iniciar la aplicación
```bash
cd backend && npm run dev
cd frontend && npm run dev
```

Acceder a: `http://localhost:3000`

## 🐳 Docker
```bash
cd docker
docker-compose up -d
```

## 🧪 Testing
```bash
cd backend && npm run test
cd tests/e2e && npm run test
```

## 📝 API Endpoints

### Auth
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario actual |

### Contactos (Requiere JWT)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contacts` | Listar contactos |
| POST | `/api/contacts` | Crear contacto |
| PUT | `/api/contacts/:id` | Actualizar contacto |
| DELETE | `/api/contacts/:id` | Eliminar contacto |

## 🧑‍🎓 Uso Académico

Esta aplicación está diseñada para que estudiantes aprendan:
- Desarrollo Full Stack MERN
- Testing de software (Unit, Integración, E2E)
- Control de versiones con Git
- Arquitectura cliente-servidor
- Clean Code y buenas prácticas

## 📄 Licencia

MIT License
```

### 7.2 .gitignore

```gitignore
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.*.local
backend/.env
frontend/.env

# Build outputs
dist/
build/
frontend/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Coverage
coverage/
backend/coverage/
frontend/coverage/

# Test
.nyc_output/

# Docker
docker-compose.override.yml
```

---

## 8. Scripts y Comandos

### package.json Raíz

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install",
    "test": "npm run test:unit && npm run test:integration && npm run test:e2e",
    "test:unit": "cd backend && npm run test:unit",
    "test:integration": "cd backend && npm run test:integration",
    "test:e2e": "cd tests/e2e && npm run test",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:build": "docker-compose build"
  }
}
```

### Comandos de Uso

```bash
# Instalación completa
npm run install:all

# Desarrollo
npm run dev

# Testing
npm run test                    # Todos los tests
npm run test:unit              # Solo unitarios
npm run test:integration       # Solo integración
npm run test:e2e               # Solo E2E

# Docker
npm run docker:up              # Iniciar contenedores
npm run docker:down           # Detener contenedores
npm run docker:build          # Construir imágenes
```

---

## Resumen de Entregables

| # | Entregable | Estado |
|---|------------|--------|
| 1 | Arquitectura del proyecto | ✅ Completado |
| 2 | Árbol de directorios | ✅ Completado |
| 3 | Backend completo | ✅ Completado |
| 4 | Frontend completo | ✅ Completado |
| 5 | Configuración MongoDB | ✅ Completado |
| 6 | API REST | ✅ Completado |
| 7 | Middleware JWT | ✅ Completado |
| 8 | Testing unitario (Jest) | ✅ Completado |
| 9 | Testing integración (Jest) | ✅ Completado |
| 10 | Testing E2E (Cypress) | ✅ Completado |
| 11 | Dockerización | ✅ Completado |
| 12 | README.md | ✅ Completado |
| 13 | Archivos .env.example | ✅ Completado |
| 14 | Scripts npm | ✅ Completado |
| 15 | Casos de prueba | ✅ Completado |

---

**Fecha de generación:** 13 de Mayo de 2026
**Total de archivos generados:** 57
**Aplicación:** Lista para uso académico