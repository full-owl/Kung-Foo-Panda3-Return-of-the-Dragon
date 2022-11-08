<template>
  <v-app>
    <v-main>
      <MenuItems/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MenuItems from './components/MenuItems.vue'

export default {
  name: 'App',

  components: {
    MenuItems,
  },

  data: () => ({
    //
  }),
}
</script>
