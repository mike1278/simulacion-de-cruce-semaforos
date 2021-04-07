<template>
  <div>
    <label>
      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="focus:border-blue-500 border-solid border-2 px-2 py-1 flex-1 block w-full rounded sm:text-sm border-gray-300"
        @input="update"
      />
    </label>
    <span class="text-xs ml-2 text-gray-600">{{ description }}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    description: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  methods: {
    update(value: any) {
      this.$emit('input', value.target.value)
    },
  },
})
</script>
