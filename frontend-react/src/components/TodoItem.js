import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className={`todo-item ${todo.completada ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h3>{todo.titulo}</h3>
          <span className="todo-date">{formatDate(todo.fecha)}</span>
        </div>
        <p className="todo-description">{todo.contenido}</p>
        <div className="todo-status">
          {todo.completada ? (
            <span className="badge badge-completed">Completada</span>
          ) : (
            <span className="badge badge-pending">Pendiente</span>
          )}
        </div>
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => onToggle(todo._id)}
          className={`btn ${todo.completada ? 'btn-warning' : 'btn-success'}`}
          title={todo.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {todo.completada ? '↶' : '✓'}
        </button>
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-info"
          title="Editar tarea"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="btn btn-danger"
          title="Eliminar tarea"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default TodoItem;