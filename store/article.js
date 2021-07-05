export const state = () => ({
  articles: [],
})

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
}

export const actions = {
  async fetchArticles({ commit }) {
    const response = await this.$axios.get('api/v1/articles')
    const data = response.data

    commit('setArticles', data)
  },
}
