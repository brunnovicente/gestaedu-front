import { createRouter, createWebHistory } from 'vue-router'
import Listar from "../views/diario/Listar.vue";
import Login from "../views/usuario/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Listar,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
})

export default router
