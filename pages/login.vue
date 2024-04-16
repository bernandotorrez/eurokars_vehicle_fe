<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-body">
        <NuxtImg src="https://otodriver.com/image/load/400/225/gallery/eurokars-logo3209.jpg" class="img-fluid img-responsive img-center"/>
        <Alert theme="danger" class="text-center" v-if="!isSuccess && isClickLogin">
          {{ failMessage }}
        </Alert>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    definePageMeta({
      layout: false
    })

    const username = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const loginData = ref({});
    const isClickLogin = ref(false);
    const failMessage = ref('');

    async function login() {
      isLoading.value = true;
      isClickLogin.value = true;
      failMessage.value = '';
      
      try {
        const login = await $axios().post('/v1/auth/login', {
          username: username.value,
          password: password.value
        })

        isLoading.value = false
        
        const { data } = login;

        isSuccess.value = data.success
        loginData.value = data.data;

        if (!data.success) failMessage.value = data.message;
      } catch (error) {
        const { data } = error.response;
        const { message } = data;

        isLoading.value = false
        failMessage.value = message;
      }
    }

    return {
      username,
      password,
      isLoading,
      isSuccess,
      loginData,
      isClickLogin,
      failMessage,
      login
    }
  },
}
</script>

<style></style>