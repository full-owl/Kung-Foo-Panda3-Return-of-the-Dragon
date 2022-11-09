<template>
    <div class="d-flex flex-wrap">

        <div :key="item.id" v-for="item in items">
            <li>
                <ButtonItem :item="item"/>
            </li>
        </div>
        
    </div>
    
</template>


<script>
import ButtonItem from './ButtonItem.vue';
export default {

    name:"ButtonTable",
    props: {
        items: Array
    },
    components: {
        ButtonItem
    },

}
</script>

<style scope>

    li {
        display: inline;
    }
    
</style>