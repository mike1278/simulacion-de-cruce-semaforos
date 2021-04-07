import Vue from 'vue'

export default Vue.extend({
  render(h) {
    return h(
      'div',
      {
        class: 'ml-2 text-red-700 text-sm',
      },
      this.$slots.default
    )
  },
})
