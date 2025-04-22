import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  // Check if user is authenticated
  authStore.checkAuth()

  // If auth is required and user is not logged in, redirect to login
  if (authRequired && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  // If user is logged in and tries to access login/register, redirect to chat
  if (authStore.isAuthenticated && publicPages.includes(to.path)) {
    return navigateTo('/chat')
  }
})
