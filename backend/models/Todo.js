const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true,
    maxlength: [500, 'El contenido no puede exceder 500 caracteres']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
    default: Date.now
  },
  completada: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);