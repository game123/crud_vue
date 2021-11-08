<template>
  <div class="content-container">
    <app-banner v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></app-banner>
    <h1>List of Users:</h1>
    <br />
    <app-list-users v-bind:users="users" v-if="showUsers"></app-list-users>
    <app-add-new-user v-on:create-user="createUser"></app-add-new-user>
    <button v-on:click="deleteListOfUsers">Delete the List of Users!</button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from '@vue/runtime-core'
import axios from 'axios'

export default {
  name: 'Content',
  components: {
    'app-list-users': ListUsers,
    'app-add-new-user': AddNewUser,
    'app-banner': Banner
  },
  setup () {
    const message = ref('Content goes here!')
    const users = ref([])

    const showUsers = ref(true)
    // Message to display on banner
    const messageToDisplay = ref('')
    // Message type (Info, Success, or Error) to display on banner
    const messageType = ref('Info')

    const clearMessage = () => {
      messageToDisplay.value = ''
      messageType.value = 'Info'
    }

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

    const deleteListOfUsers = () => {
      showUsers.value = false
    }

    onBeforeMount(() => {
      console.log('Content.vue: onBeforeMount() called!')
    })
    onMounted(() => {
      console.log('Content.vue: onMounted() called!')

      axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          // handle success
          messageType.value = 'Success'
          messageToDisplay.value = 'SUCCESS! Loaded user data!'
          // console.log('Received response:')
          // console.log(response)

          users.value = response.data

          console.log('Users array in success callback:')
          console.log(users.value)
        })
        .catch((error) => {
          // handle error
          messageType.value = 'Error'
          messageToDisplay.value = 'Error! Unable to load user data!'
          console.log(error)
        })
        .finally((response) => {
          // always executed
          console.log('Finished!')
        })
    })
    onBeforeUnmount(() => {
      console.log('Content.vue: onBeforeUnmount() called!')
    })
    onUnmounted(() => {
      console.log('Content.vue: onUnmounted() called!')
    })

    return { message, users, createUser, showUsers, deleteListOfUsers, messageToDisplay, messageType, clearMessage }
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
