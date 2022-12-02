<template>
    <div>
        <UserMenuItems/>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
</template>

<script>
import UserMenuItems from '../components/UserMenuItems.vue';


export default {
  name: 'App',

  components: {
    UserMenuItems,
  },
}
</script>