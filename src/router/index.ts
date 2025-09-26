import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../App.vue';

export const ROUTE_NAME = {
  HOME: 'HOME',
} as const;

export const ROUTE_PATH: Record<keyof typeof ROUTE_NAME, string> = {
  [ROUTE_NAME.HOME]: '/',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATH[ROUTE_NAME.HOME],
      name: ROUTE_NAME.HOME,
      component: HomeView,
    },
  ],
});

export default router;
