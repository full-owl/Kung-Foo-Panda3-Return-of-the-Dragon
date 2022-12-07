<template>

  <div>

    <!-- <div class="grid-container">

    <router-link to="/bowl">
    <div class="card">
      <img :src="require('./img/bowl.png')"/>
      <div class="card-text">
        <h4><b>Bowl</b></h4> 
        <p>1 side & 1 entree</p> 
      </div>
    </div>
  </router-link>

  <router-link to="/plate">
    <div class="card">
      <img :src="require('./img/plate.png')"/>
      <div class="card-text">
        <h4><b>Plate</b></h4> 
        <p>1 side & 2 entrees</p> 
      </div>
    </div>
  </router-link>

  <router-link to="/bigger">
    <div class="card">
      <img :src="require('./img/bigger-plate.png')"/>
      <div class="card-text">
        <h4><b>Bigger Plate</b></h4> 
        <p>1 side & 3 entrees</p> 
      </div>
    </div>
  </router-link>

  <router-link to="/alacarte">
    <div class="card">
      <img :src="require('./img/alacarte.png')"/>
      <div class="card-text">
        <h4><b>A La Carte</b></h4> 
        <p>Individual Items</p> 
      </div>
    </div>
  </router-link>

  <router-link to="/appetizer">
    <div class="card">
      <img :src="require('./img/appetizer.png')"/>
      <div class="card-text">
        <h4><b>Appetizers</b></h4> 
        <p>Extras</p> 
      </div>
    </div>
  </router-link>

  <router-link to="/bigger">
    <div class="card">
      <img :src="require('./img/drinks.png')"/>
      <div class="card-text">
        <h4><b>Drinks</b></h4> 
        <p>Add a Refreshing Beverage</p> 
      </div>
    </div>
  </router-link>
  
  </div> -->

    <UserMenuItems></UserMenuItems>
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

<style scoped>
.headerBreak {
  background-color: red;
  width: 100%;
  height: 36px;
}
.grid-container{
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.card img{
  width: 60%;
}
.card {
  background-color:red;
  color:white;
  margin: 20px;
  width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

a {
  text-decoration: none;
}

.card:hover {
  background-color:white;
  border-color: red;
  color:red;
  margin: 20px;
  width: 500px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.card-text {
  padding: 2px 16px;
}
.container{
  margin-right: 50%;
    justify-content: center;
    align-items: center;
}
.menuRow {
    margin-top: 10%;
    flex-direction: row;
    display: inline-flex;
    background-color: red;
    padding: 50px;
}
.menuItem a {
  top: 50%;
  padding: 10px 30px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 2px solid white;
  background-color: red;
  color: white;
  text-decoration: none;
  font-size: 30px;
}

.menuItem a:hover {
    color:red;
    background-color: white;
    border: 2px solid red;
    /* opacity: 0.3; */
}
</style>