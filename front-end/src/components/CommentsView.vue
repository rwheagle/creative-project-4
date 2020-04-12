<template>
<div class="main">
  <h3>Comments:</h3>
  <div class="comments">
    <div class="comment" v-for="comment in comments" :key=" comment.id">
      <p>{{comment.text}}</p>
      <p>{{comment.user.firstName}} {{comment.user.lastName}} - {{myTime(comment.created)}}</p>
      <button @click='deleteComment(comment)' v-if='user.role=="admin"'>Delete</button>
    </div>
  </div>
  <div class="addcomment" v-if="user">
    <h2>Add Comment:</h2>
    <form v-on:submit.prevent="addComment()">
      <div class="inputBoxes">
        <textarea v-model="text"></textarea>
      </div>
      <br />
      <button type="submit">Comment</button>
    </form>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'CommentsView',
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
  watch:{
    year: function(){
      this.getComments();
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
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

}
</style>
<!--template>
<div class="main">
  <h3>Comments:</h3>
  <div class="comments">
    <div class="comment" v-for="comment in comments" :key=" comment.id">
      <p>{{comment.text}}</p>
      <p>{{comment.name}} - {{myTime(comment.date)}}</p>
      <button @click="deleteComment(comment)">Delete Comment</button>
    </div>
  </div>
  <div class="addcomment">
    <h2>Add Comment:</h2>
    <form v-on:submit.prevent="addComment">
      <div class="inputBoxes">
        <input placeholder="Name" v-model="name" />
        <div margin="10px" />
        <textarea v-model="text"></textarea>
      </div>
      <br />
      <button type="submit">Comment</button>
    </form>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'CommentsView',
  props: {
    year: String
  },
  data() {
    return {
      comments: [],
      name: "",
      text: "",
      date: new Date()

    };
  },
  watch: {
    year: function() {
      this.getComments();
    },
  },
  methods: {
    myTime(date) {
      return moment(date).format('MMMM Do YYYY, h:mm');
    },
    async addComment() {
      try {
        await axios.post("/api/comments/" + this.year, {
          name: this.name,
          date: new Date(),
          text: this.text
        });
        this.name = "";
        this.text = "";
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment) {
      try {
        await axios.delete("/api/comments/" + this.year + "/" + comment.id);
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        const response = await axios.get("/api/comments/" + this.year);
        this.comments = response.data
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

}

.inputBoxes input {
  width: 200px;
  height: 100px;
  margin: 10px;
  text-align: center;
}

.inputBoxes textarea {
  width: 200px;
  height: 100px;
  margin: 10px;
}

.comments {
  display: flex;
  justify-content: center;
}

.comment {
  background-color: #dfd;
  margin: 10px;
  padding: 10px;
}
</style-->
