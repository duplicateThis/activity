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
      component: r => require.ensure([], () => r(require('../pages/create.vue')), 'create')
    },
    {
      path: '/list',
      component: r => require.ensure([], () => r(require('../pages/list.vue')), 'list')
    },
    {
      path: '/active',
      component: r => require.ensure([], () => r(require('../pages/active.vue')), 'active')
    },
    {
      path: '/participate',
      component: r => require.ensure([], () => r(require('../pages/participate.vue')), 'participate')
    },
    {
      path: '/setting',
      component: r => require.ensure([], () => r(require('../pages/setting.vue')), 'setting')
    },
    {
      path: '/classify',
      component: r => require.ensure([], () => r(require('../pages/classify.vue')), 'classify')
    }
  ]
})
