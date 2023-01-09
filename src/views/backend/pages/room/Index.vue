<template>
  <div class="main-content w-full flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="nav ">
      <div class="bg-gray-800 pt-3 ">
        <div
            class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
          <h3 class="font-bold pl-2 text-2xl">Rooms</h3>
          <router-link :to="{name:'adminRoomCreate'}"
                       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            <i class="fas fa-plus-square"></i> Add new
          </router-link>
        </div>
      </div>
      <form @submit.prevent="getLists()" class="space-y-4 text-gray-700 px-6 py-2 flex-col md:flex-row pb-3">
        <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <div class="w-full px-2 md:w-1/2 relative text-gray-700"></div>
          <div class="w-full px-2 md:w-1/2 relative text-gray-700">
            <input placeholder="Search..." v-model="form.search" autocomplete="off"
                   class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                   type="text"/>
            <button type="submit"
                    class="absolute bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 inset-y-0 right-0 flex items-center px-4 font-bold text-white rounded-r-lg">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="px-5 md:flex-row">
      <div class="py-2 w-full">
        <div
            class="inline-block min-w-full border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full text-left">
            <thead>
            <tr>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                #
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Name
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Size
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Maximum Occupancy
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Price
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Image
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Action
              </th>
            </tr>
            </thead>

            <tbody class="bg-white">
            <template v-if="rooms.length">
              <tr v-for="(product, index) in rooms">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">{{ ++index }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.name }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.size }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.maximum_occupancy }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{
                    product.price | numberFormat
                  }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex-shrink-0">
                    <img class="rounded w-2/12" :src="product.image"
                         :alt="product.name">
                  </div>
                  <!--                    <img :src="product.image"/>-->
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <router-link title="Edit" :to="{ name: 'adminRoomEdit', params: {id: product.id }}"
                               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">
                    <i class="fas fa-pencil-alt"></i>
                  </router-link>
                  <button title="Delete" @click="destroy(product.id)" type="button"
                          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </template>
            <template v-if="!rooms.length">
              <tr>
                <th class="text-center font-weight-bolder h-20" colspan="100%">No data found</th>
              </tr>
            </template>
            </tbody>
          </table>
          <pagination v-if="rooms.length > 0" :pagination="pagination" @paginate="getLists()" :offset="5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Pagination          from "@/components/Pagination";

export default {
  name      : "AdminRooms",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 15,
      search  : '',
    },
    rooms     : [],
  }),
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.$Progress.start();
      let params = {
        ...this.form,
        page: this.pagination.current_page
      }
      ApiService.get(`/admin/rooms`, {params: params}).then((res) => {
        this.rooms      = res.data.data;
        this.pagination = res.data.meta;
        this.$Progress.finish();
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    },
    destroy(id) {
      Swal.fire({
        title             : 'Are you sure?',
        text              : "You won't be able to revert this!",
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(`/admin/rooms/${id}`,).then(res => {
            this.getLists();
            NotificationService.success(res.data.message);
          }).catch(error => {
            NotificationService.error(error.response.data.message);
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>
