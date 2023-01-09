<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">

    <div class="bg-gray-800 pt-3">
      <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
        <h3 class="font-bold pl-2 text-2xl">Create Room</h3>
        <router-link :to="{name:'adminRooms'}"
                     class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded">
          <i class="fas fa-arrow-circle-left"></i> Back
        </router-link>
      </div>
    </div>

    <div class="p-5">
      <div class="relative overflow-hidden">
        <div class="rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4">
          <form @submit.prevent="editMode ? update() : store()">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                  Name
                </label>
                <input v-model="form.name" id="name" type="text" placeholder="Name"
                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                  Price
                </label>
                <input step="any" v-model="form.price" id="price" type="number" placeholder="Price"
                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                  Size
                </label>
                <input v-model="form.size" id="size" type="text" placeholder="Size"
                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                  Maximum Occupancy
                </label>
                <input step="any" v-model="form.maximum_occupancy" id="maximum_occupancy" type="number"
                       placeholder="Maximum Occupancy"
                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">

              <div class="w-full md:w-1/2 px-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an
                  Amenities</label>
                <multiselect label="name" :multiple="true" track-by="id" placeholder="Please Select..."
                             v-model="form.amenities"
                             :options="amenities"/>
              </div>

              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="image">
                  Image
                </label>
                <div v-if="!form.image">
                  <input type="file" @change="onFileChange">
                </div>
                <div class="profile-image-preview flex justify-around" v-else>
                  <img class="form-img w-32" :src="form.image"/>
                  <span @click="removeImage" class=""><i class="fa-pull-right fa fa-times-circle "
                                                         aria-hidden="true"></i></span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                  Description
                </label>
                <textarea v-model="form.description" id="description"
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
              </div>
            </div>
            <button type="submit" class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {{ editMode ? 'Update' : 'Save' }}
            </button>
            <button type="reset" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Multiselect         from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name      : "AdminRoomsCreate",
  components: {Multiselect},
  data      : () => ({
    amenities: ['list', 'of', 'options'],
    editMode : false,
    form     : {
      name             : '',
      price            : '',
      size             : '',
      maximum_occupancy: '',
      quantity         : '',
      amenities        : [],
      description      : '',
      image            : '',
    }
  }),
  mounted() {
    this.getAmenities()
    if (this.$route.params.id) {
      this.editMode = true;
      this.edit(this.$route.params.id);
    }
  },
  methods: {
    getAmenities() {
      this.$Progress.start();
      ApiService.get(`/admin/amenities`).then((res) => {
        this.amenities = res.data.data;
        this.$Progress.finish();
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.isImageUpload = true;
      const image        = new Image();
      var reader         = new FileReader();
      var vm             = this;

      reader.onload = (e) => {
        vm.form.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.form.image = '';
    },
    store() {
      if (!this.isImageUpload) {
        this.form.image = null;
      }
      ApiService.post(`/admin/rooms`, this.form).then((res) => {
        NotificationService.success(res.data.message);
        this.$router.push({name: "adminRooms"});
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    update() {
      if (!this.isImageUpload) {
        this.form.image = null;
      }
      ApiService.update(`/admin/rooms/${this.form.id}`, this.form).then((res) => {
        NotificationService.success(res.data.message);
        this.$router.push({name: "adminRooms"});
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    edit(id) {
      this.formReset();
      this.editMode = true;
      ApiService.get(`/admin/rooms/${id}`).then((res) => {
        this.form = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    formReset() {
      this.editMode = false;
      this.form     = {
        name       : '',
        price      : '',
        quantity   : '',
        description: '',
        image      : '',
      };
    },
  }
}
</script>

<style scoped>
.profile-image-preview {
  width: 300px;
}
</style>
