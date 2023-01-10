<template>
  <div class="flex shadow-md">
    <div class="w-1/2 bg-white px-10 py-10">
      <div class="flex justify-between border-b pb-2">
        <h1 class="font-semibold text-2xl">Room Details</h1>
      </div>
      <div class="w-full p-6 flex flex-col shadow-lg">
        <RoomComponent :room="room"/>
      </div>

      <router-link :to="{name:'home'}" href="javascript:void(0)"
                   class="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
        </svg>
        Back to Home
      </router-link>
    </div>
    <div id="summary" class="w-1/2 px-8 py-10">
      <h1 class="font-semibold text-2xl border-b pb-2">Book Summary</h1>
      <div class="flex justify-between mt-2 mb-5">
        <span class="font-semibold text-sm">Sub Total: {{ room.price |numberFormat }}</span>
      </div>
      <form @submit.prevent="bookingSubmit">
        <div class="border-t pb-2">
          <label class=" font-medium inline-block mb-3 text-sm uppercase">Check In</label>
          <input required v-model="form.check_in" class="block p-2 text-gray-600 w-full text-sm" type="datetime-local">
        </div>
        <div class="border-t pb-2">
          <label class=" font-medium inline-block mb-3 text-sm uppercase">Check Out</label>
          <input required v-model="form.check_out" class="block p-2 text-gray-600 w-full text-sm" type="datetime-local">
        </div>
        <div class="py-2">
          <label for="note" class="font-semibold inline-block mb-3 text-sm uppercase">Contact Number: </label>
          <input required placeholder="Contact Number" id="note" v-model="form.customer_number" type="text"
                 class="p-2 text-sm w-full"/>
        </div>
        <div class="py-2">
          <label for="note" class="font-semibold inline-block mb-3 text-sm uppercase">Address: </label>
          <textarea required rows="3" placeholder="Address" id="note" v-model="form.address" type="text"
                    class="p-2 text-sm w-full"></textarea>
        </div>

        <div class="py-2">
          <label for="note" class="font-semibold inline-block mb-3 text-sm uppercase">Booking Note</label>
          <textarea rows="3" placeholder="Booking Note" id="note" v-model="form.note" type="text"
                    class="p-2 text-sm w-full"></textarea>
        </div>
        <div class="border-t">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Grand Total</span>
            <span>{{ getGrandTotal | numberFormat }}</span>
          </div>
          <button v-if="user_logged" type="submit"
                  class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Checkout & Place an booking
          </button>
          <button @click="loginFirst()" v-else type="button"
                  class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            login first
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import * as JwtService     from "@/services//jwt.service";
import RoomComponent       from "@/components/RoomComponent.vue";

export default {
  name      : "Cart",
  components: {RoomComponent},
  data      : () => ({
        form       : {
          check_in       : '',
          check_out      : '',
          customer_number: '',
          note           : '',
          address        : '',
        },
        room       : {},
        user_logged: false,
      }
  ),
  computed  : {
    getGrandTotal() {
      return parseFloat(this.room.price);
    }
  },
  mounted() {
    this.user_logged = JwtService.getLoggedUser() == 'user' ? true : false;

    if (this.$route.params.uuid) {
      this.getRoom(this.$route.params.uuid);
    }
    if (localStorage.getItem('redirect_values')) {
      this.form = JSON.parse(localStorage.getItem('redirect_values'));
    }
  },
  methods: {
    getRoom(uuid) {
      ApiService.get(`/room/${uuid}`).then(res => {
        this.room = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
        this.$router.push({name: "home"});
      })
    },
    loginFirst() {
      let values = {
        ...this.form,
        uuid: this.$route.params.uuid,
      }
      localStorage.setItem('redirect_values', JSON.stringify(values));
      this.$router.push({name: 'userLogin'})
    },
    bookingSubmit() {
      Swal.fire({
        title             : 'Are you sure confirm your booking?',
        text              : "Do you want to confirm your booking?",
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes, confirm!'
      }).then((result) => {
        if (result.isConfirmed) {
          let form = {
            ...this.form,
            room_id: this.room.id,
          }
          ApiService.post(`/user/bookings`, form).then(res => {
            this.$router.push({name: "userDashboard"});
            NotificationService.success(res.data.message);
            localStorage.removeItem('redirect_values')
          }).catch(error => {
            NotificationService.error(error.response.data.message);
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    }
  },
}
</script>

<style scoped>

</style>
