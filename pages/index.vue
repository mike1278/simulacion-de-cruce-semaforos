<template>
  <div class="container centered min-h-screen rounded">
    <div class="w-full">
      <div class="flex justify-center">
        <h1
          class="text-5xl w-auto border-solid rounded-md border border-black bg-white bg-opacity-75 text-gray-800 p-6 m-10 text-center tracking-tight"
        >
          Simulador de Colas y Servidores
        </h1>
      </div>
      <form
        class="bg-white gap-y-3 p-3 mx-3 bg-opacity-90 transition rounded-sm grid grid-cols-1 gap-5"
        @submit.prevent="startSimulation"
      >
        <h2 class="text-center text-gray-600 text-2xl">Semáforos</h2>
        <hr class="border-gray-300" />
        <div
          class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-y divide-gray-400"
        >
          <div
            v-for="(traffic, i) in $v.trafficLights.$each.$iter"
            :key="i"
            class="p-3"
            :style="
              (parseInt(i) === 1 ? 'border-top:0;' : '') +
              (parseInt(i) === 2 ? 'border-left:0;' : '')
            "
          >
            <h2 class="text-center text-gray-700 text-xl pb-3">
              N°{{ parseInt(i) + 1 }}
            </h2>
            <div class="flex justify-center">
              <hr class="w-full md:w-1/4 border border-blue-500" />
            </div>
            <div class="grid grid-cols-2 gap-3 mb-3 mt-3">
              <div>
                <t-input
                  v-model.number="traffic.lambda.$model"
                  class="w-full"
                  placeholder="λ (Velocidad de llegada)"
                />
                <span class="text-xs ml-2 text-gray-600"
                  >λ (Velocidad de llegada de los carros)</span
                >
                <feedback
                  v-show="!traffic.lambda.required && traffic.lambda.$dirty"
                >
                  Debe ingresar la velocidad de llegada
                </feedback>
                <feedback
                  v-show="!traffic.lambda.decimal && traffic.lambda.$dirty"
                >
                  La velocidad de llegada tiene que ser un numero
                </feedback>
                <feedback v-show="!traffic.lambda.min && traffic.lambda.$dirty">
                  La cantidad tiene que ser mínimo 0.01
                </feedback>
              </div>
              <div>
                <t-input
                  v-model.number="traffic.mi.$model"
                  class="w-full"
                  placeholder="μ (Cantidad de carros pasan por el semáforo)"
                />
                <span class="text-xs ml-2 text-gray-600"
                  >μ (Cantidad de carros que pasan por el semáforos)</span
                >
                <feedback v-show="!traffic.mi.required && traffic.mi.$dirty">
                  Debe ingresar la velocidad de llegada
                </feedback>
                <feedback v-show="!traffic.mi.decimal && traffic.mi.$dirty">
                  La velocidad de llegada tiene que ser un numero
                </feedback>
                <feedback v-show="!traffic.mi.min && traffic.mi.$dirty">
                  La cantidad tiene que ser mínimo 0.01
                </feedback>
              </div>
              <div>
                <t-input
                  v-model.number="traffic.timeTrafficLight.$model"
                  class="w-full"
                  placeholder="Tiempo que dura el semáforo en verde"
                />
                <span class="text-xs ml-2 text-gray-600"
                  >Ingrese el tiempo que dura el semáforo en verde</span
                >
                <feedback
                  v-show="
                    !traffic.timeTrafficLight.required &&
                    traffic.timeTrafficLight.$dirty
                  "
                >
                  Debe ingresar la cantidad de carros que pasan por el semáforo
                </feedback>
                <feedback
                  v-show="
                    !traffic.timeTrafficLight.decimal &&
                    traffic.timeTrafficLight.$dirty
                  "
                >
                  La cantidad del semáforo tiene que ser un numero
                </feedback>
                <feedback
                  v-show="
                    !traffic.timeTrafficLight.min &&
                    traffic.timeTrafficLight.$dirty
                  "
                >
                  La cantidad tiene que ser mínimo 0.01
                </feedback>
              </div>
              <div>
                <select
                  v-model="traffic.typeTime.$model"
                  placeholder="Tipo de tiempo"
                  class="w-full text-gray-600 items-start mt-0 block px-2 transition border-0 border-b-2 border-gray-300 focus:ring-0 hover:border-black text-black placeholder-gray-400 bg-transparent border-gray-300 focus:border-blue-500"
                >
                  <option value="" disabled selected>Seleccione</option>
                  <option
                    v-for="(type, i) in typesTimes"
                    :key="i"
                    :value="type.id"
                  >
                    {{ type.name }}
                  </option>
                </select>
                <label class="text-xs ml-2 text-gray-600"
                  >Tipo de Tiempo: Hora o Minuto</label
                >
                <feedback
                  v-show="!traffic.typeTime.required && traffic.typeTime.$dirty"
                >
                  Debe ingresar un tipo de horario
                </feedback>
              </div>
              <div class="flex items-start">
                <c-checkbox
                  :id="'checkbox' + i"
                  v-model="traffic.hasLimit.$model"
                />
                <label
                  :for="'checkbox' + i"
                  class="ml-2 text-gray-600 cursor-pointer"
                  >{{ traffic.hasLimit.$model ? 'Con' : 'Sin' }} Limites</label
                >
              </div>
              <div>
                <t-input
                  v-show="traffic.hasLimit.$model"
                  v-model="traffic.limit.$model"
                  class="w-full"
                  placeholder="Limite de la cola"
                />
                <span
                  v-show="traffic.hasLimit.$model"
                  class="text-xs ml-2 text-gray-600"
                  >Ingrese el limite de la cola</span
                >
              </div>
            </div>
          </div>
        </div>
        <c-button type="submit" class="mt-3 black"
          >Comenzar Simulación</c-button
        >
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  decimal,
  numeric,
  minValue,
  maxLength,
  minLength,
  requiredIf,
} from 'vuelidate/lib/validators'
import { boolean, In } from '~/utils/validationRules'
import button from '~/components/form/button'
import feedback from '~/components/form/feedback'
import checkbox from '~/components/form/checkbox.vue'

