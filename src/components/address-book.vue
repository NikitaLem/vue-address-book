<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">Username</th>
        <th class="text-center">Phone number</th>
        <th class="text-center">Address</th>
        <th class="text-center">Actions
          <button type="button" style="margin-left: 15px;" class="btn btn-success"
            @click="intentAdd"
          >Add</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in addressBookData" :key="index">
        <td style="vertical-align: middle;" class="text-center">
          {{ item.username }}
        </td>
        <td style="vertical-align: middle;" class="text-center">
          {{ item.phoneNumber }}
        </td>
        <td style="vertical-align: middle;" class="text-center">
          {{ item.address }}
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-primary" @click="showNote(item)">Show</button>
          <button type="button" class="btn btn-success" @click="editNote(item)">Edit</button>
          <button type="button" class="btn btn-danger"
            @click="sendNote('/deleteData', {username: item.username})"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'AddressBook',

  props: {
    addressBookData: {
      type: Array,
      default: () => [],
    },

    searchKey: {
      type: String,
      default: '',
    },

    editedNote: {
      type: Object,
      default: () => ({}),
    },

    addedNote: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getParams() {
      return this.searchKey === '' ? '' : `?searchKey=${this.searchKey}`;
    },
  },

  watch: {
    searchKey() {
      this.getData();
    },

    editedNote() {
      this.sendNote('/editData', {
        username: this.editedNote.username,
        phoneNumber: this.editedNote.phoneNumber,
        address: this.editedNote.address,
      });
    },

    addedNote() {
      this.sendNote('/addData', {
        username: this.addedNote.username,
        phoneNumber: this.addedNote.phoneNumber,
        address: this.addedNote.address,
      })
    },
  },

  methods: {
    getData() {
      fetch(`http://localhost:3000/getData${this.getParams}`)
        .then(responce => responce.json())
        .then(data => { this.addressBookData = data; });
    },

    sendNote(route, obj) {
      fetch(`http://localhost:3000${route}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
      })
        .then(responce => responce.json())
        .then(data => { this.addressBookData = data; });
    },

    showNote(item) {
      this.$emit('show-modal', item);
    },

    editNote(item) {
      this.$emit('edit-modal', item);
    },

    intentAdd() {
      this.$emit('add-modal');
    }
  },

  mounted() {
    this.getData();
  },
}
</script>
