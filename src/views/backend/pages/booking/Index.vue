<template>
  <div class="main-content w-full flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="nav ">
      <div class="bg-gray-800 pt-3 ">
        <div
            class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
          <h3 class="font-bold pl-2 text-2xl">Bookings</h3>
        </div>
      </div>
      <form @submit.prevent="getLists()" class="space-y-4 text-gray-700 px-6 py-2 flex-col md:flex-row pb-3">
        <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <select v-model="form.status" @change="getLists()"
                  class="w-full px-2 md:w-1/2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Sort By Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
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
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Booking No.</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Customer</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Check in/ Out</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Subtotal</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Grand Total</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Status</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Action</th>
            </tr>
            </thead>
            <tbody class="bg-white">
            <template v-if="bookings.length">
              <tr v-for="(booking, index) in bookings">
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200 ">{{ booking.booking_no }}</td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  Name: {{ booking.user.name }}<br>
                  Email: {{ booking.user.email }}<br>
                  Phone: {{ booking.user.phone }}
                </td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  {{ booking.check_in | dateTimeFormat }} <br> {{ booking.check_out | dateTimeFormat }}
                </td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  {{ booking.sub_total | numberFormat }}
                </td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  {{ booking.grand_total | numberFormat }}
                </td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  <span
                      class="bg-indigo-700 mb-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 rounded">{{
                      booking.status
                    }}</span>
                  <select v-model="booking.status" @change="onchangeStatus(booking.id, $event)"
                          class="w-full px-2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Sort By Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                  <router-link title="Show Booking" :to="{ name: 'adminBookingShow', params: {id: booking.id }}"
                               class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded mr-1">
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <button v-if="booking.status == 'Pending'" title="Delete" @click="destroy(booking.id)" type="button"
                          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </template>
            <template v-if="!bookings.length">
              <tr>
                <th class="text-center font-weight-bolder h-20" colspan="100%">No data found</th>
              </tr>
            </template>
            </tbody>
          </table>
          <pagination v-if="bookings.length > 0" :pagination="pagination" @paginate="getLists()" :offset="5"/>
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
  name      : "AdminBookings",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 15,
      search  : '',
      status  : '',
    },
    bookings    : [],
  }),
  mounted() {
    this.getLists();
  },
  methods: {
    onchangeStatus(order_id, event) {
      let status = event.target.value;
      ApiService.post(`/admin/status-update/${order_id}/${status}`).then((res) => {
        NotificationService.success(res.data.message);
        this.getLists()
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    },
    getLists() {
      this.$Progress.start();
      let params = {
        ...this.form,
        page: this.pagination.current_page
      }
      ApiService.get(`/admin/bookings`, {params: params}).then((res) => {
        this.bookings     = res.data.data;
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
          ApiService.delete(`/admin/bookings/${id}`,).then(res => {
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
