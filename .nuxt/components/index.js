export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'

export const LazyNuxtLogo = import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/NuxtLogo" */).then(c => c.default || c)
export const LazyTutorial = import('../../components/Tutorial.vue' /* webpackChunkName: "components/Tutorial" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/VuetifyLogo" */).then(c => c.default || c)
