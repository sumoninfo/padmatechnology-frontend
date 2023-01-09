<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
          Admin Register
        </h2>
      </div>
      <div class="shadow-outline rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <form class="mt-8 space-y-6" @submit.prevent="register()">
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
              Full Name
            </label>
            <input required v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name"
                   type="text" placeholder="Full Name">
            <p class="text-red text-xs italic text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input required v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email"
                   type="email" placeholder="Email">
            <p class="text-red text-xs italic text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input required v-model="form.password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                   id="password" type="password" placeholder="********">

          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="confirm-password">
              Confirm Password
            </label>
            <input required v-model="form.confirm_password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                   id="confirm-password" type="password" placeholder="********">
          </div>
          <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div class="text-center">
        <router-link :to="{name:'adminLogin'}" class="font-medium text-indigo-600 hover:text-indigo-500">
          If you already have an account, just login.
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import NotificationService from "@/services/notification.service";

export default {
  name   : "AminRegister",
  data   : () => ({
    form  : {
      name                 : "",
      email                : "",
      password             : "",
      confirm_password: ""
    },
    errors: []
  }),
  methods: {
    register() {
      ApiService.post('/admin/register', this.form).then((res) => {
        this.$router.push({name: "AdminLogin"});
        NotificationService.success(res.data.message);
      }).catch(errors => {
        NotificationService.error(errors.response.data.message);
        // if (errors.response.status === 422) {
        //   $('.invalid-feedback').css("display", "block");
        //   this.errors = errors.response.data.message;
        // }
      });
    }
  }
}
</script>