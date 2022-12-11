<template>
  <div class="pos">
    <table class="table table-dark">
      <thead>
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
          <td>{{ "$" + item.price.toFixed(2) }}</td>
          <td>
            <!-- TODO: edit button -->
            <button type="button" class="btn btn-danger" @click="() => items.splice(index,1)">X</button>
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
      <button type="button" class="btn btn-danger" @click="clear">Cancel</button>
      <button type="button" class="btn btn-success" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import consts from '../consts.js';
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
          price: 7.50,
        }
      ]
    }
  },
  computed: {
    subtotal: function () {
      return this.items.map(item => item.price).reduce((prev,curr) => prev + curr,0);
    },
    total: function () {
      return this.subtotal * 1.0825;
    }
  },
  methods: {
    clear() {
      // TODO: confirmation modal
      this.items = [];
    },
    async checkout() {
      // TODO: show price/total modal
      // TODO: add to backend
      let res = await fetch(`${consts.backend_url}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          items: this.items,
          subtotal: this.subtotal,
        }),
      }); 
      // TODO: better error handling
      if(!res.ok) {
        console.error(res);
      }
      console.log(this.items);
      // clear items
      this.items = [];
    },
    addToOrder(type, items) {
      // Javascript Woes
      // TODO: figure out getting price for al la carte items
      const price = type.foodtype == "combo" ? parseFloat(type.price) : parseFloat(type.price) * items.length;
      const newItem = {
        type: type ? type : "",
        mealItems: items ? items : [],
        price: price
      };
      this.items.push(newItem);
    },
  }
}
</script>

<style scoped>
.pos{
  top:0;
  position: sticky;
}
    .btn {
        border-radius: 0%;
        border-color: aliceblue;
        color: aliceblue;
    }
</style>  