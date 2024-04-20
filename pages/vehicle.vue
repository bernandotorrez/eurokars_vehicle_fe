<template>
  <div class="container">
    <div class="row g-3 align-items-center justify-items-center mt-4 col-md-10 offset-md-2">
      <div class="col-auto">
        <input type="text" id="search" class="form-control" placeholder="Search" v-model="search">
      </div>
      <div class="col-auto">
        <select id="sortValue" class="form-select" v-model="sortValue">
          <option value="">- Sort -</option>
          <option value="model">Model</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div class="col-auto">
        <select id="sortBy" class="form-select" v-model="sortBy">
          <option value="">- Sort By -</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div class="col-auto">
        <select id="limit" class="form-select" v-model="pageLimit">
          <option value="">- Show -</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="filter" :disabled="!vehiclesData">Search</button>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <b-table hover theme="light" bordered>
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
              <b-th scope="col" text-background="primary" text-alignment="center">
                Fuel
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Chassis
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Engine No
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Date Reg
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Currency
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Price
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-if="vehiclesData" v-for="( vehicle, index ) in vehiclesData" v-bind:key="vehicle">
              <b-td text-alignment="center">{{ index + 1 }}</b-td>
              <b-td>{{ vehicle.model }}</b-td>
              <b-td>{{ vehicle.type }}</b-td>
              <b-td>{{ vehicle.colour }}</b-td>
              <b-td>{{ vehicle.fuel }}</b-td>
              <b-td>{{ vehicle.chassis }}</b-td>
              <b-td>{{ vehicle.engine_no }}</b-td>
              <b-td>{{ formatDate(vehicle.date_reg) }}</b-td>
              <b-td>{{ vehicle.curr }}</b-td>
              <b-td>{{ formatCurrency(vehicle.price) }}</b-td>
            </b-tr>
            <b-tr v-else>
              <b-td text-alignment="center" colspan="10">Loading ...</b-td>
            </b-tr>
          </b-tbody>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const vehiclesData = ref();
const search = ref()
const pageLimit = ref(10);
const sortValue = ref('model')
const sortBy = ref('asc')

const getVehicles = async () => {
  try {

    const query = {
      page: {
        limit: pageLimit.value,
        number: "1"
      },
      sort: {
        value: sortValue.value,
        sorting: sortBy.value
      }
    }

    if (search.value) query.search = search.value

    const param = objectToQueryString(query)

    const vehicles = await $axios().get(`/v1/vehicle?${param}`);

    vehiclesData.value = vehicles.data.data.rows;
  } catch (error) {
    vehiclesData.value = [];
  }
}

const filter = async () => {
  vehiclesData.value = null

  await getVehicles();
}

onMounted(async () => {
  await getVehicles();
})
</script>

<style>
 .center {
    display: flex;
    justify-content: center;
  }
</style>