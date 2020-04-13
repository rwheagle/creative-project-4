<template>
<div class="main">
  <h3>Comments:</h3>
  <div class="comments">
    <div class="comment" v-for="comment in comments" :key=" comment.id">
      <p>{{comment.text}}</p>
      <p>{{comment.user.firstName}} {{comment.user.lastName}} - {{myTime(comment.created)}}</p>
      <button class="pure-button pure-button-primary" @click='deleteComment(comment)' v-if='user && (user.role=="admin" || user._id == comment.user._id)'>Delete</button>
      <Edit @click="getComments" :comment="comment" v-if="user && comment.user._id==user._id"/>
    </div>
  </div>
  <div class="addcomment" v-if="user">
    <h2>Add Comment:</h2>
    <form v-on:submit.prevent="addComment()">
      <div class="inputBoxes">
        <textarea v-model="text"></textarea>
      </div>
      <br />
      <button class="pure-button pure-button-primary" type="submit">Comment</button>
    </form>
  </div>
</div>
</template>
<script>
import Edit from '@/components/Edit.vue'
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'CommentsView',
  components: {
    Edit
  },
  props: {
    year: String,
    id: String
  },
  data() {
    return {
      comments: [],
      text: ""
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  watch: {
    year: function() {
      this.getComments();
    }
  },
  async created() {
    this.getComments();
  },
  methods: {
    myTime(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async addComment() {
      try {
        await axios.post("/api/comments/" + this.year, {
          text: this.text,
          user: this.user
        });
        this.text = "";
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        const response = await axios.get("/api/comments/" + this.year);
        console.log(response.data)
        this.comments = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment) {
      try {
        await axios.delete("/api/comments/" + this.year + "/" + comment._id);
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
<style scoped>
.inputBoxes {
  display: flex;
  margin: auto;
  justify-content: center;
  align: center;
  width: 80%;
}

.inputBoxes textarea {
  width: 80%;
  height: 100px;
  margin: 10px;
}

.comments {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.comment {
  background-color: #deeff5;
  border: 2px black solid;
  margin: 10px;
  padding: 10px;
}
</style>
