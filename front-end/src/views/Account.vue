<template>
<div class="home">
  <div class="links">
    <AccountView :id='year'/>
    <CommentsView :year='year'/>
  </div>
</div>
</template>
<script>
import AccountView from "../components/AccountView.vue"
import CommentsView from "../components/CommentsView.vue"
import axios from 'axios'
export default {
  name: 'Account',
  components: {
     AccountView,
     CommentsView
  },
  async created(){
  try {
    let response = await axios.get('/api/users');
    this.$root.$data.user = response.data.user;
  } catch (error) {
    this.$root.$data.user = null;
  }
  },
  computed: {
     year() {
      return this.$route.params.id;
    }
  },
}
</script>
<style scoped>
.home {}
.links {}
</style>
