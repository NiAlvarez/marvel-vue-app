import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { 
    path: '/', 
    component: () => import('@/pages/components/HomePage.vue'),
  },
  { 
    path: '/creation', 
    component: () => import('@/pages/components/CharacterEditionPage.vue'),
  },
  { 
    path: "/character/:id",
    name: 'character',
    component: () => import('@/pages/components/CharacterEditionPage.vue'),
  },
  { 
    path: "/:pathMatch(.*)*",
    component: () => import('@/pages/components/NoPageFound.vue') 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;