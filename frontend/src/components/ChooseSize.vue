<template>
  <div class="modal text-center">
    <v-dialog
        class="modal-dialog"
        max-width="500"
      v-model="dialog"
    >
      <v-card class="modal-content" :title="'Choose Size for ' + item.name">
        <v-card-text>
          <!-- TODO: style like bootstrap -->
          <v-btn-toggle v-model="selected" shaped mandatory>
            <v-btn v-for="size in sizes" :key="size.name">
              {{ size.name }}
            </v-btn>
          </v-btn-toggle>
        </v-card-text>
        <v-card-actions>
          <button type="button" class="btn btn-secondary" @click="dialog = false">Cancel</button>
          <button type="button" class="btn btn-primary" @click="addOrderToReciept">Add</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import consts from '../consts.js';

export default {
    props: {
      receiptTable: Object,
    },
    data() {
        return {
            dialog: false,
            sizes: [],
            item: {},
            selected: 0,
            mealsizes: {},
        }
    },
    async created() {
      // Get sizes from backend
      const res = await fetch(`${consts.backend_url}/mealsizes`);
      const mealsizes = await res.json();
      this.mealsizes = mealsizes.reduce((group,mealsize) => {
        console.log(mealsize);
        if(mealsize.foodtype == 'combo') {
          return group;
        }
        if(["small","medium","large"].includes(mealsize.name)) {
          group[mealsize.foodtype] = group[mealsize.foodtype] ?? [];
          group[mealsize.foodtype].push(mealsize);
        }
        return group;
      }, {}); 
    },
    methods: {
        show(item) {
          this.item = item;
          this.sizes = this.mealsizes[item.foodtype];
          this.dialog = true;
          return this.dialog;
        },
        addOrderToReciept() {
          this.dialog = false;
          let type = this.sizes[this.selected];
          this.$emit('addOrder', type, this.item);
        }
    }
}
</script>

<style scoped>
    .btn {
        border-radius: 0%;
        border-color: aliceblue;
        color: aliceblue;
    }
</style>