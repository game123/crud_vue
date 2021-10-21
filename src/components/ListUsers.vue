<template>
  <table>
    <tr>
      <th>User ID</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
    </tr>
    <tr v-for="user in users" v-bind:key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ListUsers',
  props: { users: Array }
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
</style>
