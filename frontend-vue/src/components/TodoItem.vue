<template>
  <div :class="['todo-item', { completed: todo.completada }]">
    <div class="todo-content">
      <div class="todo-header">
        <h3>{{ todo.titulo }}</h3>
        <span class="todo-date">{{ formatDate(todo.fecha) }}</span>
      </div>
      <p class="todo-description">{{ todo.contenido }}</p>
      <div class="todo-status">
        <span v-if="todo.completada" class="badge badge-completed">Completada</span>
        <span v-else class="badge badge-pending">Pendiente</span>
      </div>
    </div>
    
    <div class="todo-actions">
      <button
        @click="$emit('toggle', todo._id)"
        :class="['btn', todo.completada ? 'btn-warning' : 'btn-success']"
        :title="todo.completada ? 'Marcar como pendiente' : 'Marcar como completada'"
      >
        {{ todo.completada ? '↺' : '✓' }}
      </button>
      <button
        @click="$emit('edit', todo)"
        class="btn btn-info"
        title="Editar tarea"
      >
        ✎
      </button>
      <button
        @click="$emit('delete', todo._id)"
        class="btn btn-danger"
        title="Eliminar tarea"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  }
};
</script>