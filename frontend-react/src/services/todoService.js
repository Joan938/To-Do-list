import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  // Obtener todas las tareas
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Obtener una tarea por ID
  getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Crear nueva tarea
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Actualizar tarea
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Alternar estado completada
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  // Eliminar tarea
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};

export default todoService;