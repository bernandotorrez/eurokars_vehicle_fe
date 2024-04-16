<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-body">
          <NuxtImg src="https://otodriver.com/image/load/400/225/gallery/eurokars-logo3209.jpg" class="img-fluid"/>
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
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { ref } from 'vue';

const username = ref('')
const password = ref('')

async function login() {
  const login = await useFetch('/v1/auth/login', {
    username: username.value,
    password: password.value
  });

  console.log(login.data)
}
</script>

<style></style>