<template>
  <div id="bannerMsg" v-show="bannerMessage" v-bind:style="{ 'background-color': bannerBackgroundColor }">
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
    <p>{{ bannerMessage }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: 'Banner',
  setup () {
    const store = useStore()

    const bannerBackgroundColor = computed(() => {
      if (store.getters.getBannerType === 'Error') {
        return 'red'
      } else if (store.getters.getBannerType === 'Success') {
        return 'green'
      } else {
        return 'blue'
      }
    })

    const bannerMessage = computed(() => {
      return store.getters.getBannerMessage
    })

    const clearBannerMessage = () => {
      store.dispatch('setBanner', { message: '', type: 'Info' })
    }

    return { bannerBackgroundColor, bannerMessage, clearBannerMessage }
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
