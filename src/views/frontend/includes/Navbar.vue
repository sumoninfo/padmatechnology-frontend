<template>
  <nav id="header" class="w-full z-30 top-0 py-1 shadow-md">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
      <label for="menu-toggle" class="cursor-pointer md:hidden block">
        <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 20 20">
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input class="hidden" type="checkbox" id="menu-toggle"/>

      <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
        <nav>
          <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li>
              <router-link class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                           :to="{ name: 'home'}">Home
              </router-link>
            </li>
            <li>
              <router-link class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                           :to="{ name: 'about'}">About
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="order-1 md:order-2">
        <router-link
            class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            :to="{ name: 'home'}">
          <svg class="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24">
            <path
                d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"/>
          </svg>
          Hotel Reservation System
        </router-link>
      </div>

      <div class="order-2 md:order-3 flex items-center" id="nav-content">
        <div v-if="$store.state.auth.user.id" class="relative inline-block">
          <div class="dropdown inline-block relative">
            <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">Hi, {{ $root.user.name }}</span>
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 z-50">
              <li class="">
                <router-link :to="{name:'userDashboard'}"
                             class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"><i
                    class="fa fa-dashboard fa-fw"></i> Hotel Reservation System
                </router-link>
              </li>
              <li class="">
                <a href="#" @click="logout()"
                   class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"><i
                    class="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
              </li>
            </ul>
          </div>
        </div>
        <router-link v-else class="inline-block no-underline hover:text-black" :to="{name:'userLogin'}">
          <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24">
            <circle fill="none" cx="12" cy="7" r="3"/>
            <path
                d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"/>
          </svg>
        </router-link>

      </div>
    </div>
  </nav>
</template>

<script>
import ApiService          from "@/services/api.service";
import * as JwtService     from "@/services/jwt.service";
import NotificationService from "@/services/notification.service";
import {mapGetters}        from "vuex";
import store               from "../../../store";

export default {
  name    : "Navbar",
  data    : () => ({}),
  computed: {
    ...mapGetters(["totalCarts"])
  },
  methods : {
    toggleDD(myDropMenu) {
      document.getElementById(myDropMenu).classList.toggle("invisible");
    },
    logout() {
      const token = JwtService.getToken();
      if (typeof token != "undefined") {
        ApiService.post('/user/logout').then(res => {
          JwtService.destroyToken();
          this.$store.commit("GETUSER", {});
          NotificationService.success(res.data.message);
          this.$router.push({name: "userLogin"});
        }).catch(error => {
          NotificationService.error(error.response.data.message);
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown:hover .dropdown-menu {
  display: block;
}

#myDropdown {
  a {
    width: 140px;
  }
}
</style>
