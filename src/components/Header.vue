<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'Header',
  setup () {
    const title = ref('Vue Project')

    return { title }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    margin: auto;
}

header h1 {
    font-size: 2.5em;
}
</style>