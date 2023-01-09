<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">

    <div class="bg-gray-800 pt-3">
      <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
        <h3 class="font-bold pl-2 text-2xl">Create Amenity</h3>
        <router-link :to="{name:'adminAmenities'}"
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

export default {
  name: "AdminAmenitiesCreate",
  data: () => ({
    editMode: false,
    form    : {
      name: ''
    }
  }),
  mounted() {
    if (this.$route.params.id) {
      this.editMode = true;
      this.edit(this.$route.params.id);
    }
  },
  methods: {
    store() {
      ApiService.post(`/admin/amenities`, this.form).then((res) => {
        NotificationService.success(res.data.message);
        this.$router.push({name: "adminAmenities"});
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    update() {
      ApiService.update(`/admin/amenities/${this.form.id}`, this.form).then((res) => {
        NotificationService.success(res.data.message);
        this.$router.push({name: "adminAmenities"});
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    edit(id) {
      this.formReset();
      this.editMode = true;
      ApiService.get(`/admin/amenities/${id}`).then((res) => {
        this.form = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    formReset() {
      this.editMode = false;
      this.form     = {
        name: ''
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
