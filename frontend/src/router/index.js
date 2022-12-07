import { createRouter, createWebHistory } from 'vue-router'
import Manager from '../views/Manager-Page.vue'
import Home from '../views/Home-Page.vue'
import Cashier from '../views/Cashier-Page.vue'
import Prices from '../views/Prices-Page.vue'
import MenuItems from '../views/Menu-Items.vue';

import UserMenu from '../views/Customer-Page.vue'
import Bigger from '../views/Customer-Bigger-Page.vue'
import Plate from '../views/Customer-Plate-Page.vue'
import Bowl from '../views/Customer-Bowl-Page.vue'
import Appetizer from '../views/Customer-Appetizer-Page.vue'
import Alacarte from '../views/Customer-Alacarte-Page.vue'
import Drinks from '../views/Customer-Drinks-Page.vue'


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
    {
        path: '/usermenu',
        name: 'UserMenu',
        component: UserMenu,
    },
    {
        path: '/bigger',
        name: 'Bigger',
        component: Bigger,
    },
    {
        path: '/plate',
        name: 'Plate',
        component: Plate,
    },
    {
        path: '/bowl',
        name: 'Bowl',
        component: Bowl,
    },
    {
        path: '/appetizer',
        name: 'Appetizer',
        component: Appetizer,
    },
    {
        path: '/alacarte',
        name: 'Alacarte',
        component: Alacarte,
    },
    {
        path: '/drinks',
        name: 'Drinks',
        component: Drinks,
    },
    {
        path: '/menu-items',
        name: 'Menu Items',
        component: MenuItems,
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,     
})

export default router