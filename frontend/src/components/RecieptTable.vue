<template>
  <div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="w-5" scope="col">Id</th>
          <th class="w-55" scope="col">Item</th>
          <th class="w-35" scope="col">Price</th>
          <th class="w-5" scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" :key="index">
          <td>{{ index }}</td>
          <td>
            <p>{{item.type.name}}</p>
            <ul>
              <li v-for="part in item.mealItems" :key="part">
                {{part.name}}
              </li>
            </ul>
          </td>
          <td>{{ "$" + item.type.price }}</td>
          <td>
            <!-- TODO: edit button -->
            <button type="button" class="btn btn-primary" @click="() => items.splice(index,1)">X</button>
          </td>
        </tr>
      </tbody>
      <tfoot class="table-dark" v-if="items.length > 0">
        <tr>
          <td colspan="2">Subtotal:</td>
          <td>{{ "$" + subtotal.toFixed(2) }}</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">Total:</td>
          <td>{{ "$" + total.toFixed(2) }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <div class="btn-group btn-group-lg container-fluid" role="group">
      <button type="button" class="btn btn-primary" @click="clear">Cancel</button>
      <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propOrderType: String,
    propOrderItems: Array,
    propOrderPrice: Number
  },

  data() {
    return {
      items: [
        {
          type: { "foodtype": "combo", "name": "bowl", "amountneeded": 0, "price": "7.50" },
          mealItems: [
            { "id": 1, "name": "Chow Mein", "foodtype": "side", "description": "Not Available" },
            { "id": 7, "name": "The Original Orange Chicken", "foodtype": "entree", "description": "Not Available" },
            { "id": 22, "name": "Veggie Spring Roll", "foodtype": "appetizer", "description": "Not Available" }
          ],
          custom_intructions: "",
        }
      ]
    }
  },
  computed: {
    subtotal: function () {
      return this.items.map(item => item.price).reduce((prev,curr) => prev + curr,0);
    },
    total: function () {
      return this.subtotal * (1 + 0.0825);
    }
  },
  methods: {
    clear() {
      // TODO: confirmation modal
      this.items = [];

    },
    checkout() {
      // TODO: show price/total modal
      // TODO: add to backend
      this.items = [];

    },
    addToOrder(type,items) {
      // Javascript Woes
      const newItem = {
        type: type ? type : "",
        mealItems: items ? items : [],
        price: 7, // TODO: get price from backend
      };
      console.log(newItem);

      this.items.push(newItem);
    },
  }
}
</script>

<style scoped>
    .btn {
        border-radius: 0%;
        border-color: aliceblue;
        color: aliceblue;
    }
</style>