<template>
  <div>
    Vehicle

    <div class="container">
      <b-table
        hover
        theme="light"
        bordered
      >
      <b-thead>
        <b-tr>
          <b-th scope="col" text-background="primary" text-alignment="center">
            No
          </b-th>
          <b-th scope="col" text-background="primary" text-alignment="center">
            Model
          </b-th>
          <b-th scope="col" text-background="primary" text-alignment="center">
            Type
          </b-th>
          <b-th scope="col" text-background="primary" text-alignment="center">
            Colour
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="( vehicle, index ) in vehiclesData?.data?.rows" v-bind:key="vehicle">
          <b-td text-alignment="center">{{ index+1 }}</b-td>
          <b-td>{{ vehicle.model }}</b-td>
          <b-td>{{ vehicle.type }}</b-td>
          <b-td>{{ vehicle.colour }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const vehiclesData = ref([]);

const authToken = useCookie('eurokars-auth-token').value;

const query = {
  page: {
    limit: "10",
    number: "1"
  },
  sort: {
    value: "id_vehicle",
    sorting: "asc"
  }
}

const param = objectToQueryString(query)

const vehicles = await $axios().get(`/v1/vehicle?${param}`, { 
  headers: {
    'Eurokars-Auth-Token': authToken
  } 
})

vehiclesData.value = vehicles.data
</script>

<style>

</style>