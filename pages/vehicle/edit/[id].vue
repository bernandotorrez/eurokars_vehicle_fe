<template>
  <div class="container">
      <div class="row g-3 align-items-center justify-items-center mt-4 col-md-12">
          <Alert theme="danger" class="text-center" v-if="failMessage">
              {{ failMessage }}
          </Alert>
          <form class="form" @submit.prevent="editVehicle">
              <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="model">Model</label>
                          <input type="text" class="form-control" id="model" placeholder="Model" v-model="model">
                          <span class="badge bg-danger" v-if="errors.model">{{ errors.model }}</span>
                      </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="type">Type</label>
                          <input type="text" class="form-control" id="type" placeholder="Type" v-model="type">
                          <span class="badge bg-danger" v-if="errors.type">{{ errors.type }}</span>
                      </div>
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="colour">Colour</label>
                          <input type="text" class="form-control" id="colour" placeholder="Colour" v-model="colour">
                          <span class="badge bg-danger" v-if="errors.colour">{{ errors.colour }}</span>
                      </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="Fuel">Fuel</label>
                          <input type="text" class="form-control" id="Fuel" placeholder="Fuel" v-model="fuel">
                          <span class="badge bg-danger" v-if="errors.fuel">{{ errors.fuel }}</span>
                      </div>
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="chassis">Chassis</label>
                          <input type="text" class="form-control" id="chassis" placeholder="Chassis"
                              v-model="chassis">
                          <span class="badge bg-danger" v-if="errors.chassis">{{ errors.chassis }}</span>
                      </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="engine_no">Engine No</label>
                          <input type="text" class="form-control" id="engine_no" placeholder="Engine No"
                              v-model="engine_no">
                          <span class="badge bg-danger" v-if="errors.engine_no">{{ errors.engine_no }}</span>
                      </div>
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="date_reg">Date Reg</label>
                          <input type="date" class="form-control" id="date_reg" placeholder="Date Reg"
                              v-model="date_reg">
                          <span class="badge bg-danger" v-if="errors.date_reg">{{ errors.date_reg }}</span>
                      </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="curr">Currency</label>
                          <input type="text" class="form-control" id="curr" placeholder="Currency" v-model="curr">
                          <span class="badge bg-danger" v-if="errors.curr">{{ errors.curr }}</span>
                      </div>
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <label for="price">Price</label>
                          <input type="number" class="form-control" id="price" placeholder="Price" v-model="price">
                          <span class="badge bg-danger" v-if="errors.price">{{ errors.price }}</span>
                      </div>
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="form-group">
                          <button class="btn btn-success" type="submit" :disabled="isLoading">Edit</button>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import vehicleSchema from '~/validation/vehicleSchema';

  const route = useRoute()

  const paramId = ref(route.params.id)
  const isLoading = ref(false);
  const failMessage = ref();

  const { handleSubmit, errors } = useForm({
      validationSchema: vehicleSchema,
  });

  const { value: model } = useField('model');
  const { value: type } = useField('type');
  const { value: colour } = useField('colour');
  const { value: fuel } = useField('fuel');
  const { value: chassis } = useField('chassis');
  const { value: engine_no } = useField('engine_no');
  const { value: date_reg } = useField('date_reg');
  const { value: curr } = useField('curr');
  const { value: price } = useField('price');

  const getVehiclesById = async (id: string | string[]) => {
    try {
      const vehicles = await $axios().get(`/v1/vehicle/${id}`);

      const { data } = vehicles.data;

      model.value = data.model;
      type.value = data.type;
      colour.value = data.colour;
      fuel.value = data.fuel;
      chassis.value = data.chassis;
      engine_no.value = data.engine_no;
      date_reg.value = formatDateInput(data.date_reg);
      curr.value = data.curr;
      price.value = data.price;

      console.log(formatDateInput(data.date_reg))
      
    } catch (error) {
      failMessage.value = error.message
    }
  }

  const editVehicle = handleSubmit(async values => {
        isLoading.value = true;

        try {
            const editVehicle = await $axios().put(`/v1/vehicle/${paramId.value}`, values)

            if (editVehicle.data.code === 201) return navigateTo('/vehicle')
            else failMessage.value = editVehicle.data.message
        } catch (error) {
            failMessage.value = error.message
        }

        isLoading.value = false
    });

  onMounted(async () => {
    await getVehiclesById(paramId.value);
  }) 
</script>

<style>

</style>