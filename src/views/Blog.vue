<template>
  <app-blog></app-blog>
</template>

<script>
import BlogEntries from '@/components/BlogEntries.vue'

export default {
  name: 'home',
  components: {
    'app-blog': BlogEntries
  }
}
</script>
