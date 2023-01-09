<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="bg-gray-800 pt-3">
      <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-2xl text-white">
        <h3 class="font-bold pl-2">Dashboard</h3>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-600">Total Customers</h5>
              <h3 class="font-bold text-3xl">{{ count.customers }}</h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded-full p-5 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-600">Total Rooms</h5>
              <h3 class="font-bold text-3xl">{{ count.rooms }}</h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div
            class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded-full p-5 bg-indigo-600"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-600">Total Bookings</h5>
              <h3 class="font-bold text-3xl">{{ count.bookings }}</h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>

    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import * as JwtService     from "@/services/jwt.service";

export default {
  name: "AdminDashboard",
  data: () => ({
    count: {
      customers: 0,
      rooms    : 0,
      bookings : 0,
    }
  }),
  mounted() {
    this.getDashboardCountData();
  },
  methods: {
    getDashboardCountData() {
      ApiService.get(`/admin/dashboard`).then((res) => {
        this.count = res.data;
      }).catch(error => {
        if (error?.response?.status == 403) {
          JwtService.destroyToken();
          this.$store.commit("GETUSER", {});
        }
        this.$router.push({name: "userLogin"});
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>
