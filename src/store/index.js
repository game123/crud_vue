import { createStore } from 'vuex'

export default createStore({
  // state is the data being stored in the Vuex store.
  state: {
    // Message to display on banner
    bannerMessage: '',
    // Banner Types: Info, Error, or Success
    bannerType: 'Info'
  },
  // getters return data from the Vuex store.
  getters: {
    getBannerMessage: (state) => {
      return state.bannerMessage
    },
    getBannerType: (state) => {
      return state.bannerType
    }
  },

  // mutations are operations that change the state.
  // mutations must be synchronous and should be called by actions
  mutations: {
  },

  // actions are functions that commit mutations. actions can involve
  // asynchronous operations.
  actions: {
  },

  // modules allow for dividing the Vuex store into manageable pieces
  // when an application gets larger in size.
  modules: {
  }
})
