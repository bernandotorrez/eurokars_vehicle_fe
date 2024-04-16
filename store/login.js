export default {
  state: () => ({
    loggedIn: false,
    user: null
  }),
  mutations: {
    login(state, user) {
      state.loggedIn = true
      state.user = user
    },
    logout(state) {
      state.loggedIn = false
      state.user = null
    }
  },
  actions: {
    login({ commit }, user) {
      // Perform login logic here
      commit('login', user)
    },
    logout({ commit }) {
      // Perform logout logic here
      commit('logout')
    }
  }
}