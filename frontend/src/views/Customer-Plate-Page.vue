<template>
    <div>
        <MenuItems/>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
</template>

<script>
import MenuItems from '../components/PlateItems.vue';


export default {
  name: 'App',

  components: {
    MenuItems,
  },
}
</script>