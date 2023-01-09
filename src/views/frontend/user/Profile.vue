<template>
  <div class="pt-3 px-3">
    <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl pb-3"
       href="#">
      Profile Update
    </a>
    <form @submit.prevent="update()" class="border-t pt-5">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="form.name" id="name" type="text" placeholder="Name"
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
            Email
          </label>
          <input readonly v-model="form.email" id="email" type="email" placeholder="Email"
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
            Phone
          </label>
          <input v-model="form.phone" id="phone" type="number" placeholder="Phone"
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="image">
            Image
          </label>
          <div v-if="!form.image">
            <input type="file" @change="onFileChange">
          </div>
          <div class="profile-image-preview flex justify-around" v-else>
            <img class="form-img md:w-32" :src="form.image"/>
            <span @click="removeImage" class=""><i class="fa-pull-right fa fa-times-circle "
                                                   aria-hidden="true"></i></span>
          </div>
        </div>
      </div>
      <button type="submit" class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update
      </button>
      <button type="reset" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Reset
      </button>
    </form>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";

export default {
  name: "UserProfile",
  data: () => ({
    form: {
      id   : '',
      name : '',
      email: '',
      phone: '',
      image: '',
    }
  }),
  mounted() {
    if (this.$root.user.id) {
      this.edit(this.$root.user.id);
    }
  },
  methods: {
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
    update() {
      if (!this.isImageUpload) {
        this.form.image = null;
      }
      ApiService.update(`/user/profile/${this.form.id}`, this.form).then((res) => {
        NotificationService.success(res.data.message);
        this.form = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    edit(id) {
      this.formReset();
      ApiService.get(`/user/profile/${id}`).then((res) => {
        this.form = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    formReset() {
      this.form = {
        id   : '',
        name : '',
        email: '',
        phone: '',
        image: '',
      };
    },
  }
}
</script>

<style scoped>

</style>