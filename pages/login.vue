<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-body">
        <NuxtImg src="https://otodriver.com/image/load/400/225/gallery/eurokars-logo3209.jpg" class="img-fluid img-responsive img-center"/>
        <Alert theme="danger" class="text-center" v-if="!isSuccess && failMessage">
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

<script setup>
import { ref } from 'vue';

const { authLogin } = useAuthStore();

const { failMessage, isLoading, isSuccess } = storeToRefs(useAuthStore())

definePageMeta({
  layout: false
})

const username = ref('');
const password = ref('');

const login = async () => {
  await authLogin(username.value, password.value);
}
</script>

<style></style>