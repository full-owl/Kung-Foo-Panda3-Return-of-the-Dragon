<template>
    <div>
        <div class="logo"></div>
        <div class="navButtons">
            <router-link to="/usermenu">User</router-link>
            <router-link to="/cashier">Cashier</router-link>
            <router-link to="/manager">Manager</router-link>
        </div>
        <div class ="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.770986512828!2d-96.3435775849168!3d30.612222181679375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86468398ef48705d%3A0xb75709775b0df8b1!2sPanda%20Express%20-%20MSC!5e0!3m2!1sen!2sus!4v1670015412837!5m2!1sen!2sus" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> 
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

.map {
    margin:auto;
    align-content: center;

}
</style>
