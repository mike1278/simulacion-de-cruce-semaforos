import Vue from 'vue'
import toastComponent from '@/components/toast.vue'

// @ts-ignore
export default (context, inject) => {
  const vm = context.store._vm
  inject('toast', {
    success: (message: string) => {
      vm.$root.$emit('show:toast', { message, type: 'success' })
    },
    danger: (message: string) => {
      vm.$root.$emit('show:toast', { message, type: 'danger' })
    },
    warning: (message: string) => {
      vm.$root.$emit('show:toast', { message, type: 'warning' })
    },
    info: (message: string) => {
      vm.$root.$emit('show:toast', { message, type: 'info' })
    },
  })
  Vue.component('Toast', toastComponent)
}
