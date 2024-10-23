import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/tabs/Auteurs'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Auteurs'
      },
      {
        path: 'Auteurs',
        component: () => import('@/views/TabAuteursPage.vue')
      },
      {
        path: 'Boeken',
        component: () => import('@/views/TabBoekenPage.vue')
      },
      {
        path: 'Genres',
        component: () => import('@/views/TabGenresPage.vue')
      },
      {
        path: 'About',
        component: () => import('@/views/TabAboutPage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;