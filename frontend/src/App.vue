<template>

  <router-view></router-view>

</template>

<script>
  export default {
  name: 'App',  
  components: {
    // FooterComp,
  },
}
</script>





<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: white;
  font-family: 'Poppins', sans-serif;
}

footer{
  background-color: #B30000;
  position: fixed;
  bottom: 0;
  width:100%;
  text-align: center;
  align-content: center;
  height: 60px;
  padding: 20px;
  

}
footer a{
  color:white;
  text-decoration-color: white;
}
</style>