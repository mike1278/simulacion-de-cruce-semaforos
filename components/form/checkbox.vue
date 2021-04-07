<template>
  <t-input
    type="checkbox"
    class="w-7 h-7 rounded-full border-2 bg-gray-300 cursor-pointer"
    label="¿Tiene limite de cola?"
    @change="change"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    },
  },
})
</script>
