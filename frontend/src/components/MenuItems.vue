<template>
    <div class="foodList">
        <div>
            <h2>Type</h2>
            <li v-for="item in Types" :key="item.name">
            <button type="button" class="btn btn-secondary" @click="addType(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Side</h2>
            <li v-for="item in Sides" :key="item.name">
            <button type="button" class="btn btn-secondary" @click="addSide(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Entree</h2>
            <li v-for="item in Entrees" :key="item.name">
            <button type="button" class="btn btn-secondary" @click="addEntree(item.name)">{{ item.name }}</button>
            </li>
        </div>
        <div>
            <h2>Drinks</h2>
            <li v-for="item in Drinks" :key="item.name">
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
    <RecieptTable :propOrderType="OrderType"/>
</template>

<script>
import RecieptTable from './RecieptTable.vue'
export default {
    components: {
        RecieptTable
    },
    data() {
        return {
            Types: [
            {
                name: "Bowl",
            },
            {
                name: "Plate",
            }
            ],

            Sides: [
            {
                name: "Fried Rice",
            },
            {
                name: "Chow Mein",
            }
            ],

            Entrees: [
            {
                name: "Orange Chicken",
            },
            {
                name: "Beijing Beef",
            }
            ],

            Drinks: [
            {
                name: "Coca Cola",
            },
            {
                name: "Sprite",
            }
            ],

            OrderType : "TBA",
            OrderItems: [],
            OrderPrice: 5.03
        }
    },

    methods: {
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