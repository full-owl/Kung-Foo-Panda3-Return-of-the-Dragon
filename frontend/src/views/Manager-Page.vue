<template>
    <div>
        <h1>Inventory</h1>
        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div>

        <CRUDTable title="Manager" endpoint="/inventory" @clearForm="clearForm" @add="addIng" @startUpdate="startUpdateIng" @update="updateIng" @delete="deleteIng">
            <template v-slot:form>
                <form>
                    <div class="form-group">
                        <label>Ingredient Name:</label>
                        <input class="form-control" required v-model="item.ingredient">
                    </div>
                    <div class="form-group">
                        <label>Ingredient Unit:</label>
                        <input class="form-control" required v-model="item.unit">
                    </div>
                    <div class="form-group">
                        <label>Ingredient Amount:</label>
                        <input class="form-control" required v-model="item.currentamount">
                    </div>
                </form>
                <!-- <button type="button" class="btn btn-primary" @click="addIng">Add Ingredient</button> -->
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
            item: {
                ingredient: 'Untitled',
                unit: 'Untitled',
                currentamount: 0,
            }
        }
    },
    methods: {
        clearForm() {
            this.item = {
                ingredient: 'Untitled',
                unit: 'Untitled',
                currentamount: 0,
            }
        },
        async addIng() {
            if(this.item.ingredient != '' && this.item.unit != '' && this.item.currentamount >= 0)
            {
                console.log("clicked", this.item);
                let res = await fetch(`${consts.backend_url}/inventoryitem/${this.item.ingredient}/${this.item.unit}/${this.item.currentamount}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        ingredient: this.item.ingredient,
                        unit: this.item.unit,
                        currentamount: this.item.currentamount,
                    }),
                }); 
                if(!res.ok) {
                    console.error(res);
                }
                console.log(this.ingredient);
                this.clearForm();
                this.$router.go();
            }
        },
        startUpdateIng(item) {
            this.item = item;
        },
        async updateIng(item) {
            let res = await fetch(`${consts.backend_url}/inventoryitem/${item.id}/amount=${item.currentamount}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
            });
            if(!res.ok) {
                console.error(res);
            }
            this.clearForm();
            this.$router.go();
        },
        async deleteIng(item) {
            let res = await fetch(`${consts.backend_url}/inventoryitem/${item.ingredient}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });
            if(!res.ok) {
                console.error(res);
            }
            this.clearForm();
            this.$router.go();
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
    margin-top: 15px;
  }
</style>