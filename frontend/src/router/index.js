import { createRouter, createWebHistory } from 'vue-router'
import Manager from '../views/Manager-Page.vue'
import Home from '../views/Home-Page.vue'
import Cashier from '../views/Cashier-Page.vue'


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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,     
})

export default router