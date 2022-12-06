<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="heading in headers" :key="heading.value">
            {{ heading }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="heading in headers" :key="heading">{{ item[heading] }}</td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary"
                @click="editItem(item)"
              >
                Edit
              </button>
              <button
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
    <v-dialog v-model="dialogDelete" max-width="250">
      <v-card title="Delete Row">
        <v-card-actions>
          <button type="button" class="btn btn-secondary" @click="closeDelete">
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
</template>

<script>
import consts from "../consts";

export default {
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
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      fetch(`${consts.backend_url}/inventory`)
        .then((response) => response.json())
        .then((data) => (this.items = data))
        .catch((error) => console.error(error));
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
      this.close();
    },
  },
};
</script>