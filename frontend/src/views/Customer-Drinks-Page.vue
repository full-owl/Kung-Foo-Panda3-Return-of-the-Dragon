<template>
    <div>
        <MenuItems/>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
</template>

<script>
import MenuItems from '../components/MenuItems.vue';


export default {
  name: 'App',

  components: {
    MenuItems,
  },
}
</script>