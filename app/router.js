export function configRouter (router) {

  router.map({
    '/': {
      component: require('./components/Landing.vue')
    },
    '/map': {
      component: require('./components/Main.vue')
    },
    // not found handler
    '*': {
      component: require('./components/Landing.vue')
    }
  })
}