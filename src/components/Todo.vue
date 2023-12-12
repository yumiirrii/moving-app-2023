<template>
  <div class="item">
    <div v-if="!doItem.isDone">
      <input type="submit" value="done" @click="onMove(doItem)" />
    </div>
    <div v-else></div>
    <div :style="{ color: doItem.isDone? 'gray' : 'black' }">
      {{ doItem.task }}
    </div>
    <div :style="{ color: doItem.isDone? 'gray' : doItem.isOverdue? 'red' : 'black' }">
      {{ formattedDueDate }}
    </div>
    <div v-if="!doItem.isDone" class="icon">
      <font-awesome-icon :icon="['fas', 'edit']" @click="onEdit(doItem)"/>
    </div>
    <div v-else></div>
    <div class="icon">
      <font-awesome-icon :icon="['fas', 'trash-alt']" @click="onDelete(doItem.id)" />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'Todo',
  props: {
    doItem: Object
  },
  computed: {
    formattedDueDate() {
      return this.doItem.isDone
      ? format(new Date(this.doItem.doneDate), 'yyyy-MM-dd')
      : format(new Date(this.doItem.dueDate), 'yyyy-MM-dd')
    }
  },
  methods: {
    onMove(doItem) {
      doItem.isDone = true
      doItem.doneDate = new Date()
      console.log(doItem.doneDate)
      this.$emit('move', doItem)
    },
    onEdit(doItem) {
      this.$emit('edit', doItem)
    },
    onDelete(id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>
input[type="submit"] {
  border-color: #000066;
  background-color: white;
  color: #000066;
}

input[type="submit"]:hover {
  background-color: #000066;
  color: white;
}
</style>