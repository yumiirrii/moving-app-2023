<template>
  <div class="input-area">
    <form @submit="onSubmit">
      <div>
        <span>task:</span><br />
        <input type="text" v-model="formData.task" />
      </div>
      <div>
        <span>due date:</span><br />
        <input type="date" v-model="formData.dueDate" />
      </div>
      <div>
        <input type="submit" :value="isEdit? 'update list' : 'add to list'" />
      </div>  
    </form>
  </div>
</template>
  
<script>
import { format } from 'date-fns'

export default {
  name: 'AddTodo',
  data() {
    return {
      formData: {
        task: '',
        dueDate: '',
      }
    }
  },
  props: {
    editingTodo: Object,
    isEdit: Boolean
  },
  watch: {
    editingTodo: {
      handler(newVal) {
        this.formData.task = newVal.task
        this.formData.dueDate = format(newVal.dueDate, 'yyyy-MM-dd')
      },
      immediate: true, // Trigger the watcher immediately when the component is created
    },
  },
  methods: {
    onSubmit(e) {
    e.preventDefault()

    if(!this.formData.task || !this.formData.dueDate) {
      alert('input is required')
      return
    }
    
    if (this.isEdit) {
      const editedTodo = {
        id: this.editingTodo.id,
        task: this.formData.task,
        dueDate: new Date(this.formData.dueDate),
        isDone: false
      }
      this.$emit('save-todo', editedTodo)

    } else {
      const newTodo = {
        id: '',
        task: this.formData.task,
        dueDate: new Date(this.formData.dueDate),
      }
      this.$emit('save-todo', newTodo)

    }

    this.formData = {}

    }
  }
}
</script>

<style scoped>
input[type="submit"] {
  border-color: #000066;
  background-color: #000066;
  color: white;
}

input[type="submit"]:hover {
  background-color: white;
  color: #000066;
}
</style>