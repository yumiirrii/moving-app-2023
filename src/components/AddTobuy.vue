<template>
  <div class="input-area">
    <form @submit="onSubmit">
      <div>
        <span>item:</span><br />
        <input type="text" v-model="formData.item" />
      </div>
      <div>
        <span>price:</span><br />
        <input type="number" v-model.number="formData.price" />
      </div>
      <div>
        <input type="submit" :value="isEdit? 'update list' : 'add to list'" />
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'AddTobuy',
  data() {
    return {
      formData: {
        item: '',
        price: null,
      }
    }
  },
  props: {
    editingTobuy: Object,
    isEdit: Boolean
  },
  watch: {
    editingTobuy: {
      handler(newVal) {
        console.log(newVal)
        this.formData = { ...newVal }
      },
      immediate: true, // Trigger the watcher immediately when the component is created
    },
  },
  methods: {
    onSubmit(e) {
    e.preventDefault()

    if(!this.formData.item || !this.formData.price) {
      alert('input is required')
      return
    }
    
    if (this.isEdit) {
      const editedTobuy = {
        id: this.editingTobuy.id,
        item: this.formData.item,
        price: this.formData.price,
        isBought: false
      }
      this.$emit('save-tobuy', editedTobuy)

    } else {
      const newTobuy = {
        id: '',
        item: this.formData.item,
        price: this.formData.price,
      }
      this.$emit('save-tobuy', newTobuy)

    }

    this.formData = {}

    }
  }
}
</script>

<style scoped>
input[type="submit"] {
  border-color: #FF0099;
  background-color: #FF0099;
  color: white;
}

input[type="submit"]:hover {
  background-color: white;
  color: #FF0099;
}
</style>