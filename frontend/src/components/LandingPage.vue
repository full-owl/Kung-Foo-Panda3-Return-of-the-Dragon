<template>
    <div>
        <div class="logo"></div>
        <div class="navButtons">
            <router-link to="/cashier">Cashier</router-link>
            <router-link to="/manager">Manager</router-link>
        </div>
    </div>
    
</template>

<script>

export default{
    name: 'LandingPage',

    components: {
        
    }
}
</script>

<style scoped>

.logo {
  background: white;
  background-image: url('./img/panda-logo.png');
  background-size: cover;
  max-width: 550px;
  margin: 30px auto;
  min-height: 310px;
  border: 4px solid white;
  padding: 5px;
  border-radius: 5px;
}

.navButtons {
    z-index: 1;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: rgb(255, 255, 255);
}
.navButtons a {
    display: inline-block;
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

.navButtons a:hover {
    color:red;
    background-color: white;
    border: 2px solid red;
    /* opacity: 0.3; */
}
</style>
