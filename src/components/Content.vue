<template>
  <div class="content-container">
    <app-banner v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></app-banner>
    <h1>List of Users:</h1>
    <br />
    <app-list-users v-bind:users="users" v-if="showUsers" v-on:delete-user="deleteUser" v-on:edit-user="editUser" v-on:cancel-edit-user="cancelEditUser" v-on:update-user="updateUser"></app-list-users>
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

    const largestUserIndex = ref(0)

    const clearMessage = () => {
      messageToDisplay.value = ''
      messageType.value = 'Info'
    }

    const createUser = (user) => {
      // Check that all fields are filled in before adding the user
      if ((user.name !== '') && (user.username !== '') && (user.email !== '')) {
        var newUser = {
          // LIMITATION: The ID of the new user should really be returned
          //              fro the server in the response to the POST call
          id: largestUserIndex.value + 1,
          name: user.name,
          username: user.username,
          email: user.email
        }

        // Add the new user to the database via a HTTP POST call
        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
          .then((response) => {
            // handle success
            messageType.value = 'Success'
            messageToDisplay.value = 'SUCCESS! User data was saved!'

            // Add the user to the local array of users
            users.value.push(newUser)

            // Increase the largest index used in the database
            largestUserIndex.value++
          })
          .catch((error) => {
            // handle error
            messageType.value = 'Error'
            messageToDisplay.value = 'ERROR! Unable to save user data!'
            console.log(error)
          })
          .finally((response) => {
            // always executed
            console.log('HTTP POST Finished!')
          })
      }
    }

    const deleteListOfUsers = () => {
      showUsers.value = false
    }

    const deleteUser = (user) => {
      // Find the user
      var userIndex = users.value.indexOf(user)

      // Delete the user from the database via a HTTP DELETE call
      axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
        .then((response) => {
          // handle success
          messageType.value = 'Success'
          messageToDisplay.value = 'SUCCESS! User #' + user.id + ' was deleted!'

          // Delete the user from the local array of users
          users.value.splice(userIndex, 1)
        })
        .catch((error) => {
          // handle error
          messageType.value = 'Error'
          messageToDisplay.value = 'ERROR! Unable to delete user #' + user.id + '!'
          console.log(error)
        })
        .finally((response) => {
          // always executed
          console.log('HTTP DELETE Finished!')
        })
    }

    const editUser = (user) => {
      // Since only 1 user can be edited at a time, clear the editing flag
      // for all users
      for (var index = 0; index < users.value.length; index++) {
        users.value[index].editing = false
      }

      // Find the user
      const userIndex = users.value.findIndex((currentUser) => {
        if (currentUser.id === user.id) {
          return true
        }
      })

      users.value[userIndex].editing = true
    }

    const cancelEditUser = (user) => {
      // Find the user
      const userIndex = users.value.findIndex((currentUser) => {
        if (currentUser.id === user.id) {
          return true
        }
      })

      users.value[userIndex].editing = false
    }

    const updateUser = (user) => {
      axios.put('https://jsonplaceholder.typicode.com/users/' + user.id)
        .then((response) => {
          // handle success
          messageType.value = 'Success'
          messageToDisplay.value = 'SUCCESS! USER #' + user.id + ' was updated!'
          console.log(user)

          // Update the user in the local array of users
          users.value[user.index].name = user.name
          users.value[user.index].username = user.username
          users.value[user.index].email = user.email
          users.value[user.index].editing = false
        })
        .catch((error) => {
          // handle error
          messageType.value = 'Error'
          messageToDisplay.value = 'ERROR! Unable to update user #' + user.id + '!'
          console.log(error)
          // Update the user in the local array of users
          user.value[user.index].editing = false
        })
        .finally((response) => {
          // always executed
          console.log('HTTP PUT Finished!')
        })
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

          // Save the length of the users array
          largestUserIndex.value = users.value.length

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

    return { message, users, createUser, showUsers, deleteListOfUsers, deleteUser, messageToDisplay, messageType, clearMessage, editUser, cancelEditUser, updateUser }
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
