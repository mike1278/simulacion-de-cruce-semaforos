<template>
  <div>
    <div
      class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
    >
      <input
        type="checkbox"
        name="toggle"
        :checked="value"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        @input="update"
      />
      <label
        class="toggle-label block overflow-hidden w-10 h-6 bg-gray-300 rounded-full cursor-pointer"
        @click="update"
      ></label>
    </div>
    <label class="text-xs text-gray-700" @click="update">{{ label }}</label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    update() {
      this.$emit('input', !this.value)
    },
  },
})
</script>
