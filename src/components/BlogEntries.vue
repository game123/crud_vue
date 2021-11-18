<template>
  <div class="blog-entries">
    <div v-for="entry in blogEntries" v-bind:key="entry.index" class="blog-card">
      <div class="blog-title">
        <h2>{{ entry.title }}</h2>
      </div>
      <div class="blog-summary">
        <h2>{{ entry.summary }}</h2>
      </div>
      <div class="blog-entry-date">
        <h2>{{ entry.date }}</h2>
      </div>
    </div>

  </div>
</template>
<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'BlogEntries',
  setup () {
    const blogEntries = ref([
      {
        index: 1,
        title: 'My Favorite Aspects of Vue',
        summary: 'This blog post describes my favorite aspects of Vue and how I came to pick Vue as my favorite JavaScript framework.',
        date: 'June 11th, 2021'
      },
      {
        index: 2,
        title: 'How to Use Components to Build Complex Web Applications',
        summary: 'This blog post describes the details of how to create re-usable Vue components that can be easily integrated together to make complex web applications.',
        date: 'May 27th, 2021'
      },
      {
        index: 3,
        title: 'Unit Testing a Vuex Store',
        summary: 'This blog post describes how to unit test a Vuex Store.',
        date: 'April 16th, 2021'
      }
    ])

    return { blogEntries }
  }
}
</script>

<style scoped>
.blog-entries {
  margin: 15px;
}

.blog-card {
  margin: 10px;
  padding: 10px 20px;
  color: white;
  background: rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 88px 0 rgba(0, 0, 0, 0.52);
  overflow: hidden;
}

.blog-card h2 {
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid black;
}

.blog-entry-date {
  font-size: 0.7em;
  font-style: italic;
}

.blog-card p {
  padding-bottom: 10px;
}

</style>
