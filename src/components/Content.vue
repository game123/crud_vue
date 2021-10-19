<template>
  <div class="content-container">
    <h1>{{ message }}</h1>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";

export default {
  name: "Content",
  setup() {
    const message = ref("Content goes here!");

    return { message };
  }
};
</script>

<style scoped>
.content-container {
  margin: auto;
  padding: 1em;
  min-width: 500px;
}
</style>
