<template>
  <div class="container-fluid" id="app">
    <div style="display:flex; align-items: center; justify-content: center;">
      <div class="col-md-4">
        <form class="form-inline">
          <div class="form-group">
            <label for="search" style="margin-right: 10px;">Search</label>
            <input type="text" id="search" class="form-control" v-model="searchKey"/>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
        <address-book style="margin-top: 20px;"
          :search-key="searchKey"
          :edited-note="editedNote"
          :added-note="addedNote"
          @show-modal="showModal($event)"
          @edit-modal="editModal($event)"
          @add-modal="addModal"
        ></address-book>
      <modal-view
        :active.sync="active"
        :data="dataForModal"
        :mode="modalMode"
        @edited="setEditedNote($event)"
        @added="setAddedNote($event)"
      ></modal-view>
    </div>
  </div>
</template>

<script>
import AddressBook from './components/address-book';
import ModalView from './components/modal-view';

export default {
  name: 'App',

  components: {
    'address-book': AddressBook,
    'modal-view': ModalView,
  },

  data() {
    return {
      searchKey: '',
      active: false,
      dataForModal: {},
      modalMode: 'show',
      editedNote: {},
      addedNote: {},
    };
  },

  methods: {
    showModal(event) {
      this.modalMode = 'show';
      this.active = true;
      this.dataForModal = event;
    },

    editModal(event) {
      this.modalMode = 'edit';
      this.active = true;
      this.dataForModal = event;
    },

    addModal() {
      this.modalMode = 'add';
      this.active = true;
    },

    setEditedNote(event) {
      this.editedNote = {...event};
    },

    setAddedNote(event) {
      this.addedNote = {...event};
    }
  },
};
</script>

<style>
 html {
   font-size: 62.5%,
 }

 body {
   font-size: 1.6rem
 }
</style>
