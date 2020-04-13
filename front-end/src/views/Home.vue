<template>
<div class="home">
  <h1>Welcome to Kyler's Guide to the First Vision</h1>
  <h3>To begin click on one of the links to an account of the First Vision</h3>
  <div class="links">
    <router-link to="/account/1832">1832 Account</router-link>
    <router-link to="/account/1835">1835 Account</router-link>
    <router-link to="/account/1838">1838 Account</router-link>
    <router-link to="/account/1842">1842 Account</router-link>
    <router-link to="/other">Other Accounts</router-link>
  </div>
</div>
</template>

<style scoped>
.home {
  text-align: center;
}

.links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #b5dce9;
  width: 80%;
  margin: auto;
  padding: 1%;
  border: 2px black solid;
}

.links a {
  margin: 2%;
  color: black;
  font-size: 1.5em;
  text-decoration: none;
  font-style: italic;
    font-weight: bold;
}
</style>
