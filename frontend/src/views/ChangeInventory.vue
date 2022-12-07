<template>
    <div>
        <h1>Add to Inventory</h1>
        <form>
            <label>Ingredient Name:</label>
            <input type="ingName" required v-model="name">
            <label>Ingredient Unit:</label>
            <input type="ingUnit" required v-model="ingUnit">
            <label>Ingredient Amount:</label>
            <input type="ingAmt" required v-model="ingAmt">
        </form>
        <p>ing: {{name}} un: {{ingUnit}} amt: {{ingAmt}}</p>
        <button type="button" class="btn btn-primary" @click="addIng">Add Ingredient</button>
    </div>
</template>

<script>
import consts from '../consts.js'; 
export default {
    data()
    {
        return {
            name: '',
            ingUnit: '',
            ingAmt: 0,
        }
    },
    methods: {
        async addIng() {
            //console.log("clicked");
            let res = await fetch(`${consts.backend_url}/inventoryitem/${this.name}/${this.ingUnit}/${this.ingAmt}`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    ingredient: this.name,
                    unit: this.ingUnit,
                    amount: this.ingAmt,
                }),
            }); 
            // TODO: better error handling
            if(!res.ok) {
                console.error(res);
            }
            console.log(this.name);
            this.name = '';
            this.ingUnit = '';
            this.ingAmt = 0;
        }
    }
}
</script>