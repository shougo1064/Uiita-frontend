export default function setup({ store }) {
  store.$axios.interceptors.request.use((config) => {
    let headers = {}
    headers = store.getters['user/headers']
    Object.keys(headers).forEach(function (key) {
      const value = headers[key]
      config.headers[key] = value
    })
    return config
  })
}
