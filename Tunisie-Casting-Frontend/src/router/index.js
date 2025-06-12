// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ContactPage from '../views/ContactPage.vue'
import ProfessionalListView from '../views/ProfessionalListView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserProfilPage from '../views/UserProfilPage.vue'
import DashboardPage from '../views/DashBoardPage.vue'
import SubscriptionsPage from '../views/SubscriptionsPage.vue'
import TalentDetailPage from '../views/TalentDetailPage.vue'
import TalentSearchPage from '../views/TalentSearchPage.vue'
import ProfessionalSearchPage from '../views/ProfessionalSearchPage.vue'
import FormationsPage from '../views/FormationsPage.vue'
import ServicesPage from '../views/ServicesPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/userprofil',
    name: 'userprofil',
    component: UserProfilPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/prolist',
    name: 'prolist',
    component: ProfessionalListView,
  },
  {
    path: '/prosearch',
    name: 'prosearch',
    component: ProfessionalSearchPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/subscription',
    name: 'subscriptions',
    component: SubscriptionsPage,
  },
  {
    path: '/talentdetail/:id',
    name: 'talentdetail',
    component: TalentDetailPage,
  },
  {
    path: '/talentsearch',
    name: 'talentsearch',
    component: TalentSearchPage,
  },
  {
    path: '/formation',
    name: 'formations',
    component: FormationsPage,
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Garde de navigation pour l'authentification
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log(`Redirection vers /login pour la route protégée: ${to.path}`)
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    console.log(`Redirection vers / car déjà authentifié: ${to.path}`)
    next('/') // Redirige vers la page d'accueil
  } else {
    next()
  }
})

export default router
