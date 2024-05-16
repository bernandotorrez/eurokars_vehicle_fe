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
    </div>

    <div class="row g-3 align-items-center justify-items-center mt-4 col-md-12">
      <div class="col-sm-12 col-lg-12">
        <NuxtLink class="btn btn-primary" to="/vehicle/add">Add</NuxtLink>
        <BButton class="btn btn-success mx-3" 
          :disabled="!(checked.length === 1)" 
          @click="edit">Edit</BButton>
        <BButton class="btn btn-danger"
          :disabled="(checked.length === 0)"
          @click="showModal()">Delete</BButton>
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
              <b-td text-alignment="center" colspan="11">Loading ...</b-td>
            </b-tr>
          </b-tbody>
        </b-table>

        <Pagination>
          <PageItem @click="setPage(1)">
            <PageLink>First</PageLink>
          </PageItem>
          <PageItem @click="setPage(lastPaginationClicked-1)">
            <PageLink>Previous</PageLink>
          </PageItem>
          <PageItem v-for="(item, index) in paginationPage" :class="{ active: lastPaginationClicked == item }" :key="index" @click="setPage(item);">
            <PageLink>{{ item }}</PageLink>
          </PageItem>
          <PageItem>
            <PageLink @click="setPage(lastPaginationClicked+1)">Next</PageLink>
          </PageItem>
          <PageItem @click="setPage(lastPage)">
            <PageLink>Last</PageLink>
          </PageItem>
        </Pagination>

        <!-- Modal -->
        <Modal ref="deleteModal"
        id="deleteModal"
        backdrop="static"
        :keyboard="false">
          <ModalDialog centered>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Delete Data?</ModalTitle>
                <CloseButton dismiss="modal" />
              </ModalHeader>
              <ModalBody>Are you sure want to delete with id : {{ checked.toString() }}</ModalBody>
              <ModalFooter>
                <b-button
                  button="secondary"
                  dismiss="modal"
                >
                  Close
                </b-button>
                <b-button button="danger" @click="deleteData()">
                  Delete
                </b-button>
              </ModalFooter>
            </ModalContent>
          </ModalDialog>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const vehiclesData = ref();
const vehicleLength = ref(0)
const search = ref('')
const pageLimit = ref(10);
const sortValue = ref('model')
const sortBy = ref('asc')
const isChecked = ref(false);
const checked = ref([])
const deleteModal = ref(null);
const paginationPage = ref([]);
const lastPaginationClicked = ref(1);
const lastPage = computed(() => Math.ceil(vehicleLength.value / pageLimit.value))

const getVehicles = async () => {
  try {

    const query = {
      page: {
        limit: pageLimit.value,
        number: 1
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
    vehicleLength.value = vehicles.data.data.count;

    await setPage(query.page.number)
  } catch (error) {
    vehiclesData.value = [];
    vehicleLength.value = 0;
  }
}

const setPage = async (pageNumber) => {
  lastPaginationClicked.value = pageNumber;

  try {
    const query = {
      page: {
        limit: pageLimit.value,
        number: pageNumber.toString()
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
    vehicleLength.value = vehicles.data.data.count;

    // Calculate pagination range
    const totalPageCount = Math.ceil(vehicles.data.data.count / pageLimit.value);
    const maxDisplayedPages = 10;
    let startPage = Math.max(1, pageNumber - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPageCount, startPage + maxDisplayedPages - 1);

    // Adjust startPage and endPage if necessary to always display 10 pages
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    paginationPage.value = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  } catch (error) {
    vehiclesData.value = [];
    vehicleLength.value = 0;
  }
}

const filter = async () => {
  vehiclesData.value = null
  checked.value = []

  await getVehicles();
}

const checkAllList = () => {
  // checked.value = []
  
  const checkEl = document.querySelectorAll('.check')
  const notCheckedEl = document.querySelectorAll('.check:not(:checked)')
  
  if (isChecked.value) {
    notCheckedEl.forEach((item, key) => {
      item.value = true
      item.checked = true

      const id = item.getAttribute('id');
      checked.value.push(parseInt(id))

      // childCheck(id)
    })
  } else {
    checkEl.forEach((item, key) => {
      item.value = false
      item.checked = false

      // childCheck(id)
    })

    checked.value = []
  }
}

const childCheck = (id) => {
  id = parseInt(id)

  const index = checked.value.indexOf(id);

  if (index !== -1) {
    checked.value.splice(index, 1);
  } else {
    checked.value.push(id)
  }
}

const edit = () => {
  return navigateTo({ path: `/vehicle/edit/${checked.value[0]}` })
}

const showModal = () => {
  if (deleteModal.value) {
    deleteModal.value.show()
  } else {
    deleteModal.value.hide()
  }
}

const deleteData = async () => {
  const arrayId = checked.value.toString()

  const deleteData = await $axios().delete(`/v1/vehicle/${arrayId}`)
  
  if (deleteData.data.success) {
    deleteModal.value.hide()
    checked.value = [];
    await getVehicles();
  }
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