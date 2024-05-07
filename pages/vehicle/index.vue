<template>
  <div class="container">
    <div class="row g-3 align-items-center justify-items-center mt-4 col-md-12">
      <div class="col-sm-12 col-lg-3">
        <input type="text" id="search" class="form-control" placeholder="Search" v-model="search">
      </div>
      <div class="col-4 col-sm-4 col-lg-2">
        <select id="sortValue" class="form-select" v-model="sortValue">
          <option value="">- Sort -</option>
          <option value="model">Model</option>
          <option value="type">Type</option>
          <option value="colour">Colour</option>
          <option value="fuel">Fuel</option>
          <option value="date_reg">Date Reg</option>
        </select>
      </div>
      <div class="col-4 col-sm-4 col-lg-2">
        <select id="sortBy" class="form-select" v-model="sortBy">
          <option value="">- Sort By -</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div class="col-4 col-sm-4 col-lg-2">
        <select id="limit" class="form-select" v-model="pageLimit">
          <option value="">- Show -</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="col-sm-12 col-lg-1">
        <button class="btn btn-primary" @click="filter" :disabled="!vehiclesData">Search</button>
      </div>
      <div class="col-sm-12 col-lg-1 offset-lg-1">
        <NuxtLink class="btn btn-success" to="/vehicle/add">Add</NuxtLink>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <b-table hover theme="light" bordered responsive>
          <b-thead>
            <b-tr>
              <b-th scope="col" text-background="primary" text-alignment="center">
                No
              </b-th>
              <b-th scope="col" text-background="primary" text-alignment="center">
                Action 
                <BFormCheckInput
                  v-model="isChecked"
                  @change="checkAllList"
                />
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
              <b-td>
                <NuxtLink :to="{ path: `/vehicle/edit/${vehicle.id_vehicle}` }" class="pr-4">
                  <BIcon icon="tabler:edit" class="fa text-success fa-2x"/>
                </NuxtLink>   
                <BFormCheckInput @change="childCheck(vehicle.id_vehicle)" :id="vehicle.id_vehicle.toString()" class="check"/>
              </b-td>
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
const search = ref('')
const pageLimit = ref(10);
const sortValue = ref('model')
const sortBy = ref('asc')
const isChecked = ref(false);
const checked = ref([])

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
      },
      search: search.value
    }

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

const checkAllList = () => {
  const checkEl = document.querySelectorAll('.check')
  
  checkEl.forEach((item, key) => {
    item.value = isChecked.value
    item.checked = isChecked.value

    const id = item.getAttribute('id');

    childCheck(id)
  })

  console.log(checked.value)
}

const childCheck = (id) => {
  id = parseInt(id)
  const index = checked.value.indexOf(id);
  if (index !== -1) {
      checked.value.splice(index, 1);
  } else {
      checked.value.push(id)
  }

  console.log(checked.value)
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