import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
const COOKIE_TARGET_STORE = ['user']

function filterValues(serializedJsonValue) {
  const parsed = JSON.parse(serializedJsonValue)
  const storeNames = Object.keys(parsed)

  // 削除対象の store 一覧から cookie 保存する store を除外する
  for (const storeName of COOKIE_TARGET_STORE) {
    const idx = storeNames.indexOf(storeName)
    storeNames.splice(idx, 1)
  }

  for (const key of storeNames) {
    delete parsed[key]
  }
  return JSON.stringify(parsed)
}

export default ({ store, isDev }) => {
  createPersistedState({
    key: 'Uiita-frontend',
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(
          key,
          filterValues(value),
          { expires: 30, secure: !isDev },
          { samesite: 'lax' }
        ),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
