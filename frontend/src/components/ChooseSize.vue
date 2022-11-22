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
            <v-btn v-for="size in sizes" :key="size">
              {{ size }}
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
export default {
    props: {
      receiptTable: Object,
    },
    data() {
        return {
            dialog: false,
            sizes: ["small", "medium", "large"],
            item: {},
            selected: 0,
        }
    },
    async created() {
      // TODO: get sizes from backend
    },
    methods: {
        show(item, sizes) {
          this.item = item;
          this.sizes = sizes;
          this.dialog = true;
          return this.dialog;
        },
        addOrderToReciept() {
          this.dialog = false;
          // let type = types[item.foodtype][{}; // TODO: look up size info
          let type = null;
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