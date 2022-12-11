<template>
  <div>
    <div class="container container-fluid">
      <div class="row">
        <h3 class="col">{{ title }}</h3>
        <v-dialog v-model="dialog" max-width="500">
          <template v-if="isCreate" v-slot:activator="{ props }">
            <button class="col btn btn-primary" v-bind="props">New Item</button>
          </template>
          <v-card :title="formTitle">
            <v-card-text>
              <slot name="form"/>
            </v-card-text>

            <v-card-actions>
              <button type="button" class="btn btn-secondary" @click="close">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="save">
                Save
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="250">
          <v-card title="Delete Row">
            <v-card-actions>
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeDelete"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="deleteItemConfirm"
              >
                Delete
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col" v-for="heading in headers" :key="heading.value">
            {{ heading }}
          </th>
          <th v-if="isUpdate || isDelete">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="heading in headers" :key="heading">{{ item[heading] }}</td>
          <td v-if="isUpdate || isDelete">
            <div class="btn-group">
              <button
                v-if="isUpdate"
                type="button"
                class="btn btn-primary"
                @click="editItem(item)"
              >
                Edit
              </button>
              <button
                v-if="isDelete"
                type="button"
                class="btn btn-primary"
                @click="deleteItem(item)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import consts from "../consts";

export default {
  props: {
    title: String,
    endpoint: String,
    crud: String,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return this.items[0] ? Object.keys(this.items[0]) : [];
    },
    isCreate() {
      return !this.crud || this.crud.includes('C');
    },
    isUpdate() {
      return !this.crud || this.crud.includes('U');
    },
    isDelete() {
      return !this.crud || this.crud.includes('D');
    },

  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      fetch(`${consts.backend_url}${this.endpoint}`)
        .then((response) => response.json())
        .then((data) => (this.items = data))
        .catch((error) => console.error(error));
      // this.$forceUpdate();
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.$emit("startUpdate", this.editedItem);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$emit("delete", this.editedItem);
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$nextTick(() => {
        this.initialize()
      });
    },

    close() {
      this.dialog = false;
      this.$emit("clearForm");
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      if (this.editedIndex === -1) {
        this.$emit("add", this.editedItem);
      } else {
        this.$emit("update", this.editedItem);
      } 
      this.close();
      this.$nextTick(() => {
        this.initialize()
      });
    },
  },
};
</script>