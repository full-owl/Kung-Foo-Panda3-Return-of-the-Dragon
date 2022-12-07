<template>
    <form @submit.prevent="handleSubmit" class="row g-3">
        <label class="col-md-6">Name: <input type="text" class="form-control" v-model="data.name" /></label>
        <label class="col-md-6">Food type:
            <select class="form-select" v-model="data.foodType">
                <option value="" selected>Choose food type</option>
                <option v-for="food in foodTypes" :key="food">{{ food }}</option>
            </select>
        </label>
        <label>Description: <textarea class="form-control" v-model="data.description" /></label>
        <label class="col-md-9">Add Ingredient:
            <select v-model="selectedIngredient" class="form-select">
                <option :value="null" selected>Choose an ingredient</option>
                <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient">{{ ingredient.ingredient }}</option>
            </select>
        </label>
        <div class="col-md-1">
            <button type="button" class="btn btn-secondary" @click="addIngredient">Add ingredient</button>
        </div>
        <div>
            <label v-for="(x, index) in data.selectedIngredients" :key="x.id">{{ x.ingredient }}
                <input v-model.number="data.selectedIngredients[index].porportion" type="number" class="form-control" min="0.1" max="1" step="0.1" />
            </label>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="data.selectedIngredients.length == 0">Add</button>
    </form>
</template>

<script>
import consts from '../consts';

export default {
    data() {
        return {
            foodTypes: ["entree", "appetizer", "drink", "side"],
            ingredients: [],
            selectedIngredient: null,
            data: {
                name: "",
                foodType: "",
                description: "",
                selectedIngredients: [],
            },
        }
    },
    mounted() {
        fetch(`${consts.backend_url}/inventory`)
        .then(response => response.json())
        .then(data => (this.ingredients = data))
        .catch(error => console.error(error));
    },
    methods: {
        addIngredient() {
            // console.log(this.selectedIngredients);
            if(this.selectedIngredient && !this.data.selectedIngredients.includes(this.selectedIngredient)) {
                this.data.selectedIngredients.push(this.selectedIngredient);
            } else {
                console.error("Invalid selected ingredient", this.selectedIngredient);
            }
        },
        handleSubmit() {
            // TODO: error handling, and connecting to backend
            console.error("handeled");
        }
    }
}
</script>