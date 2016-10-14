import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { configRouter } from './router'
import Frame from './components/Frame.vue'

//require('es6-promise').polyfill()

// inject compiled CSS
//require('./css/style.scss')

// register components
// const Landing = require('./components/Landing.vue')
// Vue.component('app-header', Landing)

// install router
Vue.use(VueRouter)

// create router
const router = new VueRouter({
	history: true,
	saveScrollPosition: true,
	root: '/',
	hashbang: true,
	linkActiveClass: "active",
	mode: 'html5'
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(Frame)
router.start(App, '#app')

// just for debugging
window.router = router