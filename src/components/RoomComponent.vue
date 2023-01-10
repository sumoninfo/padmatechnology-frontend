<template>
  <div>
    <a href="javascript:void(0)">
      <img class="hover:grow hover:shadow-lg mx-auto" style="height: 272px;" :src="room.image"
           :alt="room.name">
    </a>
    <div class="pt-3">
      <h2 class="text-xl font-bold"> {{ room.name }}</h2>
      <div class="col-sm-12 p0">
        <div class="signpost-description">
          <div class="feature">
            <i class="fa fa-arrows-alt"></i>
            <strong> Room Size:</strong><span> {{ room.size }} // 28sqm (302sq-ft)</span>
          </div>
        </div>
        <div class="text component my-2">
          <p v-html="room.description"></p>
        </div>


        <div class="">Price: <span class="text-xl font-bold"> {{ room.price | numberFormat }}</span></div>
        <div class=""> Maximum Occupancy: {{ room.maximum_occupancy }}</div>
        <div class="my-2">Amenities:
          <span v-for="amenity in room.amenities"
                class="p-1 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{
              amenity.name
            }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : "RoomComponent",
  props: {
    room: {type: Object, require: true},
  }
}
</script>

<style scoped>

</style>
