export default defineNuxtRouteMiddleware((route, to) => {
  const authToken = useCookie('eurokars-auth-token');

  if (route.name !== 'login' && route.name !== 'redirect') {
    if (!authToken?.value) {
      abortNavigation();
      return '/login'
    }
  }
  
  if (route.name === 'login') {
    if (authToken.value) return '/'
  }
})
