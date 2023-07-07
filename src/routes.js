import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  ...['/', '/sign_in'].map(path => ({
    path,
    component: () => import('@/components/Authentication/SignIn.vue')
  })),
  {
    path: '/sign_up_user/:user?',
    name: 'registerUser',
    component: () => import('@/components/Authentication/SignUp/RegisterUser.vue'),
    props: route => ({
      user: JSON.parse(route.params?.user || null)
    })
  },
  {
    path: '/sign_up_business/:user',
    name: 'registerBusiness',
    component: () => import('@/components/Authentication/SignUp/RegisterBusiness.vue'),
    props: route => ({ user: JSON.parse(route.params.user) })
  },
  {
    path: '/deal',
    name: 'createDeal',
    component: () => import('@/components/Deal/NewDeal.vue')
  },
  {
    path: '/data',
    name: 'showRecords',
    component: () => import('@/components/Data/Records.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/Profile/UserProfile.vue')
  }
];

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
});

export default router;
