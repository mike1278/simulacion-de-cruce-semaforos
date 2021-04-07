<template>
  <div class="flex-auto flex flex-col items-center">
    <div class="flex flex-col items-center relative">
      <div class="w-full">
        <div class="mt-2 bg-white p-1 flex border border-gray-200 rounded">
          <div class="flex flex-auto flex-wrap"></div>
          <input
            v-model="searched"
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            @focus="isFocus = true"
            @blur="isFocus = false"
          />
          <div>
            <button
              class="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200"
          >
            <button
              class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather transform transition feather-chevron-up w-4 h-4"
                :class="isFocus ? '' : 'rotate-180'"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        v-show="isFocus"
        class="absolute shadow top-full z-40 w-full lef-0 rounded max-h-select overflow-y-auto"
      >
        <div class="flex flex-col w-full">
          <div
            v-for="(option, i) in filtered"
            :key="i + 'select'"
            class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
            @click.prevent.stop="select(option)"
          >
            <div
              class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-blue-600 hover:text-white"
              :class="
                value === reduce(option)
                  ? 'border-blue-600'
                  : 'hover:border-blue-600'
              "
            >
              <div class="w-full items-center flex">
                <div class="mx-2 leading-6">
                  {{ text(option) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    options: {
      type: Array as () => Array<string | number | Object>,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    reduce: {
      type: [Function],
      default: (val: any): any => val,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null,
    },
  },
  data() {
    return {
      searched: '',
      isFocus: false,
    }
  },
  computed: {
    selected() {
      return this.options.filter((value) => {
        // @ts-ignore
        return this.reduce(value) === value
      })[0]
    },
    filtered() {
      // @ts-ignore
      return this.searched === ''
        ? this.options
        : this.options.filter((value) => {
            return (
              // @ts-ignore
              this.text(value)
                .toLowerCase()
                // @ts-ignore
                .includes(this.searched.toLowerCase())
            )
          })
    },
  },
  methods: {
    select(selected: any) {
      // @ts-ignore
      this.$emit('input', this.reduce(selected))
    },
    text(option: any): String {
      // @ts-ignore
      return this.label !== '' ? option[this.label] : option
    },
  },
})
</script>
