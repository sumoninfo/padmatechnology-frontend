<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
          Login your account
        </h2>
      </div>
      <div class="shadow-outline rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <form class="mt-8 space-y-6" @submit.prevent="login()">
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Email
            </label>
            <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                   id="username"
                   type="text" placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="form.password"
                   class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                   id="password" type="password" placeholder="********">
            <p class="text-red text-xs italic hidden">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                     class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>

      </div>
      <div class="text-center">
        <router-link :to="{name:'register'}" class="font-medium text-indigo-600 hover:text-indigo-500">
          Don't have an account ? Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import JwtService          from "@/services/jwt.service";

export default {
  name   : "UserLogin",
  data   : () => ({
    form  : {
      email   : "",
      password: ""
    },
    errors: []
  }),
  methods: {
    login() {
      let form = {
        ...this.form,
        firebase_token: JwtService.getFirebaseToken()
      }
      ApiService.post('/login', form).then((res) => {
        JwtService.saveToken(res.data.access_token);
        JwtService.saveLoggedUser('user');
        localStorage.setItem("expires_at", res.data.expires_at);
        ApiService.init();
        NotificationService.success(res.data.message);
        if (localStorage.getItem('redirect_values')) {
          let values = JSON.parse(localStorage.getItem('redirect_values'))
          this.$router.push({'name': 'bookingNow', params: {uuid: values.uuid}});
        } else {
          this.$router.push({name: "userDashboard"});
        }
      }).catch(errors => {
        NotificationService.error(errors.response.data.message);
      });
    }
  }
}
</script>
