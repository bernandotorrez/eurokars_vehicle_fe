import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isSuccess: false,
    loginData: {},
    failMessage: ''
  }),
  actions: {
    async authLogin (username, password) {
      this.isLoading = true;
      this.failMessage = '';
      
      try {
        const login = await $axios().post('/v1/auth/login', {
          username,
          password
        })
    
        this.isLoading = false
        
        const { data, headers } = login;
    
        this.isSuccess = data.success;
        this.loginData = data.data;
    
        if (!this.isSuccess) this.failMessage = data.message;
        
        if (this.loginData?.username) {
          const accessToken = headers.get('eurokars-auth-token');
          const decodedAccessToken = jwtDecode(accessToken);
          const refreshToken = headers.get('eurokars-auth-refresh-token');
    
          const cookieAuthToken = useCookie('eurokars-auth-token');
          cookieAuthToken.value = accessToken;
    
          const cookieRefreshToken = useCookie('eurokars-auth-refresh-token');
          cookieRefreshToken.value = refreshToken;

          return navigateTo('/')
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          const { message } = data;
    
          this.isLoading = false
          this.failMessage = message;
        } else {
          this.failMessage = error.message;
        }
      }
    },
    async authLogout () {
      const cookieAuthToken = useCookie('eurokars-auth-token')
      cookieAuthToken.value = null;
      const cookieRefreshToken = useCookie('eurokars-auth-refresh-token');
      cookieRefreshToken.value = null;

      this.resetState();
    },
    async resetState () {
      this.isLoading = false;
      this.isSuccess = false;
      this.loginData = {};
      this.failMessage = '';
    }
  }
})