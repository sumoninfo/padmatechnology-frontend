<template>
  <div class="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:h-screen z-10 w-full md:w-48">
    <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
      <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">

        <li class="flex-1">
          <router-link :to="{name:'adminDashboard'}"
                       class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white">
            <i class="fa fa-home pr-0 md:pr-3"></i><span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Dashboard</span>
          </router-link>
        </li>
        <li class="flex-1">
          <router-link :to="{name:'adminAmenities'}"
                       :class="{'router-link-exact-active router-link-active': $route.name == 'adminAmenityCreate' || $route.name == 'adminAmenityEdit' }"
                       class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white">
            <i class="fas fa-list-ol pr-0 md:pr-3"></i><span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Amenities</span>
          </router-link>
        </li>
        <li class="flex-1">
          <router-link :to="{name:'adminRooms'}"
                       :class="{'router-link-exact-active router-link-active': $route.name == 'adminRoomCreate' || $route.name == 'adminRoomEdit' }"
                       class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white">
            <i class="fas fa-list-ol pr-0 md:pr-3"></i><span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Rooms</span>
          </router-link>
        </li>
        <li class="flex-1">
          <router-link :to="{name:'adminBookings'}"
                       class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white">
            <i class="fas fa-tasks pr-0 md:pr-3"></i>
            <span
                class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Bookings</span>
          </router-link>
        </li>
        <li class="flex-1">
          <router-link :to="{name:'adminCustomers'}"
                       class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white">
            <i class="fas fa-users pr-0 md:pr-3"></i><span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Customers</span>
          </router-link>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped lang="scss">
.router-link-exact-active.router-link-active {
  border-bottom-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgba(37, 99, 235, var(--tw-border-opacity));

  i {
    --tw-text-opacity: 1;
    color: rgba(37, 99, 235, var(--tw-text-opacity));
  }

  span {
    color: white;
    font-weight: bold;
  }
}
</style>
