<template>
  <div>
    <AddTobuy
      @save-tobuy="saveItem"
      :editingTobuy="editingTobuy" 
      :isEdit="isEdit" 
    />
    <div class="item-list">
      <Tobuys
        @move="saveItem"
        @edit="editItem"
        @delete="deleteItem" 
        :buyItems="tobuys"
      /> 
      <div class="total">
        <span>total estimate: </span>
        ¥ {{ calcEstimate.toLocaleString() }}
      </div>
    </div>
    <div class="moved-item-list">
      <Tobuys
        @delete="deleteItem"
        :buyItems="boughts"
      />
      <div class="total">
        <span>total spent: </span>
        ¥ {{ calcExpenses.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script>
import Tobuys from '@/components/Tobuys.vue'
import AddTobuy from '@/components/AddTobuy.vue'
import { getAll, save, deleteById } from '@/firebase/dbManager'

export default {
  name: 'TobuyView',
  components: {
    Tobuys,
    AddTobuy
  },
  data() {
    return {
      tobuys: [],
      boughts: [],
      editingTobuy: {
        id: '',
        item: '',
        price: null,
        isBought: ''
      },
      isEdit: false,
    }
  },
  computed: {
    calcEstimate() {
      let total = 0
      this.tobuys.forEach(tobuy => {
        total += tobuy.price
      })
      return total
    },
    calcExpenses() {
      let total = 0
      this.boughts.forEach(bought => {
        total += bought.price
      })
      return total
    }
  },
  methods: {
    async getAllItems() {
      const buyItems = await getAll('tobuys')
      // tobuys
      const filteredTobuys = buyItems.filter(buyItem => !buyItem.isBought)
      this.tobuys = filteredTobuys.sort((a,b) => a.createdDate - b.createdDate)
      // boughts
      const filteredBoughts = buyItems.filter(buyItem => buyItem.isBought)
      this.boughts = filteredBoughts.sort((a,b) => a.updatedDate - b. updatedDate)
    },
    async saveItem(buyItem) {
      await save('tobuys', buyItem)
      await this.getAllItems()
      this.isEdit = false
    },
    editItem(buyItem) {
      this.editingTobuy = buyItem
      this.isEdit = true
    },
    async deleteItem(id) {
      await deleteById('tobuys', id)
      await this.getAllItems()
    },
  },
  created() {
    this.getAllItems()
  }
}
</script>

<style scoped>
.total {
  margin-bottom: 20px;
}

.item-list {
  border-bottom-color: #FF0099;
}
</style>
