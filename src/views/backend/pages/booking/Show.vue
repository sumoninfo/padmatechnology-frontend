<template>
  <div class="main-content w-full flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="order-nav">
      <div class="bg-gray-800 pt-3">
        <div
            class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
          <h3 class="font-bold pl-2 text-2xl">Order Details</h3>
          <router-link :to="{name:'adminOrders'}"
                       class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded">
            <i class="fas fa-arrow-circle-left"></i> Back
          </router-link>
        </div>
      </div>
    </div>
    <OrderDetailsShow :order="order"/>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Pagination       from "@/components/Pagination";
import OrderDetailsShow from "../../../../components/BookingDetailsShow.vue";

export default {
  name      : "AdminOrderShow",
  components: {OrderDetailsShow, Pagination},
  data      : () => ({
    order: {},
  }),
  mounted() {
    this.getOrder(this.$route.params.id);
  },
  methods: {
    getOrder(id) {
      let params = {
        type: this.$route.query.type
      }
      ApiService.get(`/admin/orders/${id}`, {params: params}).then((res) => {
        this.order = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>
