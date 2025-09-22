import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
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
