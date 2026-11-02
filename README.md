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

## 🏗️ Arquitectura

```
agenda_contactos/
├── backend/                 # Servidor Express + MongoDB
│   └── src/
│       ├── config/         # Conexión a BD
│       ├── controllers/    # Lógica de negocio
│       ├── middleware/    # Autenticación JWT
│       ├── models/        # Modelos Mongoose
│       ├── routes/        # Rutas API
│       ├── services/      # Servicios auth
│       └── utils/        # Manejo de errores
├── frontend/              # React + TailwindCSS
│   └── src/
│       ├── components/   # Componentes reutilizables
│       ├── context/      # Context API (Auth)
│       ├── pages/        # Páginas principales
│       └── services/     # API axios
├── tests/
│   ├── unit/            # Tests unitarios (Jest)
│   ├── integration/     # Tests integración (Jest)
│   └── e2e/            # Tests E2E (Cypress)
└── docker/             # Docker Compose
```

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
# Instalar todas las dependencias
npm run install:all

# O individualmente
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configurar variables de entorno

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agenda_contactos
JWT_SECRET=tu_secret_seguro
NODE_ENV=development
JWT_EXPIRE=7d
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Iniciar la aplicación

**Modo desarrollo:**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Acceder a: `http://localhost:3000`

## 🐳 Docker

### Iniciar con Docker Compose
```bash
cd docker
docker-compose up -d
```

Servicios:
- **MongoDB**: `http://localhost:27017`
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000`

### Detener
```bash
docker-compose down
```

## 🧪 Testing

### Tests Unitarios (Backend)
```bash
cd backend
npm run test:unit
```

### Tests de Integración (Backend)
```bash
cd backend
npm run test:integration
```

### Tests E2E (Cypress)
```bash
cd tests/e2e
npm install
npm run test
```

### Todos los tests
```bash
npm test
```

## 📝 API Endpoints

### Auth
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario actual |
| POST | `/api/auth/logout` | Cerrar sesión |

### Contactos (Requiere JWT)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contacts` | Listar contactos |
| GET | `/api/contacts/:id` | Obtener contacto |
| POST | `/api/contacts` | Crear contacto |
| PUT | `/api/contacts/:id` | Actualizar contacto |
| DELETE | `/api/contacts/:id` | Eliminar contacto |
| PUT | `/api/contacts/:id/favorite` | Toggle favorito |

### Parámetros de Query
- `search`: Buscar por nombre, email o empresa
- `category`: Filtrar por categoría
- `favorite`: Filtrar favoritos (true/false)

## 🔐 Seguridad

- **Helmet**: Headers HTTP seguros
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: 100 peticiones/15min
- **bcrypt**: Hash de contraseñas (10 rondas)
- **JWT**: Tokens en header `Authorization: Bearer <token>`
- **Express Validator**: Validación de inputs

## 📦 Scripts Disponibles

```bash
npm run dev          # Iniciar frontend y backend
npm run test         # Ejecutar todos los tests
npm run docker:up    # Iniciar contenedores Docker
npm run docker:down  # Detener contenedores Docker
```

## 🧑‍🎓 Uso Académico

Esta aplicación está diseñada para que estudiantes aprendan:
- Desarrollo Full Stack MERN
- Testing de software (Unit, Integración, E2E)
- Control de versiones con Git
- Arquitectura cliente-servidor
- Clean Code y buenas prácticas
- Dockerización de aplicaciones

## 📄 Licencia

MIT License

## 👤 Autor

Desarrollado con fines académicos para el aprendizaje del stack MERN.