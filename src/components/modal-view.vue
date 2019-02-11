<template>
  <div v-if="active" class="my-modal" @click.self="$emit('update:active', false)">
    <div class="container">
      <div class="panel panel-default">
        <div v-if="mode === 'show'" class="panel-body">
          <h3>{{ `Username: ${data.username}` }}</h3>
          <p>{{ `Phone number: ${data.phoneNumber}` }}</p>
          <p>{{ `Address: ${data.address}` }}</p>
        </div>
        <div v-if="mode === 'edit'" class="panel-body">
          <h3>{{ `Username: ${data.username}` }}</h3>
          <p>Phone number: <input type="text" v-model="phoneNumber"/></p>
          <p>Address: <input type="text" v-model="address"/></p>
          <button type="button" class="btn btn-info btn-lg" @click="acceptEdit">Accept</button>
        </div>
        <div v-if="mode === 'add'" class="panel-body">
          <h3>Username: <input type="text" v-model="username"/></h3>
          <p>Phone number: <input type="text" v-model="phoneNumber"/></p>
          <p>Address: <input type="text" v-model="address"/></p>
          <button type="button" class="btn btn-info btn-lg" @click="acceptAdd">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal-view',

  props: {
    active: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Object,
      default: () => ({}),
    },

    mode: {
      type: String,
      default: 'show',
    },
  },

  data() {
    return {
      username: '',
      address: '',
      phoneNumber: '',
    }
  },

  methods: {
    acceptEdit() {
      this.$emit('edited', {
        username: this.data.username,
        phoneNumber: this.phoneNumber,
        address: this.address,
      });
      this.$emit('update:active', false);
    },

    acceptAdd() {
      this.$emit('added', {
        username: this.username,
        phoneNumber: this.phoneNumber,
        address: this.address,
      });
      this.$emit('update:active', false);
    },
  },
}
</script>
<style>
  .my-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: rgba(61, 61, 61, 0.7);
  }
</style>
