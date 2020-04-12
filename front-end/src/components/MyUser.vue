<template>
<div class="main">
  <h1>Welcome to First Vision Accounts</h1>
  <h2>First Name: {{user.firstName}}</h2>
  <h2>Last Name: {{user.lastName}}</h2> 
  <h3>Logout: <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h3>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'MyUser',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
  async logout() {
    try {
      await axios.delete("/api/users");
      this.$root.$data.user = null;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  }

};
</script>
