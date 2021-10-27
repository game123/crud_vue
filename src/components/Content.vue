<template>
  <div class="content-container">
    <h1>List of Users:</h1>
    <br />
    <app-list-users v-bind:users="users"></app-list-users>
    <app-add-new-user v-on:create-user="createUser"></app-add-new-user>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'

export default {
  name: 'Content',
  components: {
    'app-list-users': ListUsers,
    'app-add-new-user': AddNewUser
  },
  setup () {
    const message = ref('Content goes here!')
    const users = ref([
      {
        id: 1,
        name: 'User #1',
        username: 'user_1',
        email: 'email1@gmail.com'
      },
      {
        id: 2,
        name: 'User #2',
        username: 'user_2',
        email: 'email2@gmail.com'
      },
      {
        id: 3,
        name: 'User #3',
        username: 'user_3',
        email: 'email3@gmail.com'
      }
    ])

    const createUser = (user) => {
      // Check that all fields are filled in before adding the user
      if ((user.name !== '') && (user.username !== '') && (user.email !== '')) {
        var newUser = {
          id: users.value.length + 1,
          name: user.name,
          username: user.username,
          email: user.email
        }

        // Add the user to the local array of users
        users.value.push(newUser)
      }
    }

    return { message, users, createUser }
  }
}
</script>

<style scoped>
.content-container {
  margin: auto;
  padding: 1em;
  min-width: 500px;
}
</style>
