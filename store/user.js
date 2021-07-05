export const state = () => ({
  headers: {},
  isSignedIn: false,
})

export const getters = {
  headers: (state) => state.headers,
  isSignedIn: (state) => state.isSignedIn,
}

export const mutations = {
  setHeaders(state, headers) {
    state.headers = headers
  },

  setSignInState(state, signInState) {
    state.isSignedIn = signInState
  },
}

export const actions = {
  async signUp({ commit }, params) {
    await this.$axios.post('api/v1/auth', params).then((response) => {
      const headers = response.headers
      const loginInfoHeaders = {
        'access-token': headers['access-token'],
        client: headers.client,
        expiry: headers.expiry,
        uid: headers.uid,
        'token-type': headers['token-type'],
      }

      commit('setHeaders', loginInfoHeaders)
      commit('setSignInState', true)
    })
  },
}
