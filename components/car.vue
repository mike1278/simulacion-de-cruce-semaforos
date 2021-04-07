<template>
  <div
    class="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 md:w-14 md:h-14 py-1 px-1 flex justify-center items-center"
  >
    <img
      ref="imgCar"
      :src="'/img/carros/' + img + '.png'"
      class="transform max-w-full max-h-full"
      :class="rotate"
      alt="hola"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    img: {
      type: Number,
      default: 1,
    },
    rotate: {
      type: String,
      default: 'rotate-90',
    },
    exit: {
      type: Object,
      default: () => {},
    },
  },
})
</script>
