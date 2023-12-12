<template>
  <div class="items">
    <div :key="doItem.id" v-for="doItem in doItems">
      <Todo 
        @move="$emit('move', doItem)"
        @edit="$emit('edit', doItem)"
        @delete="$emit('delete', doItem.id)"
        :doItem="doItem"
      />
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'

export default  {
  name: 'Todos',
  components: {
    Todo
  },
  props: {
    doItems: Array,
  }
}
</script>