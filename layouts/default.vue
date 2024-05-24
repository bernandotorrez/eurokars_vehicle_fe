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

const getUserSelf = async () => {
    // const selfData = await $axios().get('/v1/user/self')

    // const { data } = selfData.data

    const data = JSON.parse(sessionStorage.getItem('user'))
    console.log(data)
    const userData = {
        username: data.name
    }
    
   setUser(userData)
}

onMounted(async () => {
    await getUserSelf()
})
</script>