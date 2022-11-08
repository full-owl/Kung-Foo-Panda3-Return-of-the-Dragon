<template>
    <div class="d-flex flex-wrap">

        <div :key="item.id" v-for="item in items">
            <ButtonItem :item="item"/>
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
/**
    .btn {
        background-color:blueviolet;
        border-color: blueviolet;
    }
    **/
</style>