<template>
    <form class="row g-3">
        <label class="col-md-6">Name: <input type="text" class="form-control" placeholder="name" /></label>
        <label class="col-md-6">Food type:
            <select class="form-select">
                <option selected>Choose food type</option>
                <option v-for="food in foodTypes" :key="food">{{ food }}</option>
            </select>
        </label>
        <label>Description: <textarea class="form-control" /></label>
        TODO: add ingredient list
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            foodTypes: ["entree", "appetizer", "drink", "side"],
        }
    },
}
</script>