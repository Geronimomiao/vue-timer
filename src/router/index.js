import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'
import index from '@/views/index'
import timer from '@/components/timer'
import user from '@/components/user'
import login from '@/components/login'
import register from '@/components/register'
import createList from '@/components/createList'
import menu from '@/components/NavMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'register',
          name: 'register',
          component: register
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'timer',
          component: timer
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'createList',
          name: 'createList',
          component: createList
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu
        }
      ]
    }
  ]
})
