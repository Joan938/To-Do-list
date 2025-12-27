const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ fecha: -1 });
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
});

// Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { titulo, contenido, fecha } = req.body;

    const todo = await Todo.create({
      titulo,
      contenido,
      fecha: fecha || Date.now()
    });

    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const { titulo, contenido, fecha, completada } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { titulo, contenido, fecha, completada },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
});

// Marcar tarea como completada/incompleta
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    todo.completada = !todo.completada;
    await todo.save();

    res.json({
      success: true,
      message: `Tarea marcada como ${todo.completada ? 'completada' : 'pendiente'}`,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado de la tarea',
      error: error.message
    });
  }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
});

module.exports = router;