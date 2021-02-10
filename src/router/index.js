import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WeatherList from '../views/WeatherList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/weather',
    name: 'WeatherList',
    component: WeatherList, 
    props: true

  }
]

const router = new VueRouter({
    mode: 'history',
    base: 'WeatherApp/',
    routes
})

export default router
