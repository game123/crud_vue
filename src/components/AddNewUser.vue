<template>
  <h1>Add a New User:</h1>
  <br>
  <div>
    <label for="newName">Name:</label>
    <input type="text" id="newName" v-model="user.name" placeholder="Enter your name..." />
    <br>
    <label for="newUsername">Username:</label>
    <input type="text" id="newUsername" v-model="user.username" placeholder="Enter your username..." />
    <br>
    <label for="newEmail">Email:</label>
    <input type="email" id="newEmail" v-model="user.email" placeholder="Enter your email..." />
    <br>
    <button v-on:click="addNewUser">Add User</button>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'AddNewUser',
  emits: ['create-user'],
  setup (props, context) {
    const user = ref({
      name: '',
      username: '',
      email: ''
    })

    const addNewUser = () => {
      context.emit('create-user', user.value)

      // Clear the variables used for reading in the new user's info
      user.value.name = ''
      user.value.username = ''
      user.value.email = ''
    }

    return { user, addNewUser }
  }
}
</script>
<style scoped>
h1 {
  margin-top: 0.5rem;
}

label {
  float: left;
  width: 30%;
  margin-top: 6px;
  padding: 4px;
}

input[type=text] {
  margin-left: auto;
}

input, button {
  float: left;
  width: 70%;
  margin-top: 6px;
  padding: 4px;
  font-size: 1em;
}

button:focus {
  border-color:#333;
}

button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1.0rem;
  margin: 4px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.3rem;
}
</style>
