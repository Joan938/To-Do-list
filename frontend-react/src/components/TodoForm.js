import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        titulo: editingTodo.titulo,
        contenido: editingTodo.contenido,
        fecha: new Date(editingTodo.fecha).toISOString().split('T')[0],
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingTodo) {
      setFormData({
        titulo: '',
        contenido: '',
        fecha: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      
      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contenido">Contenido</label>
        <textarea
          id="contenido"
          name="contenido"
          value={formData.contenido}
          onChange={handleChange}
          placeholder="Descripción de la tarea"
          required
          maxLength={500}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Actualizar' : 'Crear Tarea'}
        </button>
        {editingTodo && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;