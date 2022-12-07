<template>
    <div>
        <h1>Inventory</h1>
        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div>

        <CRUDTable title="Manager" endpoint="/inventory">
            <template v-slot:form>
                <!-- TODO: inventory form -->
            </template>
        </CRUDTable>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
    
</template>

<script>
import CRUDTable from '../components/CRUDTable.vue';

export default {
    components: {
        CRUDTable,
    },
}
</script>

<style scoped>
.navButtons {
    z-index: 1;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: red;
}
.navButtons a {
    display: inline-block;
    padding: 10px 30px;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 2px solid white;
    background-color: red;
    color: white;
    text-decoration: none;
    font-size: 10px;
}

.navButtons a:hover {
    color:red;
    background-color: white;
    border: 2px solid red;
    /* opacity: 0.3; */
}
 
footer {
  position: relative;
}
</style>