<template>
    <div>
        <div class="revenue">
            <h2>Today's Revenue: ${{this.sales_today}}</h2>
            <h2>Last 7 Days' Revenue: ${{this.sales_last}}</h2>
        </div>
        <h1>Menu Items</h1>
        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div>

        <CRUDTable title="Menu Items" crud="C" endpoint="/menuitems" @delete="deleteItem">
            <template v-slot:form>
                <menu-items-form />
            </template>
        </CRUDTable>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
    
</template>

<script>
import consts from "../consts";
import CRUDTable from '../components/CRUDTable.vue';
import MenuItemsForm from '../components/MenuItemsForm.vue';

export default {
    components: {
        CRUDTable,
        MenuItemsForm,
    },
    data() {
        return {
            sales_today: 0.00,
            sales_last: 0.00,
        }
    },
    methods: {
        async deleteItem(item) {
            let res = await fetch(`${consts.backend_url}/menuitem/${item.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }).catch(err => console.error(err));
            console.log(res);

        }
    },
    async mounted() {
        this.sales_today = await fetch(`${consts.backend_url}/salestoday`).then(data => data.json());
        this.sales_last =  await fetch(`${consts.backend_url}/sales`).then(data => data.json());
    }
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
    background-color: #B30000;
}
.navButtons a {
    display: inline-block;
    padding: 10px 30px;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 2px solid white;
    background-color: #B30000;
    color: white;
    text-decoration: none;
    font-size: 10px;
}

.navButtons a:hover {
    color:#B30000;
    background-color: white;
    border: 2px solid #B30000;
    /* opacity: 0.3; */
}
 
footer {
  position: relative;
}
</style>

<style>
.revenue {
    color: green;
}
</style>