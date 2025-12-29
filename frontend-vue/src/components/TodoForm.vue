<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <h2>{{ editingTodo ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
    
    <div class="form-group">
      <label for="titulo">Título</label>
      <input
        type="text"
        id="titulo"
        v-model="formData.titulo"
        placeholder="Título de la tarea"
        required
        maxlength="100"
      />
    </div>

    <div class="form-group">
      <label for="contenido">Contenido</label>
      <textarea
        id="contenido"
        v-model="formData.contenido"
        placeholder="Descripción de la tarea"
        required
        maxlength="500"
        rows="4"
      />
    </div>

    <div class="form-group">
      <label for="fecha">Fecha</label>
      <input
        type="date"
        id="fecha"
        v-model="formData.fecha"
        required
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        {{ editingTodo ? 'Actualizar' : 'Crear Tarea' }}
      </button>
      <button
        v-if="editingTodo"
        type="button"
        @click="$emit('cancel')"
        class="btn btn-secondary"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  props: {
    editingTodo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        titulo: '',
        contenido: '',
        fecha: new Date().toISOString().split('T')[0]
      }
    };
  },
  watch: {
    editingTodo: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = {
            titulo: newVal.titulo,
            contenido: newVal.contenido,
            fecha: new Date(newVal.fecha).toISOString().split('T')[0]
          };
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData });
      if (!this.editingTodo) {
        this.formData = {
          titulo: '',
          contenido: '',
          fecha: new Date().toISOString().split('T')[0]
        };
      }
    }
  }
};
</script>