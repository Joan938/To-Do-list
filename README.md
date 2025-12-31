# To-Do List

Aplicación web full-stack para gestión de tareas con interfaces en React y Vue.js, backend en Node.js y base de datos MongoDB.

## Tecnologías

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- CORS

**Frontend:**
- React 18.3
- Vue.js 3.5
- Axios
- CSS moderno (Glassmorphism)

## Características

-   Crear, editar, eliminar y marcar tareas como completadas
-  Interfaz moderna 
-  Dos implementaciones frontend (React y Vue.js)
-  API REST completa
-  Diseño responsive

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v18 o superior)
- MongoDB
- Git

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/To-Do-list.git
cd To-Do-list
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
NODE_ENV=development
```

Iniciar MongoDB (si está instalado localmente) y luego:
```bash
npm start
```

El servidor correrá en `http://localhost:5000`

### 3. Configurar Frontend React

Abrir una nueva terminal:
```bash
cd frontend-react
npm install
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### 4. Configurar Frontend Vue (opcional)

Abrir otra terminal:
```bash
cd frontend-vue
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:8080`

## Uso

1. **Crear tarea:** Completa el formulario y presiona "Crear Tarea"
2. **Editar tarea:** Click en el ícono de lápiz (✎)
3. **Completar tarea:** Click en el ícono de check (✓)
4. **Eliminar tarea:** Click en el ícono de X (×)

## Estructura del Proyecto
```
To-Do-list/
├── backend/              # Servidor Node.js + Express
│   ├── config/          # Configuración de MongoDB
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Rutas de la API
│   └── server.js        # Punto de entrada
├── frontend-react/      # Aplicación React
│   └── src/
│       ├── components/  # Componentes React
│       ├── services/    # Llamadas a la API
│       └── App.js       # Componente principal
└── frontend-vue/        # Aplicación Vue.js
    └── src/
        ├── components/  # Componentes Vue
        ├── services/    # Llamadas a la API
        └── App.vue      # Componente principal
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/todos` | Obtener todas las tareas |
| GET | `/api/todos/:id` | Obtener una tarea específica |
| POST | `/api/todos` | Crear nueva tarea |
| PUT | `/api/todos/:id` | Actualizar tarea completa |
| PATCH | `/api/todos/:id/toggle` | Alternar estado completada |
| DELETE | `/api/todos/:id` | Eliminar tarea |

## Notas

- El frontend React usa `create-react-app`
- El frontend Vue usa `Vite`
- Ambos frontends se conectan al mismo backend
- Los puertos por defecto son: Backend (5000), React (3000), Vue (8080)

## Autor

Joan Martínez

## Licencia

MIT
