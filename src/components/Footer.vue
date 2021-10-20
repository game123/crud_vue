<template>
  <footer>
    <h1>{{ footerMessage }}</h1>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: { footerMessage: String }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  margin: auto;
}
</style>
