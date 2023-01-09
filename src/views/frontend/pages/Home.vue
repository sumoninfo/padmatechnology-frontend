<template>
  <section class="bg-white">
    <div class="flex items-center flex-wrap">
      <nav id="store" class="w-full z-30 top-0 px-6 py-1">

        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 pt-3 pb-3 border-b">
          <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
             href="#">
            Rooms and Suites
          </a>
          <div class="flex items-center" id="store-nav-content">
            <a class="pl-3 inline-block no-underline hover:text-black mr-1" href="#">
              <select v-model="form.sort_by" @change="getRooms()"
                      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Sort By</option>
                <option value="ASC">Price low to high</option>
                <option value="DESC">Price high to low</option>
              </select>
            </a>
            <div class="flex flex-col md:flex-row">
              <form @submit.prevent="getRooms()" class="w-full float-right max-w-sm">
                <div class="flex items-center border border-teal-500">
                  <input type="text" placeholder="Search..." v-model="form.search" autocomplete="off"
                         class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                  <button
                      class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2"
                      type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <template v-if="rooms.length">
        <div v-for="(room, index) in rooms" :key="index" class="w-full md:w-1/2 p-6 flex flex-col shadow-lg">
          <RoomComponent :room="room"/>
          <button @click="bookingNow(room)"
                  class="w-11/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Booking
          </button>
        </div>
      </template>
      <template v-if="!rooms.length">
        <div class="text-center font-bold w-full pt-5 h-20">No Room found</div>
      </template>
    </div>
    <pagination v-if="rooms.length>0" :pagination="pagination" @paginate="getRooms()" :offset="5"/>
  </section>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Pagination          from "@/components/Pagination";
import RoomComponent       from "@/components/RoomComponent.vue";

export default {
  name      : "Home",
  components: {RoomComponent, Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 12,
      search  : '',
      sort_by : '',
    },
    rooms     : [],
  }),
  mounted() {
    this.getRooms()
  },
  methods: {
    bookingNow(room) {
      this.$router.push({'name': 'bookingNow', params: {roomId: room.id}});
    },
    getRooms() {
      this.$Progress.start();
      let params = {
        per_page: this.form.per_page,
        page    : this.pagination.current_page,
        search  : this.form.search,
        sort_by : this.form.sort_by,
      };
      ApiService.get(`/rooms`, {params: params}).then((res) => {
        this.rooms      = res.data.data;
        this.pagination = res.data.meta;
        this.$Progress.finish();
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    }
  }
}
</script>

<style scoped>

</style>
