<template>
  <div id="bannerMsg" v-show="bannerMessage" v-bind:style="{ 'background-color': bannerBackgroundColor }">
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
    <p>{{ bannerMessage }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'

export default {
  name: 'Banner',
  props: {
    // Banner message to display to the user
    bannerMessage: String,
    // Banner Types: Info, Error, or Success
    bannerType: String
  },
  setup (props, context) {
    const bannerBackgroundColor = computed(() => {
      if (props.bannerType === 'Error') {
        return 'red'
      } else if (props.bannerType === 'Success') {
        return 'green'
      } else {
        return 'blue'
      }
    })

    const clearBannerMessage = () => {
      context.emit('clear-banner')
    }

    return { bannerBackgroundColor, clearBannerMessage }
  }
}

</script>

<style scoped>
div {
  width: 100%;
  display:inline-block;
  margin-bottom: 15px;
}

span, p {
  padding: 15px;
  color: white;
  width: auto;
}

div {
  float: left;
}

#errorMessageClear {
  float: right;
}

#errorMessageClear:hover {
  color: black;
  cursor: pointer;
}
</style>
