<template>

    <div>

        <h1>Item Prices</h1>

        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div> 

        <CRUDTable title="Item Prices" endpoint="/mealsizes">
            <template v-slot:form>
                <form>
                    <div class="form-group">
                        <label>Food Type:</label>
                        <input class="form-control" type="msType" required v-model="msType">
                    </div>
                    <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" type="msName" required v-model="msName">
                    </div>
                    <div class="form-group">
                        <label>Price:</label>
                        <input class="form-control" type="msPrice" required v-model="msPrice">
                    </div>
                </form>
                <button type="button" class="btn btn-primary" @click="addms">Edit Price</button>
            </template>
        </CRUDTable>
        <footer><router-link to="../">Main Menu</router-link></footer>
    </div>
</template>

<script>
import CRUDTable from '../components/CRUDTable.vue';
import consts from '../consts.js'; 
export default {
    components: {
        CRUDTable,
    },
    data()
    {
        return {
            msType: '',
            msName: '',
            msPrice: 0
        }
    },
    methods: {
        async addms() {
            //fixed;
            let res = await fetch(`${consts.backend_url}/mealsizeitem/${this.msType}/${this.msName}/${this.msPrice}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    foodtype: this.msType,
                    name: this.msName,
                    price: this.msPrice,
                }),
            }); 
            // TODO: better error handling
            if(!res.ok) {
                console.error(res);
            }
            console.log(this.msName);
            this.msType = '';
            this.msName = '';
            this.msPrice = 0;
        }
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
    margin-top: 15px;
  }
</style>