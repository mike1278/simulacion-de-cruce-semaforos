<template>
  <div>
    <div
      class="grid grid-cols-3 grid-rows-3 min-h-screen max-h-screen bg-fixed bg-contain bg-center"
      style="background-image: url('/img/cruce-2.jpg')"
    >
      <div></div>
      <div class="flex justify-center overflow-auto">
        <div
          class="h-full w-2/3 sm:w-2/4 lg:w-2/5 md:w-2/6 grid grid-cols-2 gap-x-2"
        >
          <transition-group
            name="traffic1"
            class="bg-gray-600 bg-opacity-50 flex flex-col-reverse items-end justify-start pb-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [0, 0], y: [-250, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[0].cars"
              :key="i + '-0'"
              :exit="{ x: [0, 0], y: [0, 250] }"
              :img="car.image"
              @data-index="i"
            />
          </transition-group>
          <transition-group
            name="traffic1"
            class="bg-gray-600 bg-opacity-50 flex flex-col-reverse items-end justify-start pb-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [0, 0], y: [-250, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[0].cars1"
              :key="i + '-0'"
              :exit="{ x: [0, 0], y: [0, 250] }"
              :img="car.image"
              @data-index="i"
            />
          </transition-group>
        </div>
      </div>
      <div>
        <t-button class="absolute top-2 right-2" @click="modals.general = true">
          Formulas
        </t-button>
      </div>

      <div class="flex items-center overflow-auto">
        <div class="w-full h-2/4 md:h-2/3 grid grid-rows-2 gap-y-2">
          <transition-group
            name="traffic2"
            class="bg-gray-600 bg-opacity-50 flex flex-row-reverse justify-start items-center pr-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [-250, 0], y: [0, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[1].cars"
              :key="i + '-1'"
              :exit="{ x: [0, 250], y: [0, 0] }"
              :img="car.image"
              rotate="rotate-0"
              @data-index="i"
            />
          </transition-group>
          <transition-group
            name="traffic2"
            class="bg-gray-600 bg-opacity-50 flex flex-row-reverse justify-start pr-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [-250, 0], y: [0, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[1].cars1"
              :key="i + '-1'"
              :exit="{ x: [0, 250], y: [0, 0] }"
              :img="car.image"
              rotate="rotate-0"
              @data-index="i"
            />
          </transition-group>
        </div>
      </div>
      <div class="flex flex-col justify-between items-center p-1">
        <traffic-light
          :status="trafficLightStatus(trafficLights[0].active)"
          src="/img/semaforo-r.png"
          class-img="w-full -top-2"
        />
        <div class="flex justify-between w-full">
          <traffic-light
            class="flex-col"
            class-img="h-full top-0 -left-2 max-w-none"
            :status="trafficLightStatus(trafficLights[1].active)"
          />
          <traffic-light
            class="flex-col"
            class-img="h-full top-0 -left-2 max-w-none"
            :status="trafficLightStatus(trafficLights[2].active)"
          />
        </div>
        <traffic-light
          :status="trafficLightStatus(trafficLights[3].active)"
          src="/img/semaforo-r.png"
          class-img="w-full -bottom-2"
        />
      </div>
      <div class="flex items-center overflow-auto">
        <div class="w-full h-2/4 md:h-2/3 grid grid-rows-2 gap-y-2">
          <transition-group
            name="traffic3"
            class="bg-gray-600 bg-opacity-50 flex flex-row justify-start pl-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [250, 0], y: [0, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[2].cars"
              :key="i + '-2'"
              :exit="{ x: [0, -250], y: [0, 0] }"
              :img="car.image"
              rotate="rotate-180"
              @data-index="i"
            />
          </transition-group>
          <transition-group
            name="traffic3"
            class="bg-gray-600 bg-opacity-50 flex flex-row justify-start pl-2"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [250, 0], y: [0, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[2].cars1"
              :key="i + '-2'"
              :exit="{ x: [0, -250], y: [0, 0] }"
              :img="car.image"
              rotate="rotate-180"
              @data-index="i"
            />
          </transition-group>
        </div>
      </div>

      <div></div>
      <div class="flex justify-center overflow-auto">
        <div
          class="h-full w-2/3 sm:w-2/4 lg:w-2/5 md:w-2/6 grid grid-cols-2 gap-x-2"
        >
          <transition-group
            class="flex flex-col justify-start pt-2 items-end"
            name="traffic4"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [0, 0], y: [250, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[3].cars"
              :key="i + '-3'"
              :exit="{ x: [0, 0], y: [0, -250] }"
              :img="car.image"
              rotate="-rotate-90"
              @data-index="i"
            />
          </transition-group>
          <transition-group
            class="flex flex-col justify-start items-end pt-2"
            name="traffic4"
            tag="div"
            :css="false"
            @enter="
              (el, done) => enterElement(el, done, { x: [0, 0], y: [250, 0] })
            "
          >
            <car
              v-for="(car, i) in trafficLights[3].cars1"
              :key="i + '-3'"
              :exit="{ x: [0, 0], y: [0, -250] }"
              :img="car.image"
              rotate="-rotate-90"
              @data-index="i"
            />
          </transition-group>
        </div>
      </div>
      <div></div>
    </div>
    <hr />
    <t-modal
      v-if="ready"
      v-model="modals.general"
      header="Todas las formulas de Semáforos"
    >
      <t-button
        class="mx-1 my-2"
        @click="
          () => {
            modals.pn = true
            modals.general = false
          }
        "
        >Tablas Pn</t-button
      >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div v-for="(traffic, i) in trafficLights" :key="i">
          <h3
            class="py-1 px-2 text-2xl text-center text-gray-600 border border-solid border-gray-300"
          >
            Semáforo N°{{ parseInt(i) + 1 }}
          </h3>
          <p class="border border-solid border-gray-300 border-collapse">
            <span class="py-1 px-1 w-10 inline-block">P0</span>
            =
            <span class="py-3 px-2">{{
              traffic.mathematics.po().toPrecision(4)
            }}</span>
          </p>
          <p class="border border-solid border-gray-300 border-collapse">
            <span class="py-1 px-1 w-10 inline-block">Wq</span>
            =
            <span class="py-3 px-2">{{
              traffic.mathematics.wq().toPrecision(4)
            }}</span>
          </p>
          <p class="border border-solid border-gray-300 border-collapse">
            <span class="py-1 px-1 w-10 inline-block">Ws</span>
            =
            <span class="py-3 px-2">{{
              traffic.mathematics.ws().toPrecision(4)
            }}</span>
          </p>
          <p class="border border-solid border-gray-300 border-collapse">
            <span class="py-1 px-1 w-10 inline-block">lq</span>
            =
            <span class="py-3 px-2">{{
              traffic.mathematics.lq().toPrecision(4)
            }}</span>
          </p>
          <p class="border border-solid border-gray-300 border-collapse">
            <span class="py-1 px-1 w-10 inline-block">ls</span>
            =
            <span class="py-3 px-2">{{
              traffic.mathematics.ls().toPrecision(4)
            }}</span>
          </p>
        </div>
      </div>
    </t-modal>
    <t-modal v-if="ready" v-model="modals.pn" header="Tablas Pn">
      <div class="grid grid-cols-2 md:grid-cols-4 items-start">
        <table
          v-for="(traffic, i) in trafficLights"
          :key="i"
          class="table-auto w-full"
        >
          <caption
            class="text-2xl text-center py-3 border-r border-t border-solid border-gray-300"
          >
            Semáforo N°{{
              parseInt(i) + 1
            }}
          </caption>
          <thead>
            <tr
              class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">N</th>
              <th class="py-3 px-6 text-left">Resultado</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="(data, index) in traffic.mathematics.pN()"
              :key="index"
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span class="font-medium">{{ data.n }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span>{{ data.result.toFixed(4) }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer>
        <div class="flex justify-between">
          <t-button type="button" @click="modals.pn = false"> Cerrar </t-button>
        </div>
      </template>
    </t-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import car from '@/components/car.vue'
import trafficLight from '@/components/trafficLight.vue'
import { Context } from '@nuxt/types/app'
import anime from 'animejs'
import Mathematics from '~/functions/mathematics'

const carObject = {
  id: 0,
  inTime: 0,
  countInReverse: 0,
  useTime: 0,
  image: 0,
}

const trafficLightObject = {
  id: 0 as number,
  time: 0 as number,
  active: 0 as number,
  mathematics: {} as Mathematics,
  newUserInterval: [{}, {}],
  cars: [] as Array<typeof carObject>,
  cars1: [] as Array<typeof carObject>,
}

export default Vue.extend({
  components: {
    car,
    'traffic-light': trafficLight,
  },
  layout: 'simulation',
  asyncData(ctx: Context): Promise<object | void> | object | void {
    const data = ctx.store.getters.get
    if (data.length === 0) {
      return ctx.redirect('/')
    }
  },
  data() {
    return {
      ready: false,
      modals: {
        general: false as boolean,
        pn: false as boolean,
        trafficModalFormulas: false as boolean,
        traffic: {} as typeof trafficLightObject,
      },
      trafficLights: [
        {
          id: 1,
          time: 0 as number,
          active: 0 as number,
          mathematics: {} as Mathematics,
          newUserInterval: [{}, {}],
          cars: [] as Array<typeof carObject>,
          cars1: [] as Array<typeof carObject>,
        },
        {
          id: 2,
          time: 0 as number,
          active: 0 as number,
          mathematics: {} as Mathematics,
          newUserInterval: [{}, {}],
          cars: [] as Array<typeof carObject>,
          cars1: [] as Array<typeof carObject>,
        },
        {
          id: 3,
          time: 0 as number,
          active: 0 as number,
          mathematics: {} as Mathematics,
          newUserInterval: [{}, {}],
          cars: [] as Array<typeof carObject>,
          cars1: [] as Array<typeof carObject>,
        },
        {
          id: 4,
          time: 0 as number,
          active: 0 as number,
          mathematics: {} as Mathematics,
          newUserInterval: [{}, {}],
          cars: [] as Array<typeof carObject>,
          cars1: [] as Array<typeof carObject>,
        },
      ] as Array<typeof trafficLightObject>,
      interval: {},
      seconds: 0,
      isVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      dataSimulation: 'get',
    }),
  },
  mounted() {
    this.interval = setInterval(() => {
      this.processAll()
    }, 500)
    this.trafficLights.forEach((value, index) => {
      value.time =
        this.dataSimulation[index].timeTrafficLight *
        (this.dataSimulation[index].typeTime === 'h' ? 60 : 1) *
        60 *
        1000
      if (index === 0) {
        value.active = value.time
      }
      value.mathematics = new Mathematics(
        this.dataSimulation[index].lambda,
        this.dataSimulation[index].mi,
        this.dataSimulation[index].typeTime,
        this.dataSimulation[index].limit
      )
      value.newUserInterval[0] = setInterval(() => {
        this.addUser(value, value.cars)
      }, value.mathematics.averageArrivalTime() * 60 * 1000)
      value.newUserInterval[1] = setInterval(() => {
        this.addUser(value, value.cars1)
      }, value.mathematics.averageArrivalTime() * 60 * 1000)
    })
    this.$nextTick(() => {
      this.ready = true
    })
  },
  beforeDestroy() {
    // @ts-ignore
    clearInterval(this.interval)
    this.trafficLights.forEach((value) => {
      // @ts-ignore
      clearInterval(value.newUserInterval[0])
      // @ts-ignore
      clearInterval(value.newUserInterval[1])
    })
  },
  methods: {
    trafficLightStatus(time: number): string {
      if (time > 3000) {
        return 'green'
      } else if (time > 0) {
        return 'yellow'
      }
      return 'red'
    },
    addUser(
      trafficLight: typeof trafficLightObject,
      cars: Array<typeof carObject>
    ) {
      if (
        trafficLight.mathematics.limit > 0 &&
        cars.length >= trafficLight.mathematics.limit
      ) {
        return
      }
      const useTime = trafficLight.mathematics.averageUseTime() * 60 * 1000
      cars.push({
        id: cars.length,
        inTime: this.seconds * 1000,
        countInReverse: useTime,
        useTime,
        image: this.randomCarImage(),
      })
    },
    processAll() {
      this.seconds += 500 / 1000
      this.trafficLights.forEach((value, index) => {
        if (value.active < 500) {
          return
        }
        value.active -= 500
        if (value.active < 500) {
          this.trafficLights[
            index < this.trafficLights.length - 1 ? index + 1 : 0
          ].active =
            index < this.trafficLights.length - 1
              ? this.trafficLights[index + 1].time
              : this.trafficLights[0].time
        }
        if (value.cars.length !== 0) {
          const car = value.cars[0]
          if (car.countInReverse > 500) {
            car.countInReverse -= 500
          } else {
            // @ts-ignore
            value.cars.shift()
          }
        }
        if (value.cars1.length !== 0) {
          const car = value.cars1[0]
          if (car.countInReverse > 500) {
            car.countInReverse -= 500
          } else {
            // @ts-ignore
            value.cars1.shift()
          }
        }
      })
    },
    randomTrafficLight(): any {
      return this.trafficLights[Math.floor(Math.random() * 4)]
    },
    randomCarImage(): number {
      return Math.floor(Math.random() * 5 + 1)
    },
    enterElement(el: any, done: any, { x, y }: any) {
      anime({
        targets: el,
        translateX: x,
        translateY: y,
        easing: 'easeInOutSine',
        complete: done,
      })
    },
  },
})
</script>
