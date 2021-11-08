import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'Search'}
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!store.getters.cards){
    store.dispatch('RETRIEVE_CARDS').then(() => {
      next()
    })
  }else{
    next()
  }
})

export default router
