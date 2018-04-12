import Vue from 'vue'
import Router from 'vue-router'

import create from '@/pages/create'
import list from '@/pages/list'
import active from '@/pages/active'
import participate from '@/pages/participate'
import setting from '@/pages/setting'
import classify from '@/pages/classify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/create'},
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },
    {
      path: '/participate',
      name: 'participate',
      component: participate
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    }
  ]
})
