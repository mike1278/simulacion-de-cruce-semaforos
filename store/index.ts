const object = {
  lambda: 0 as number,
  mi: 0 as number,
  timeTrafficLight: 0 as number,
  hasLimit: false,
  limit: 0 as number,
  typeTime: 'h' as string,
}

export const state = () => ({
  data: [] as Array<typeof object>,
})

export const mutations = {
  setData(state: any, value: object) {
    state.data = value
  },
  setTypeTime(state: any, value: object) {
    state.typeTime = value
  },
}

export const getters = {
  get(state: any): Array<typeof object> {
    return state.data
  },
}
