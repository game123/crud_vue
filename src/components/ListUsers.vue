<template>
  <table>
    <tr>
      <th >User ID</th>
      <th class='textInputColumn'>Name</th>
      <th class='textInputColumn'>Username</th>
      <th class='textInputColumn'>Email</th>
      <th class='actionColumn'>Actions</th> <!-- NEW! -->
    </tr>
    <tr v-for="(user, index) in users" v-bind:key="user.id">
      <td>{{ user.id }}</td>
      <td>
        <input type="text" v-model="inputName" v-show="user.editing" />
        <span v-show="!user.editing">{{ user.name }}</span>
      </td>
      <td>
        <input type="text" v-model="inputUsername" v-show="user.editing" />
        <span v-show="!user.editing">{{ user.username }}</span>
      </td>
      <td>
        <input type="email" v-model="inputEmail" v-show="user.editing" />
        <span v-show="!user.editing">{{ user.email }}</span>
      </td>
      <td>
        <button id="deleteButton" v-on:click="deleteUser(user)">Delete</button>
        <button id="editButton" v-on:click="editUser(user)" v-show="!user.editing">Edit</button>
        <button id="cancelEditButton" v-on:click="cancelEditUser(user)" v-show="user.editing">Cancel</button>
        <button id="updateButton" v-on:click="updateUser(index)" v-show="user.editing">Update</button>
      </td>
    </tr>
  </table>
</template>
<script>
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from '@vue/runtime-core'

export default {

  name: 'ListUsers',
  props: { users: Array },
  setup (props, context) {
    // Data for editing a user
    const inputId = ref(0)
    const inputName = ref('')
    const inputUsername = ref('')
    const inputEmail = ref('')

    // Data for editing
    const deleteUser = (user) => { // NEW!
      context.emit('delete-user', user)
    }

    onBeforeMount(() => {
      console.log('ListUsers.vue: onBeforeMount() called!')
    })
    onMounted(() => {
      console.log('ListUsers.vue: onMounted() called!')
    })
    onBeforeUnmount(() => {
      console.log('ListUsers.vue: onBeforeUnmount() called!')
    })
    onUnmounted(() => {
      console.log('ListUsers.vue: onUnmounted() called!')
    })

    const editUser = (user) => {
      // Emit a custom event to the parent component for editing a user
      context.emit('edit-user', user)

      // Set the text values within each input field
      inputId.value = user.id
      inputName.value = user.name
      inputUsername.value = user.username
      inputEmail.value = user.email
    }

    const cancelEditUser = (user) => {
      // Emit a custom event to the parent component for canceling the edit of a user
      context.emit('cancel-edit-user', user)

      // Clear the text values used in the input fields
      inputId.value = 0
      inputName.value = ''
      inputUsername.value = ''
      inputEmail.value = ''
    }

    const updateUser = (index) => {
      var updatedUser = {
        index: index,
        id: inputId.value,
        name: inputName.value,
        username: inputUsername.value,
        email: inputEmail.value
      }

      // Emit a custom event to the parent component to update a user
      context.emit('update-user', updatedUser)

      // Clear the text values used in the input fields
      inputId.value = 0
      inputName.value = ''
      inputUsername.value = ''
      inputEmail.value = ''
    }

    return { inputId, inputName, inputUsername, inputEmail, deleteUser, editUser, cancelEditUser, updateUser } // NEW!
  }
}
</script>
<style scoped>
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

button {
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8em;
  margin: 0 4px;
}

#deleteButton:hover, #cancelEditButton:hover {
  color: red;
  cursor: pointer;
}

#editButton:hover {
  color: green;
  cursor: pointer;
}

#updateButton:hover {
  color: green;
  cursor: pointer;
}

input {
  font-size: 0.8em;
}

.textInputColumn {
  padding-right: 2em;
  min-width: 140px;
}

.actionColumn {
  padding-right: 8em;
}
</style>
