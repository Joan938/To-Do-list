require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todos');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/todos', todoRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de To-Do List - Joan Martínez',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV}`);
});
