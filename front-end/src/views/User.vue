<template>
<div class="dashboard">
  <h1>Welcome to First Vision Accounts</h1>
  <MyUser v-if="user" />
  <Login v-else />
</div>
</template>
<script>
import MyUser from '@/components/MyUser.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    MyUser,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
<style scoped>
.dashboard {
  padding-top: 10px;
  padding: 10px;
}
</style>
