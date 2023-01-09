<template>
  <div>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-3/5 bg-white shadow-lg">
        <div class="flex justify-between p-4">
          <div>
            <h1 class="text-xl italic font-extrabold tracking-widest text-indigo-500">Hotel Reservation System</h1>
            <p class="text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
          </div>
          <div class="p-2">
            <ul class="flex">
              <li class="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <span class="text-sm">www.hrs.com</span>
              </li>
              <li class="flex flex-col p-2 border-l-2 border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm"> Dhaka Bangladesh  </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full h-0.5 bg-indigo-500 border"></div>
        <div class="flex justify-between p-4">
          <div>
            <h6 class="font-bold">Booking Date : <span class="text-sm font-medium"> {{ booking.date | dateFormat }}</span>
            </h6>
            <h6 class="font-bold">Booking No : <span class="text-sm font-medium"> {{ booking.booking_no }}</span>
            </h6>
            <h6 class="font-bold">Status :
              <span
                  class="bg-indigo-700 mb-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 rounded">{{
                  booking.status
                }}</span>
            </h6>
          </div>
          <div class="w-40">
            <address class="text-sm">
              <span class="font-bold"> Check in : </span>
              {{ booking.check_in | dateTimeFormat }}
            </address>
            <address class="text-sm">
              <span class="font-bold"> Check out : </span>
              {{ booking.check_out | dateTimeFormat }}
            </address>
          </div>
          <div class="w-40">
            <address class="text-sm">
              <span class="font-bold">Customer Email :</span>
              {{ booking.customer_email }}
            </address>
            <address class="text-sm">
              <span class="font-bold">Customer Number :</span>
              {{ booking.customer_number }}
            </address>
          </div>
          <div></div>
        </div>
        <div class="border border-purple-500 flex flex-col items-center p-2 w-full">
          <RoomComponent :room="booking.room"/>
        </div>
        <div class="w-full">
          <div class="border-b border-gray-200 shadow">
            <table class="w-full h-0.5 bg-indigo-500 border ">

              <tbody class="bg-white text-center">
              <tr class="">
                <td colspan="2"></td>
                <td class="text-sm font-bold">Sub Total</td>
                <td class="text-sm font-bold tracking-wider"><b>{{ booking.sub_total |numberFormat }}</b></td>
              </tr>
              <!--end tr-->
              <!--end tr-->
              <tr class="text-white bg-indigo-500 border">
                <th colspan="2"></th>
                <td class="text-sm font-bold"><b>Grand Total</b></td>
                <td class="text-sm font-bold"><b>{{ booking.grand_total |numberFormat }}</b></td>
              </tr>
              <!--end tr-->

              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-4">
          <div class="w-40">
            <address class="text-sm">
              <span class="font-bold">Note :</span>
              {{ booking.note }}
            </address>
          </div>
          <div>
            <h3 class="text-xl">Terms And Condition :</h3>
            <ul class="text-xs list-disc list-inside">
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
            </ul>
          </div>
          <div class="p-4">
            <h3>Signature</h3>
            <div class="text-4xl italic text-indigo-500">AAA</div>
          </div>
        </div>
        <div class="w-full h-0.5 bg-indigo-500"></div>

        <div class="p-4">
          <div class="flex items-center justify-center">
            Thank you very much for doing business with us.
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RoomComponent from "@/components/RoomComponent.vue";

export default {
  name : "BookingDetailsShow",
  components: {RoomComponent},
  props: ['booking']
}
</script>

<style scoped>

</style>
