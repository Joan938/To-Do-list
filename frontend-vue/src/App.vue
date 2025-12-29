<template>
  <div class="App">
    <header class="app-header">
      <h1>To-Do List</h1>
      <p class="subtitle">Gestiona tus tareas de manera eficiente</p>
    </header>

    <main class="app-main">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="container">
        <TodoForm
          :editingTodo="editingTodo"
          @submit="handleSubmit"
          @cancel="handleCancelEdit"
        />

        <div v-if="loading" class="loading">
          Cargando tareas...
        </div>
        <TodoList
          v-else
          :todos="todos"
          @toggle="handleToggleTodo"
          @edit="handleEditTodo"
          @delete="handleDeleteTodo"
        />
      </div>
    </main>

    <footer class="app-footer">
      <p>Desarrollado por Joan Martínez | Vue.js + Node.js + MongoDB</p>
    </footer>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import todoService from './services/todoService';

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList
  },
  data() {
    return {
      todos: [],
      editingTodo: null,
      loading: true,
      error: null
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    async loadTodos() {
      try {
        this.loading = true;
        this.error = null;
        const response = await todoService.getAllTodos();
        this.todos = response.data;
      } catch (err) {
        this.error = 'Error al cargar las tareas. Verifica que el servidor esté corriendo.';
        console.error('Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async handleCreateTodo(todoData) {
      try {
        const response = await todoService.createTodo(todoData);
        this.todos = [response.data, ...this.todos];
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async handleUpdateTodo(todoData) {
      try {
        const response = await todoService.updateTodo(this.editingTodo._id, todoData);
        this.todos = this.todos.map(todo =>
          todo._id === this.editingTodo._id ? response.data : todo
        );
        this.editingTodo = null;
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async handleToggleTodo(id) {
      try {
        const response = await todoService.toggleTodo(id);
        this.todos = this.todos.map(todo =>
          todo._id === id ? response.data : todo
        );
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async handleDeleteTodo(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        try {
          await todoService.deleteTodo(id);
          this.todos = this.todos.filter(todo => todo._id !== id);
        } catch (err) {
          console.error('Error:', err);
        }
      }
    },

    handleEditTodo(todo) {
      this.editingTodo = todo;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    handleCancelEdit() {
      this.editingTodo = null;
    },

    handleSubmit(todoData) {
      if (this.editingTodo) {
        this.handleUpdateTodo(todoData);
      } else {
        this.handleCreateTodo(todoData);
      }
    }
  }
};
</script>