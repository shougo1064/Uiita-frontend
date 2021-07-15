import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d5192974 = () => interopDefault(import('../pages/sign_in.vue' /* webpackChunkName: "pages/sign_in" */))
const _abec7c88 = () => interopDefault(import('../pages/sign_up.vue' /* webpackChunkName: "pages/sign_up" */))
const _27b8201c = () => interopDefault(import('../pages/writing_article.vue' /* webpackChunkName: "pages/writing_article" */))
const _73b78f48 = () => interopDefault(import('../pages/articles/_id/index.vue' /* webpackChunkName: "pages/articles/_id/index" */))
const _187d2120 = () => interopDefault(import('../pages/articles/_id/edit.vue' /* webpackChunkName: "pages/articles/_id/edit" */))
const _b640251e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/sign_in",
    component: _d5192974,
    name: "sign_in"
  }, {
    path: "/sign_up",
    component: _abec7c88,
    name: "sign_up"
  }, {
    path: "/writing_article",
    component: _27b8201c,
    name: "writing_article"
  }, {
    path: "/articles/:id",
    component: _73b78f48,
    name: "articles-id"
  }, {
    path: "/articles/:id?/edit",
    component: _187d2120,
    name: "articles-id-edit"
  }, {
    path: "/",
    component: _b640251e,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
