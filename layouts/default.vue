<template>
    <div>
        <AppHeader/>
        <body>
            <slot />
        </body>
        <AppFooter/>
    </div>
</template>


<script setup>
const { setUser } = useAuthStore()

onBeforeMount(async () => {
    const userData = sessionStorage.getItem('user')

    if (userData) {
      console.log(userData)
      setUser(JSON.parse(userData)) 
    }
})
</script>