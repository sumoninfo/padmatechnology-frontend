<template>
  <BookingDetailsShow :booking="booking"/>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import BookingDetailsShow  from "@/components/BookingDetailsShow";

export default {
  name      : "show",
  components: {BookingDetailsShow},
  data      : () => ({
    booking: {},
  }),
  mounted() {
    this.getBooking(this.$route.params.id);
  },
  methods: {
    getBooking(id) {
      let params = {
        type: this.$route.query.type
      }
      ApiService.get(`/user/bookings/${id}`, {params: params}).then((res) => {
        this.booking = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>
