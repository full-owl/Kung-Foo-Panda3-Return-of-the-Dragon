<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Item</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in items" :key="item.name">
        <td>{{ index }}</td>
        <td>
          <p>{{item.name}}</p>
          <ul>
            <li v-for="part in item.parts" :key="part">
              {{part}}
            </li>
          </ul>
        </td>
        <td>{{ "$" + item.price.toFixed(2) }}</td>
      </tr>
    </tbody>
    <tfoot class="table-dark" v-if="items.length > 0">
      <tr>
        <td colspan="2">Subtotal:</td>
        <td>{{ "$" + subtotal.toFixed(2) }}</td>
      </tr>
      <tr>
        <td colspan="2">Total:</td>
        <td>{{ "$" + total.toFixed(2) }}</td>
      </tr>
    </tfoot>
  </table>
  <div class="btn-group btn-group-lg container-fluid" role="group">
    <button type="button" class="btn btn-primary" @click="clear">Cancel</button>
    <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        // {
        //   type: "",// Bowl,Plate, Al la Carte, Appetizer, Drink, Side,  etc
        //   size: "",// Small, Medium, Large
        //   parts: [""], // White Rice, etc
        //   price: 0.00,
        // }
        {
          name: "Bowl",
          parts: ["White Rice", "Beef"],
          price: 8.25,
        },
        {
          name: "Plate asdf",
          price: 4.35,
        }
      ]
    }
  },
  computed: {
    subtotal: function () {
      return this.items.map(item => item.price).reduce((prev,curr) => prev + curr,0);
    },
    total: function () {
      let t = this.subtotal * (1 + 0.0825);
      console.log(t);
      return t;
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

    }
  }
}
</script>