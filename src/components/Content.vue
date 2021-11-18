<template>
  <div class="content-container">
    <app-banner></app-banner>
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
import { useStore } from 'vuex'

export default {
  name: 'Content',
  components: {
    'app-list-users': ListUsers,
    'app-add-new-user': AddNewUser,
    'app-banner': Banner
  },
  setup () {
    const store = useStore()
    const message = ref('Content goes here!')
    const users = ref([])

    const showUsers = ref(true)
    // Message to display on banner
    const messageToDisplay = ref('')
    // Message type (Info, Success, or Error) to display on banner
    const messageType = ref('Info')

    const largestUserIndex = ref(0)

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
            store.dispatch('setBanner', {
              message: 'SUCCESS! User data was saved!',
              type: 'Success'
            })

            // Add the user to the local array of users
            users.value.push(newUser)

            // Increase the largest index used in the database
            largestUserIndex.value++
          })
          .catch((error) => {
            // handle error
            store.dispatch('setBanner', {
              message: 'ERROR! Unable to save user data!',
              type: 'Error'
            })
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
          store.dispatch('setBanner', {
            message: 'SUCCESS! User #' + user.id + ' was deleted!',
            type: 'Success'
          })

          // Delete the user from the local array of users
          users.value.splice(userIndex, 1)
        })
        .catch((error) => {
          // handle error
          store.dispatch('setBanner', {
            message: 'ERROR! Unable to delete user #' + user.id + '!',
            type: 'Error'
          })
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
          store.dispatch('setBanner', {
            message: 'SUCCESS! User #' + user.id + ' was updated!',
            type: 'Success'
          })
          console.log(user)

          // Update the user in the local array of users
          users.value[user.index].name = user.name
          users.value[user.index].username = user.username
          users.value[user.index].email = user.email
          users.value[user.index].editing = false
        })
        .catch((error) => {
          // handle error
          store.dispatch('setBanner', {
            message: 'ERROR! Unable to update user #' + user.id + '!',
            type: 'Error'
          })
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
          store.dispatch('setBanner', {
            message: 'SUCCESS! Loaded user data!',
            type: 'Success'
          })

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
          store.dispatch('setBanner', {
            message: 'ERROR! Unable to load user data!',
            type: 'Error'
          })
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

    return { message, users, createUser, showUsers, deleteListOfUsers, deleteUser, messageToDisplay, messageType, editUser, cancelEditUser, updateUser }
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
