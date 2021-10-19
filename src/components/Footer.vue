<template>
  <footer>
    <h1>{{ footerMessage }}</h1>
  </footer>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  name: "Footer",
  setup() {
    const footerMessage = ref("TestDriven.io 2021");

    return { footerMessage };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  margin: auto;
}
</style>
