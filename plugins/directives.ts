import Vue from 'vue'

const isString = (value: any): Boolean => typeof value === 'string'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTarget = ({ modifiers = {}, arg, value }): String => {
  return isString(value)
    ? value
    : isString(arg)
    ? arg
    : Object.keys(modifiers).reverse()[0]
}

Vue.directive('modal', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bind: (el: any, binding, vnode) => {
    const handler = () => {
      // @ts-ignore
      const target = getTarget(binding)
      // @ts-ignore
      vnode.context.$root.$emit(target + 'showModal')
    }
    el.__modal_directive__ = handler
    if (el && el.addEventListener) {
      el.addEventListener('click', handler)
    }
  },
  unbind: (el: any) => {
    const handler = el.__modal_directive__ || {}
    el.removeEventListener('click', handler)
    delete el.__modal_directive__
  },
})
