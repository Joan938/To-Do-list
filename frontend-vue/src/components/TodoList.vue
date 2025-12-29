<template>
  <div class="todo-list">
    <div v-if="todos.length === 0" class="empty-state">
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="margin: 0 auto 1.5rem; opacity: 0.3"
      >
        <path
          d="M9 11L12 14L22 4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>No hay tareas registradas</p>
      <p class="empty-subtitle">Crea tu primera tarea arriba</p>
    </div>

    <div v-else>
      <h2>
        Mis Tareas ({{ todos.length }})
        <span v-if="pendingCount > 0" style="margin-left: 0.5rem; color: rgba(255, 255, 255, 0.5); font-weight: 400">
          · {{ pendingCount }} pendiente{{ pendingCount !== 1 ? 's' : '' }}
        </span>
      </h2>
      
      <div class="todos-container">
        <TodoItem
          v-for="todo in todos"
          :key="todo._id"
          :todo="todo"
          @toggle="$emit('toggle', $event)"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    pendingCount() {
      return this.todos.filter(t => !t.completada).length;
    }
  }
};
</script>