<template>
  <v-app>
    <v-main>
      <p>Entrees</p>
      <ButtonTable :items="entrees"/>
      <br>
      <p>Sides</p>
      <ButtonTable :items="sides"/>
      <br>
      <p>Appetizers</p>
      <ButtonTable :items="appetizers"/>
      <br>
      <p>Drinks</p>
      <ButtonTable :items="drinks"/>
      <br>
      
      <MenuItems/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ButtonTable from './components/ButtonTable.vue';
import MenuItems from './components/MenuItems.vue'


export default {
  name: 'App',

  components: {
    MenuItems,
    ButtonTable
  },

  data() {
    return {
      entrees: [],
      appetizers: [],
      drinks:[],
      sides:[],
      bowls:[], // need to implement
    }
  },
  methods: {
    // returns array of items of food type
    async fetchItems(foodtype) {
      // connection from backend folder.. made need to change port if doing on web hosting
      const res = await fetch(`http://localhost:8800/items/${foodtype}`);

      const data = await res.json();
      return data;
    }
  },
  async created() {

    this.entrees = await this.fetchItems("entree");
    this.appetizers = await this.fetchItems("appetizer");
    this.drinks = await this.fetchItems("drink");
    this.sides = await this.fetchItems("side");
  }
}
</script>
