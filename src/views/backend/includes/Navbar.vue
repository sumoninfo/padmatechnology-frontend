<template>
  <!--Nav-->
  <nav class="bg-gray-800 pt-3 md:pt-3 pb-1 px-1 mt-0 fixed w-full z-20 top-0">

    <div class="flex flex-wrap items-center">
      <div class="flex flex-shrink md:w-1/2 justify-center md:justify-start text-white">
        <a href="#">
          <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
        </a>
      </div>
      <div class="flex w-full md:w-1/2 pt-2 content-center justify-between md:justify-end">
        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
          <li class="flex-1 md:flex-none md:mr-3">
            <div class="relative inline-block">
              <button @click="toggleDD('myDropdown')" class="drop-button text-white focus:outline-none"><span
                  class="pr-2"><i class="em em-robot_face"></i></span> Hi, {{ $root.user.name }}
                <svg class="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              <div id="myDropdown"
                   class="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
                <router-link :to="{name:'adminProfile'}" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i
                    class="fa fa-user fa-fw"></i> Profile</router-link>
                <div class="border border-gray-800"></div>
                <a href="#" @click="logout()" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i
                    class="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </nav>
</template>

<script>
import ApiService          from "@/services/api.service";
import * as JwtService     from "@/services/jwt.service";
import NotificationService from "@/services/notification.service";

export default {
  name   : "Navbar",
  methods: {
    logout() {
      const token = JwtService.getToken();
      if (typeof token != "undefined") {
        ApiService.post('/admin/logout').then(response => {
          JwtService.destroyToken();
          this.$router.push({name: "adminLogin"});
          this.$store.commit("GETUSER", {});
          NotificationService.success('Logout successful');
        }).catch(error => {
          NotificationService.error(error.response.data.message);
        })
      }
    },
    toggleDD(myDropMenu) {
      document.getElementById(myDropMenu).classList.toggle("invisible");
    }
  }
}
</script>

<style scoped lang="scss">
#myDropdown {
  a {
    width: 240px;
  }
}
</style>