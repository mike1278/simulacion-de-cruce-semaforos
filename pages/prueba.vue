<template>
  <div v-if="ready">
    <p v-for="i in 40" :key="i">{{ mathematics.averageArrivalTime() }}</p>

<!--    <p class="text-blue-500 mt-20">{{ average }}</p>-->
    <p>{{ mathematics.averageUseTime() }}</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Mathematics from '@/functions/mathematics'

export default Vue.extend({
  layout: 'simulation',
  data() {
    return {
      mathematics: {} as Mathematics,
      ready: false,
    }
  },
  // computed: {
  //   average() {
  //     return this.getAverage() / 20
  //   },
  // },
  mounted() {
    this.mathematics = new Mathematics(25, 30, 'h', 0, 2)
    this.$nextTick(() => {
      this.ready = true
    })
    console.log(Number.parseInt((0.00003).toFixed(4)) === 0)
  },
  methods: {
    getAverage(): number {
      let total = 0
      for (let i = 0; i < 20; i++) {
        total += this.mathematics.averageArrivalTime()
      }
      return total
    },
  },
})
</script>
