<template>
  <div>
    <AddTodo
      @save-todo="saveItem"
      :editingTodo="editingTodo" 
      :isEdit="isEdit" 
    />
    <div class="item-list">
      <Todos
        @move="saveItem"
        @edit="editItem"
        @delete="deleteItem" 
        :doItems="todos"
      /> 
    </div>
    <div class="moved-item-list">
      <Todos
        @delete="deleteItem"
        :doItems="dones"
      />
    </div>
  </div>
</template>

<script>
import Todos from '@/components/Todos.vue'
import AddTodo from '@/components/AddTodo.vue'
import { getAll, save, deleteById } from '@/firebase/dbManager'
import { isAfter } from 'date-fns'

export default {
  name: 'TodoView',
  components: {
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: [],
      dones: [],
      editingTodo: {
        id: '',
        task: '',
        dueDate: new Date(),
        isDone: ''
      },
      isEdit: false,
      modifiedTodos: []
    }
  },
  methods: {
    async getAllItems() {
      const doItems = await getAll('todos')
      // todos
      const filteredTodos = doItems.filter(doItem => !doItem.isDone)
      this.todos = filteredTodos.sort((a,b) => a.dueDate - b.dueDate)
      this.todos = this.setIsOverdue(this.todos)
      // dones
      const filteredDones = doItems.filter(doItem => doItem.isDone)
      this.dones = filteredDones.sort((a,b) => a.updatedDate - b.updatedDate)
    },
    async saveItem(doItem) {
      await save('todos', doItem)
      await this.getAllItems()
      this.isEdit = false
      console.log(doItem.isDone)
    },
    editItem(doItem) {
      this.editingTodo = doItem
      this.isEdit = true
    },
    async deleteItem(id) {
      await deleteById('todos', id)
      await this.getAllItems()
    },
    setIsOverdue(doItems) {
      return doItems.map(doItem => ({
        ...doItem,
        isOverdue: isAfter(new Date(), doItem.dueDate)
      }))
    }
  },
  created() {
    this.getAllItems()
  }
}
</script>

<style scoped>
.item-list {
  border-bottom-color: #000066;
}
</style>
