<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    Redirecting to Login Page ...
  </div>
</template>

<script setup>
  // import loginSchema from '~/validation/loginSchema';

  // const { authLogin } = useAuthStore();

  // const { failMessage, isLoading, isSuccess } = storeToRefs(useAuthStore())

  definePageMeta({
    layout: false
  })

  onMounted(async () => {
    const azure = await $axios().get('/v1/auth/login/sso')

    window.location.href = azure.data.data;
  })

  // const { handleSubmit, errors } = useForm({
  //     validationSchema: loginSchema,
  // });

  // const { value: username } = useField('username');
  // const { value: password } = useField('password');

  // const login = handleSubmit(async values => {
  //   console.log(errors.value)
  //   await authLogin(values.username, values.password);
  // });
</script>

<style></style>