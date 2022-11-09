<template>
  <v-app>
    <v-main>
      <!-- <p>Bowls</p>
      <ButtonTable :items="bowls"/>
      <br>
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
       -->
      <MenuItems/>
      <br>

    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import ButtonTable from './components/ButtonTable.vue';
import MenuItems from './components/MenuItems.vue';
//import consts from './consts';


export default {
  name: 'App',

  components: {
    MenuItems,
    //ButtonTable
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
  /* methods: {
    // returns array of items of food type
    async fetchItems(foodtype) {
      // connection from backend folder.. made need to change port if doing on web hosting
      const res = await fetch(`${consts.backend_url}/items/${foodtype}`);

      const data = await res.json();
      return data;
    },
    async fetchCombos() {
      const res = await fetch(`${consts.backend_url}/combosizes`);

      const data = await res.json();
      return data;
    }
  },
  async created() {

    this.entrees = await this.fetchItems("entree");
    this.appetizers = await this.fetchItems("appetizer");
    this.drinks = await this.fetchItems("drink");
    this.sides = await this.fetchItems("side");
    this.bowls = await this.fetchCombos();
  } */
}
</script>
