<template>
  <transition
    enter-active-class="transition ease-out duration-100 transform"
    enter-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75 transform"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-show="show"
      class="top-2 right-2 fixed flex items-center border-l-4 py-2 px-3 shadow-md mb-2"
      :class="'bg-' + variant.color + '-500 border-' + variant.color + '-700'"
    >
      <div
        class="rounded-full bg-white mr-3"
        :class="'text-' + variant.color + '-500'"
      >
        <svg
          v-show="variant.type === 'success'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-check"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
        <svg
          v-show="variant.type === 'info'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-info"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"
          />
          <circle cx="8" cy="4.5" r="1" />
        </svg>
        <svg
          v-show="variant.type === 'warning'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-exclamation"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
          />
        </svg>
        <svg
          v-show="variant.type === 'danger'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-x"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
          />
          <path
            fill-rule="evenodd"
            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
          />
        </svg>
      </div>
      <div class="text-white max-w-xs">{{ message }}</div>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'

const variants = [
  { type: 'info', color: 'blue' },
  { type: 'success', color: 'green' },
  { type: 'danger', color: 'red' },
  { type: 'warning', color: 'yellow' },
]

export default Vue.extend({
  data() {
    return {
      message: '',
      show: false,
      type: 'info',
      time: 3000,
      timeout: null,
    }
  },
  computed: {
    variant(): Object {
      return variants.filter((value) => {
        return value.type === this.type
      })[0]
    },
  },
  watch: {
    show() {
      // @ts-ignore
      this.timeout = setTimeout(() => {
        this.show = false
      }, this.time)
    },
  },
  created() {
    // @ts-ignore
    this.$store._vm.$root.$on('show:toast', (data: any): void => {
      this.message = data.message
      this.type = data.type
      this.$nextTick(() => {
        this.show = true
      })
    })
  },
})
</script>
