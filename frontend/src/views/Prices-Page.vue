<template>

    <div>

        <h1>Item Prices</h1>

        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div> 

        <table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">foodtype</th>
                <th scope="col">name</th>
                <th scope="col">amountneeded</th>
                <th scope="col">price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>entree</td>
                <td>small</td>
                <td>1</td>
                <td>4.9</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>entree</td>
                <td>medium</td>
                <td>2</td>
                <td>8.9</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>entree</td>
                <td>large</td>
                <td>4</td>
                <td>10.4</td>
                </tr>
                <tr>
                <th scope="row">4</th>
                <td>premium entree</td>
                <td>small</td>
                <td>1</td>
                <td>6.15</td>
                </tr>
                <tr>
                <th scope="row">5</th>
                <td>premium entree</td>
                <td>medium</td>
                <td>2</td>
                <td>10.7</td>
                </tr>
                <tr>
                <th scope="row">6</th>
                <td>premium entree</td>
                <td>large</td>
                <td>4</td>
                <td>14.65</td>
                </tr>
                <tr>
                <th scope="row">7</th>
                <td>drink</td>
                <td>small</td>
                <td>16</td>
                <td>2.1</td>
                </tr>
                <tr>
                <th scope="row">8</th>
                <td>drink</td>
                <td>medium</td>
                <td>24</td>
                <td>2.3</td>
                </tr>
                <tr>
                <th scope="row">9</th>
                <td>drink</td>
                <td>large</td>
                <td>32</td>
                <td>2.5</td>
                </tr>
            </tbody>
        </table>

        <v-dialog max-width="500" v-model="dialog">
            <v-card :title="'Choose Size for ' + item.name">
            <v-card-text>
                <v-btn-toggle v-model="selected" shaped mandatory>
                <v-btn v-for="size in mealsizes[item.foodtype]" :key="size.name">
                    {{ size.name }}
                </v-btn>
                </v-btn-toggle>
            </v-card-text>
            </v-card>
        </v-dialog>
     


        <footer><router-link to="../">Main Menu</router-link></footer>

    </div>
    
</template>

<script>
import consts from "../consts.js";

export default {
//   props: {
//     receiptTable: Object,
//   },
  data() {
    return {
      dialog: false,
      item: {},
      selected: 0,
      mealsizes: {},
    };
  },
  async created() {
    // Get sizes from backend
    const res = await fetch(`${consts.backend_url}/mealsizes`);
    const mealsizes = await res.json();
    // Convert from rows to a Map grouped by foodtype like sides, entrees, etc.
    this.mealsizes = mealsizes;
    // this.mealsizes = mealsizes.reduce((group, mealsize) => {
    //   // console.log(mealsize);
    //   if (mealsize.foodtype == "combo") {
    //     return group;
    //   }
    //   if (["small", "medium", "large"].includes(mealsize.name)) {
    //     group[mealsize.foodtype] = group[mealsize.foodtype] ?? [];
    //     group[mealsize.foodtype].push(mealsize);
    //   }
    //   return group;
    // }, {});
  },
  methods: {
    show(item) {
      this.item = item;
      this.dialog = true;
      return this.dialog;
    },
    addOrderToReciept() {
      this.dialog = false;
      let type = this.mealsizes[this.item.foodtype][this.selected];
      this.$emit("addOrder", type, [this.item]);
    },
  },
};
</script>

<style scoped>
.navButtons {
    z-index: 1;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: red;
}
.navButtons a {
    display: inline-block;
    padding: 10px 30px;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 2px solid white;
    background-color: red;
    color: white;
    text-decoration: none;
    font-size: 10px;
}

.navButtons a:hover {
    color:red;
    background-color: white;
    border: 2px solid red;
    /* opacity: 0.3; */
}
</style>