<template>
    <div class="container">
        <div class="row g-3 align-items-center justify-items-center mt-4 col-md-12">
            <form class="form" @submit.prevent="addVehicle">
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
                            <button class="btn btn-success" type="submit" :disabled="isLoading">Add</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import { toTypedSchema } from '@vee-validate/zod';
    import * as zod from 'zod';

    const isLoading = ref(false);

    const validationSchema = toTypedSchema(
        zod.object({
            model: zod.string().min(1, { message: "Required" }),
            type: zod.string().min(1, { message: "Required" }),
            colour: zod.string().min(1, { message: "Required" }),
            fuel: zod.string().min(1, { message: "Required" }),
            chassis: zod.string().min(1, { message: "Required" }),
            engine_no: zod.string().min(1, { message: "Required" }),
            date_reg: zod.string().min(1, { message: "Required" }),
            curr: zod.string().min(1, { message: "Required" }),
            price: zod.number().min(1, { message: "Required" }),
        })
    );

    const { handleSubmit, errors } = useForm({
        validationSchema,
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

    const addVehicle = handleSubmit(async values => {
        isLoading.value = true;

        try {
            const addVehicle = await $axios().post('/v1/vehicle', values)

            if (addVehicle.data.code === 201) return navigateTo('/vehicle')
        } catch (error) {
            console.log(error.message)
        }

        isLoading.value = false
    });
</script>
<style>
    
</style>