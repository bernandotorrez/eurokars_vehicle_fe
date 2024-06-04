<template>
    <div>
        Index
        <Modal ref="modalUserConfiguration" id="modalUserConfiguration" backdrop="static" :keyboard="false">
            <ModalDialog>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>User Configuration</ModalTitle>
                        <CloseButton dismiss="modal" />
                    </ModalHeader>
                    <ModalBody>
                        <form class="form">
                            <div class="row">
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label for="model">Status App</label>
                                        <select class="form-control" v-model="statusApp">
                                            <option value="" choosen>- Choose Status App -</option>
                                            <option v-for="(data, index) in userProfile.user_status_app" :key="index" :value="data.status_app.id_status_app">{{ data.status_app.status_app }}</option>
                                        </select>
                                        <span class="badge bg-danger"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label for="model">Department</label>
                                        <select class="form-control" v-model="department">
                                            <option value="" choosen>- Choose Department -</option>
                                            <option v-for="(data, index) in userProfile.user_department" :key="index" :value="data.department.id_department">{{ data.department.department }}</option>
                                        </select>
                                        <span class="badge bg-danger"></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <b-button button="secondary" dismiss="modal">
                            Close
                        </b-button>
                        <b-button button="primary">
                            Save changes
                        </b-button>
                    </ModalFooter>
                </ModalContent>
            </ModalDialog>
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const modalUserConfiguration = ref(null);
const userProfile = ref({})
const statusApp = ref('')
const department = ref('')

const showModal = () => {
    if (modalUserConfiguration.value) {
        modalUserConfiguration.value.show()
    } else {
        modalUserConfiguration.value.hide()
    }
}

onMounted(async () => {
    const userData = await $axios().get('/v1/webapp/user/self')

    userProfile.value = userData.data.data
    
    console.log(userData.data.data)

    showModal()
    
})
</script>