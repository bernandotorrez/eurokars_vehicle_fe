<template>
  <div>
    Redirect
  </div>
</template>

<script setup>
  const route = useRoute();
  const { setTokenSSO } = useAuthStore();

  definePageMeta({
    layout: false
  })

  onMounted(async () => {
    const data = route.query;
    const parsed = atob(data.data);

    const { username, name, id_token, access_token, expires_on, ip_address } = queryStringToObject(parsed);

    await setTokenSSO(username, name, id_token, access_token, expires_on, ip_address)
  })
</script>

<style>

</style>