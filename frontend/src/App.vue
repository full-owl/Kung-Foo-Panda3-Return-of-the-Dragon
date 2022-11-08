<template>
  <v-app>
    <v-main>
      <ButtonTable :items="items"/>
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
      items: [],
      item_t:"entree"
    }
  },
  methods: {
    async fetchItems() {
      const res = await fetch(`http://localhost:8800/items/${this.item_t}`);

      const data = await res.json();
      return data;
    }
  },
  async created() {

    this.items = await this.fetchItems();
  }
}
</script>
