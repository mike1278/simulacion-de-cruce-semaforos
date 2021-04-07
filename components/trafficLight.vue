<template>
  <div class="flex relative">
    <img
      :src="src"
      alt="semáforo"
      class="absolute"
      :class="classImg"
    />
    <div
      :class="
        status === 'green'
          ? 'from-green-500 to-green-700'
          : 'from-gray-500 to-gray-700'
      "
      class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-radial"
    ></div>
    <div
      :class="
        status === 'yellow'
          ? 'from-yellow-500 to-yellow-700'
          : 'from-gray-500 to-gray-700'
      "
      class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-radial"
    ></div>
    <div
      :class="
        status === 'red'
          ? 'from-red-500 to-red-700'
          : 'from-gray-500 to-gray-700'
      "
      class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-radial"
    ></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    status: {
      type: String,
      default: 'red',
    },
    src: {
      type: String,
      default: '/img/semaforo-l.png',
    },
    classImg: {
      type: String,
      default: '',
    },
  },
})
</script>
