<template>
    <!-- <p>Entrees</p>
    <ButtonTable :items="entrees"/>
    <br>
    <p>Sides</p>
    <ButtonTable :items="sides"/>
    <br>
    <p>Appetizers</p>
    <ButtonTable :items="appetizers"/>
    <br>
    <p>Drinks</p>
    <ButtonTable :items="drinks"/>
    <br> -->
    <div class="foodList">
        <div>
            <h2>Type</h2>
            <li v-for="item in sides" :key="item.id">
            <button type="button" class="btn btn-secondary" @click="addType(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Side</h2>
            <li v-for="item in entrees" :key="item.id">
            <button type="button" class="btn btn-secondary" @click="addSide(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Entree</h2>
            <li v-for="item in appetizers" :key="item.id">
            <button type="button" class="btn btn-secondary" @click="addEntree(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Drinks</h2>
            <li v-for="item in drinks" :key="item.id">
            <button type="button" class="btn btn-secondary" @click="addDrink(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h1>{{OrderType}}</h1>
            <li v-for="item in OrderItems" :key="item">
            <h1>{{item}}</h1>
            </li>
        </div>
    </div>
    <RecieptTable :propOrderType="OrderType" :propOrderItems="OrderItems" :propOrderPrice="OrderPrice"/>
</template>

<script>
//import ButtonTable from './ButtonTable.vue';
import RecieptTable from './RecieptTable.vue';
import consts from '../consts.js';

export default {
    components: {
        RecieptTable,
        //ButtonTable
    },
    data() {
        return {
            sides:[],
            entrees: [],
            appetizers: [],
            drinks:[],
            OrderType : "TBA",
            OrderItems: [],
            OrderPrice: 5.03
        }
    },

    methods: {
        async fetchItems(foodtype) {
        // connection from backend folder.. made need to change port if doing on web hosting
        const res = await fetch(`${consts.backend_url}/items/${foodtype}`);

        const data = await res.json();
        return data;
        },

        addType(type) {
            this.OrderType = type;
        },
        
        addSide(side) {
            this.OrderItems.push(side);
        },

        addEntree(entree) {
            this.OrderItems.push(entree);
        },

        addDrink(drink) {
            this.OrderItems.push(drink);
        },
    },
    
    async created() {
        this.entrees = await this.fetchItems("entree");
        this.appetizers = await this.fetchItems("appetizer");
        this.drinks = await this.fetchItems("drink");
        this.sides = await this.fetchItems("side");
    }
}
</script>

<style scoped>
    li {
        display: inline;
        margin: 10px;
    }

    .foodList {
        margin-bottom: 10px;
    }
</style>