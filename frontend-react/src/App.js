import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Cargar tareas al iniciar
  useEffect(() => {
    loadTodos();
  }, []);


  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getAllTodos();
      setTodos(response.data);
    } catch (err) {
      setError('Error al cargar las tareas. Verifica que el servidor esté corriendo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateTodo = async (todoData) => {
    try {
      const response = await todoService.createTodo(todoData);
      setTodos([response.data, ...todos]);
      alert('✅ Tarea creada exitosamente');
    } catch (err) {
      alert('❌ Error al crear la tarea');
      console.error('Error:', err);
    }
  };


  const handleUpdateTodo = async (todoData) => {
    try {
      const response = await todoService.updateTodo(editingTodo._id, todoData);
      setTodos(todos.map((todo) =>
        todo._id === editingTodo._id ? response.data : todo
      ));
      setEditingTodo(null);
      alert('✅ Tarea actualizada exitosamente');
    } catch (err) {
      alert('❌ Error al actualizar la tarea');
      console.error('Error:', err);
    }
  };


  const handleToggleTodo = async (id) => {
    try {
      const response = await todoService.toggleTodo(id);
      setTodos(todos.map((todo) =>
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      alert('❌ Error al cambiar el estado de la tarea');
      console.error('Error:', err);
    }
  };


  const handleDeleteTodo = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await todoService.deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
        alert('✅ Tarea eliminada exitosamente');
      } catch (err) {
        alert('❌ Error al eliminar la tarea');
        console.error('Error:', err);
      }
    }
  };


  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleCancelEdit = () => {
    setEditingTodo(null);
  };


  const handleSubmit = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleCreateTodo(todoData);
    }
  };


 return (
  <div className="App">
    <header className="app-header">
      <h1>To-Do List</h1>
      <p className="subtitle">Gestiona tus tareas de manera eficiente</p>
    </header>


    <main className="app-main">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      <div className="container">
        <TodoForm
          onSubmit={handleSubmit}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
        />


        {loading ? (
          <div className="loading">Cargando tareas...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </main>


    <footer className="app-footer">
      <p>Desarrollado por Joan Martínez | React + Node.js + MongoDB</p>
    </footer>
  </div>
);
}


export default App;