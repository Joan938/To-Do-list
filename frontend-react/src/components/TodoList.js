import React from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
 if (todos.length === 0) {
  return (
    <div className="todo-list">
      <div className="empty-state">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: '0 auto 1.5rem', opacity: 0.3 }}
        >
          <path
            d="M9 11L12 14L22 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>No hay tareas registradas</p>
        <p className="empty-subtitle">Crea tu primera tarea arriba</p>
      </div>
    </div>
  );
}


  return (
    <div className="todo-list">
      <h2> Mis Tareas ({todos.length})
  {todos.filter(t => !t.completada).length > 0 && (
    <span style={{
      marginLeft: '0.5rem',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: 400
    }}>
      · {todos.filter(t => !t.completada).length} pendiente{todos.filter(t => !t.completada).length !== 1 ? 's' : ''}
    </span>
  )}</h2>
 
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