import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
  },
  render(h) {
    let element = null
    if (this.link !== '') {
      element = h(
        'a',
        {
          class: '',
          attrs: {
            href: this.link,
            rel: 'noopener noreferrer',
            target: this.target,
          },
        },
        this.$slots.default
      )
    } else {
      element = h(
        'button',
        {
          class: 'button',
        },
        this.$slots.default
      )
    }
    return element
  },
})
