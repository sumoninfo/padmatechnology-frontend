<template>
  <div class="pt-3 px-3">
    <div class="order-nav ">
      <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl pb-3"
         href="#">
        Approved Bookings
      </a>
      <form @submit.prevent="getLists()" class="border-t space-y-4 text-gray-700 p-5  flex-col md:flex-row pb-3">
        <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
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
    <div class="p-5 md:flex-row">
      <div class="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
        <div
            class="inline-block min-w-full border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full text-left">
            <thead>
            <tr>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Order No.</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Subtotal</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Shipping Cost</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Grand Total</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Status/History</th>
              <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> Action</th>
            </tr>
            </thead>
            <tbody class="bg-white">
            <template v-if="bookings.length">
              <tr v-for="(order, index) in bookings">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">{{ order.order_no }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {{ order.sub_total | numberFormat }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {{ order.shipping_cost | numberFormat }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {{ order.grand_total | numberFormat }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                      class="bg-indigo-700 mb-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 rounded">{{
                      order.status
                    }}</span>
                  <div v-if="order.order_status_history">
                    <span v-if="order.order_status_history.approved">
                     Approved: {{ order.order_status_history.approved | dateFormat }}<br>
                    </span>
                    <span v-if="order.order_status_history.processing">
                     Processing: {{ order.order_status_history.processing | dateFormat }}<br>
                    </span>
                    <span v-if="order.order_status_history.shipped">
                     Shipped: {{ order.order_status_history.shipped | dateFormat }}<br>
                    </span>
                    <span v-if="order.order_status_history.delivered">
                     Delivered: {{ order.order_status_history.delivered | dateFormat }}<br>
                    </span>
                    <span v-if="order.order_status_history.rejected">
                     Rejected: {{ order.order_status_history.rejected | dateFormat }}<br>
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <router-link title="Show Order"
                               :to="{ name: 'userOrderShow', params: {id: order.id }, query:{'type':'delivered'}}"
                               class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded mr-1">
                    <i class="fas fa-eye"></i>
                  </router-link>
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
  name      : "ApprovedBookings",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 15,
      search  : ''
    },
    bookings    : [],
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
      ApiService.get(`/user/delivered-bookings`, {params: params}).then((res) => {
        this.bookings     = res.data.data;
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
