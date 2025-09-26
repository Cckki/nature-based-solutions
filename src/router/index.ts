import { createRouter, createWebHashHistory  } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory (),
  routes: [
    // redirect null path
    {
      path: '/',
      redirect: '/map'
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/components/map.vue'),
    //  children:[]
    },
    // filter and redirect invalid path
    {
      path: '/:pathMatch(.*)*',
      redirect: '/map',
    }
  ],
})

export default router
