<template>
  <div class="grid-container">
    <app-header class="header-title" v-bind:title="title"></app-header>
    <app-navigation class="navigation-links"></app-navigation>
    <app-content class="data-content"></app-content>
    <app-footer class="footer" v-bind:footerMessage="footer"></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Content from '@/components/Content.vue'
import Footer from '@/components/Footer.vue'
import { ref } from '@vue/reactivity'
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from '@vue/runtime-core'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-navigation': Navigation,
    'app-content': Content,
    'app-footer': Footer
    // eslint-disable-next-line comma-dangle
  },
  setup () {
    // eslint-disable-next-line quotes
    const title = ref('Vue Project (Dynamic)')
    // eslint-disable-next-line quotes
    const footer = ref('KC Side Project Vue#1 2021')

    onBeforeMount(() => {
      console.log('App.vue: onBeforeMount() called!')
    })
    onMounted(() => {
      console.log('App.vue: onMounted() called!')
    })
    onBeforeUnmount(() => {
      console.log('App.vue: onBeforeUnmount() called!')
    })
    onUnmounted(() => {
      console.log('App.vue: onUnmounted() called!')
    })

    return { title, footer }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: rgba(23, 50, 91, 1);
  color: white;
  font-family: Verdana, sans-serif;
}

.header-title {
  grid-area: header;
}
.navigation-links {
  grid-area: links;
}
.data-content {
  grid-area: data;
}
.footer {
  grid-area: footer;
}

.grid-container {
  display: grid;
  grid-template-columns: 35% auto 10%;
  grid-auto-rows: minmax(50px, auto);
  grid-gap: 10px;
  grid-template-areas:
    "header  header  header"
    "links   links   links"
    "data    data    data"
    "footer  footer  footer";
}

@media screen and (min-width: 900px) {
  .grid-container {
    grid-template-areas:
      "header  links   links"
      "data    data    data"
      "footer  footer  footer";
  }
}
</style>
