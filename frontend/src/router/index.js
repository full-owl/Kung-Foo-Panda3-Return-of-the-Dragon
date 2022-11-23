import { createRouter, createWebHistory } from 'vue-router'
import Manager from '../views/Manager-Page.vue'
import Home from '../views/Home-Page.vue'
import Cashier from '../views/Cashier-Page.vue'
import Prices from '../views/Prices-Page.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager,
    },
    {
        path: '/cashier',
        name: 'Cashier',
        component: Cashier,
    },
    {
        path: '/prices',
        name: 'Prices',
        component: Prices,
    },
    // {
    //     path: '/menu',
    //     name: 'Menu',
    //     component: Menu,
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,     
})

export default router