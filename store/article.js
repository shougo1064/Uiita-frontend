export const state = () => ({
  articles: [],
})

export const getters = {
  articles: (state) => state.articles,
}

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
}

export const actions = {
  async fetchArticles({ commit }) {
    await this.$axios.get('api/v1/articles').then((response) => {
      const data = response.data

      commit('setArticles', data)
    })
  },
}
