import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tareas registradas</p>
        <p className="empty-subtitle">¡Crea tu primera tarea!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Mis Tareas ({todos.length})</h2>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;