<template>
  <div class="items">
    <div :key="buyItem.id" v-for="buyItem in buyItems">
      <Tobuy 
        @move="$emit('move', buyItem)"
        @edit="$emit('edit', buyItem)"
        @delete="$emit('delete', buyItem.id)"
        :buyItem="buyItem"
      />
    </div>
  </div>
</template>

<script>
import Tobuy from './Tobuy.vue'

export default  {
  name: 'Tobuys',
  components: {
    Tobuy
  },
  props: {
    buyItems: Array,
  }
}
</script>