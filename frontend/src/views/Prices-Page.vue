<template>
  <div>
    <div class="revenue">
            <h2>Today's Revenue: ${{this.sales_today}}</h2>
            <h2>Last 7 Days' Revenue: ${{this.sales_last}}</h2>
        </div>
    <h1>Item Prices</h1>
    
    <div class="navButtons">
      <router-link to="/manager">Inventory</router-link>
      <router-link to="/prices">Pricing</router-link>
      <router-link to="/menu-items">Menu Items</router-link>
    </div>

    <CRUDTable
      title="Item Prices"
      crud="U"
      endpoint="/mealsizes"
      @startUpdate="startUpdate"
      @update="update"
    >
      <template v-slot:form>
        <form>
          <div class="form-group">
            <p>Change price for {{ item.name }} {{ item.foodtype }}</p>
            <!-- <label>Food Type:</label>
                        <input class="form-control" type="item.type" required v-model="item.type"> -->
          </div>
          <!-- <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" type="msName" required v-model="msName">
                    </div> -->
          <div class="form-group">
            <label>Price:</label>
            <input
              class="form-control"
              type="msPrice"
              required
              v-model="item.price"
            />
          </div>
        </form>
        <!-- <button type="button" class="btn btn-primary" @click="addms">Edit Price</button> -->
      </template>
    </CRUDTable>
    <footer><router-link to="../">Main Menu</router-link></footer>
  </div>
</template>

<script>
import CRUDTable from "../components/CRUDTable.vue";
import consts from "../consts.js";
export default {
  components: {
    CRUDTable,
  },
  data() {
    return {
      sales_today: 0.00,
      sales_last: 0.00,
      item: {
        foodtype: "",
        name: "",
        price: 0.0,
      },
    };
  },
  methods: {
    clearForm() {
        this.item = {
            foodtype: '',
            name: '',
            price: 0.0,
        }
    },
    startUpdate(item) {
        this.item = item;
    },
    async update(item) {
      if (this.item.price < 0) {
        this.item.price = 0.00;
      }

      let res = await fetch(
        `${consts.backend_url}/mealsizeitem/${item.foodtype}/${item.name}/${item.price}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!res.ok) {
        console.error(res);
      }
      console.log(item.name);
      this.clearForm();
      this.$router.go();
    },
  },
  async mounted() {
    this.sales_today = await fetch(`${consts.backend_url}/salestoday`).then(data => data.json());
    this.sales_last =  await fetch(`${consts.backend_url}/sales`).then(data => data.json());
  }
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
  background-color: #b30000;
}
.navButtons a {
  display: inline-block;
  padding: 10px 30px;
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 2px solid white;
  background-color: #b30000;
  color: white;
  text-decoration: none;
  font-size: 10px;
}

.navButtons a:hover {
  color: #b30000;
  background-color: white;
  border: 2px solid #b30000;
  /* opacity: 0.3; */
}

footer {
  position: relative;
  margin-top: 15px;
}
</style>