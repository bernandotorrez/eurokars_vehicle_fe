<template>
  <div>
    Edit {{ vehicleData.model }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const paramId = ref(route.params.id)
const vehicleData = ref({})

const getVehiclesById = async (id: string | string[]) => {
  try {
    const vehicles = await $axios().get(`/v1/vehicle/${id}`);

    vehicleData.value = vehicles.data.data;
  } catch (error) {
    vehicleData.value = {};
  }
}

onMounted(async () => {
  await getVehiclesById(paramId.value);
}) 
</script>

<style>

</style>