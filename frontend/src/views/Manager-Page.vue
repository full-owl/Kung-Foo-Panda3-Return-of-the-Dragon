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
                <form>
                    <div class="form-group">
                        <label>Ingredient Name:</label>
                        <input class="form-control" type="ingName" required v-model="ingName">
                    </div>
                    <div class="form-group">
                        <label>Ingredient Unit:</label>
                        <input class="form-control" type="ingUnit" required v-model="ingUnit">
                    </div>
                    <div class="form-group">
                        <label>Ingredient Amount:</label>
                        <input class="form-control" type="ingAmt" required v-model="ingAmt">
                    </div>
                </form>
                <button type="button" class="btn btn-primary" @click="addIng">Add Ingredient</button>
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
            ingName: '',
            ingUnit: '',
            ingAmt: 0,
        }
    },
    methods: {
        async addIng() {
            //console.log("clicked");
            let res = await fetch(`${consts.backend_url}/inventoryitem/${this.ingName}/${this.ingUnit}/${this.ingAmt}`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    ingredient: this.ingName,
                    unit: this.ingUnit,
                    amount: this.ingAmt,
                }),
            }); 
            // TODO: better error handling
            if(!res.ok) {
                console.error(res);
            }
            console.log(this.name);
            this.ingName = '';
            this.ingUnit = '';
            this.ingAmt = 0;
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