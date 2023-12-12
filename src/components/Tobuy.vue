<template>
  <div class="item">
    <div v-if="!buyItem.isBought">
      <input type="submit" value="bought" @click="onMove(buyItem)" />
    </div>
    <div v-else></div>
    <div :style="{ color: buyItem.isBought? 'gray' : 'black' }">
      {{ buyItem.item }}
    </div>
    <div :style="{ color: buyItem.isBought? 'gray' : 'black' }">
      ¥ {{ buyItem.price.toLocaleString() }}
    </div>
    <div v-if="!buyItem.isBought">
      <font-awesome-icon :icon="['fas', 'edit']" @click="onEdit(buyItem)"/>
    </div>
    <div v-else></div>
    <div>
      <font-awesome-icon :icon="['fas', 'trash-alt']" @click="onDelete(buyItem.id)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tobuy',
  props: {
    buyItem: Object
  },
  methods: {
    onMove(buyItem) {
      buyItem.isBought = true
      this.$emit('move', buyItem)
    },
    onEdit(buyItem) {
      this.$emit('edit', buyItem)
    },
    onDelete(id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>
input[type="submit"] {
  border-color: #FF0099;
  background-color: white;
  color: #FF0099;
}

input[type="submit"]:hover {
  background-color: #FF0099;
  color: white;
}
</style>