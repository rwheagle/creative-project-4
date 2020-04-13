<template>
<div class="edit">
  <button class="pure-button pure-button-primary" @click='edit'>Edit</button>
  <div class="form" v-if="editClicked">
    <textarea v-model="editedComment.text"></textarea>
    <button class="pure-button pure-button-primary" @click='editComment(comment)'>Save</button>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Edit',
  props: {
    comment: Object
  },
  data() {
  return {
    editClicked: false,
    editedComment:{
      text:this.comment.text
    }
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async editComment(comment) {
      try {
        await axios.put("/api/comments/" + comment.year + "/" + comment._id, {
          text: this.editedComment.text
        });
        this.$emit('click');
        this.editClicked = false;
      } catch (error) {
        console.log(error);
      }
    },
    edit() {
      this.editClicked = !this.editClicked;
    }
  }
}
</script>
<style scoped>
.edit{
  margin: 10px;
}
.form{
  margin-top:10px;
  display: flex;
  justify-content: center;
}
.form textarea{
  width: 50%;
  margin: 10px;
}
.form button{
  margin: 10px;
}
</style>
