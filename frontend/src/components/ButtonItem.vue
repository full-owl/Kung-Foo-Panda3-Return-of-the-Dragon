<template>
    <button type="button" class="btn btn-primary">{{item.name}}</button>
</template>

<script>
    export default {
        name: "ButtonItem",
        props: {
            item: Object
        }
    }
</script>