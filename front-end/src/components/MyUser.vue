<template>
<div class="main">
  <div class="user">
  <h2>First Name: {{user.firstName}}</h2>
  <h2>Last Name: {{user.lastName}}</h2>
  <h2>Username: {{user.username}}</h2>
  </div>
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
<style scoped>
.main{
  align-content: center;
}
.user{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #b5dce9;
  width: 80%;
  margin: auto;
  padding: 1%;
  border: 2px black solid;
}
.user h2{
  margin: 2%;
}
</style>
