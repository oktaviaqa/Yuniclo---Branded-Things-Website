import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPage from '../views/DetailPage.vue'
import FavoritePage from '../views/FavoritePage.vue'
import { useToast } from "vue-toastification";
const toast = useToast()

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginPage
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterPage
      },
      {
        path: '/products/:id',
        name: 'detailProduct',
        component: DetailPage
      },
      {
        path: '/favorites',
        name: 'favorite',
        component: FavoritePage
      }
    ]
  })

router.beforeEach((to, from, next) => {
  if (localStorage.access_token && to.name === 'login') {
    next ({ name: 'home'})
  } else if (!localStorage.access_token && to.name === 'favorite') {
    toast.info('Please sign in to continue')
    next ({name: 'login'})
  } else {
    next()
  }
})
export default router