export default Vue.extend({
  components: {
    'c-checkbox': checkbox,
    'c-button': button,
    feedback,
  },
  mixins: [validationMixin],
  data() {
    return {
      trafficLights: [
        {
          typeTime: null,
          lambda: 0 as number,
          mi: 0 as number,
          timeTrafficLight: 0 as number,
          hasLimit: false as boolean,
          limit: 0 as number,
        },
        {
          typeTime: null,
          lambda: 0 as number,
          mi: 0 as number,
          timeTrafficLight: 0 as number,
          hasLimit: false as boolean,
          limit: 0 as number,
        },
        {
          typeTime: null,
          lambda: 0 as number,
          mi: 0 as number,
          timeTrafficLight: 0 as number,
          hasLimit: false as boolean,
          limit: 0 as number,
        },
        {
          typeTime: null,
          lambda: 0 as number,
          mi: 0 as number,
          timeTrafficLight: 0 as number,
          hasLimit: false as boolean,
          limit: 0 as number,
        },
      ],
      typesTimes: [
        {
          id: 'h',
          name: 'Horas',
        },
        {
          id: 'm',
          name: 'Minutos',
        },
      ],
    }
  },
  methods: {
    startSimulation(): void {
      this.$v.$touch()
      if (this.$v.$invalid) {
        // @ts-ignore
        return this.$toast.warning('El formulario tiene errores')
      }
      let error = false as Boolean
      this.trafficLights.forEach((value, index) => {
        if (!value.hasLimit && value.lambda / value.mi / 2 > 1) {
          error = true
          // @ts-ignore
          return this.$toast.warning(
            'Los datos de λ y μ en el servidor N°' +
              (index + 1) +
              ' no son validos'
          )
        }
      })
      if (error) {
        return
      }
      this.$store.commit('setData', this.trafficLights)
      this.$router.push('/simulacion-cruce')
    },
  },
  validations: {
    trafficLights: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      $each: {
        mi: {
          required,
          decimal,
          min: minValue(0.01),
        },
        lambda: {
          required,
          decimal,
          min: minValue(0.01),
        },
        timeTrafficLight: {
          required,
          decimal,
          min: minValue(0.01),
        },
        hasLimit: {
          required,
          boolean,
        },
        limit: {
          required: requiredIf((vm) => {
            return vm.hasLimit
          }),
          numeric,
        },
        typeTime: {
          required,
          in: In(['h', 'm']),
        },
      },
    },
  },
})
</script>
<style>
.vs__dropdown-toggle {
  border-radius: 99999px;
}
.vs--open .vs__dropdown-toggle {
  border-radius: 99999px;
}
</style>
