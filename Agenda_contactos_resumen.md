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
npm run test                   # Todos los tests
npm run test:unit              # Solo unitarios
npm run test:integration       # Solo integración
npm run test:e2e               # Solo E2E

# Docker
npm run docker:up             # Iniciar contenedores
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