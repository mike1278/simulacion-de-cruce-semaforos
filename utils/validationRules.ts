import { helpers } from 'vuelidate/lib/validators'

// eslint-disable-next-line eqeqeq
const boolean = (value: any) => value == true || value == false
const In = (param: Array<any>) =>
  helpers.withParams(
    { type: 'in value inserted', value: param },
    (value: any) => (value != null ? param.includes(value) : false)
  )

export { boolean, In }
