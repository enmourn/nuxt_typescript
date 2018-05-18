<template>
  <div class="city_input">
    <input :value=cityToStr(select_selected) title="some_input" @click="select_showed = true">
    <div v-show="select_showed">
      <input v-model="input_text" title="some_input" v-focus="select_showed" @focus="awaitUserTyping()" @blur="select_showed = false">
      <select v-model="select_selected" :size="Math.min(cities.length, chunk_cities)" title="some_select">
        <option v-for="city in cities" :value=city>{{ cityToStr(city) }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide, Watch} from "nuxt-property-decorator"
  import { City, CityResponse } from '~/types'
  import { AxiosResponse } from 'axios'
  import Timer = NodeJS.Timer;

  @Component({})
  class CityInput extends Vue {
    @Provide() select_showed: boolean = false
    @Provide() input_text: string = ''
    @Provide() cities: Array<City> = []
    @Provide() city: City | null = null
    @Provide() select_selected: City | null = null
    @Provide() current_timeout: Timer | null = null;
    @Provide() chunk_cities: number = 8
    @Provide() cityToStr(city : City | null): string {
      if (!city) {
        return ''
      }
      return `${city.title}${city.area ? ', ' + city.area : ''}${city.region ? ', ' + city.region : ''}`
    }
    @Provide() async getCitiesFromVK(offset: number): Promise<Array<City>> {
      let request: string = `geolocation/city/?q=${this.input_text}&offset=${offset}&count=${this.chunk_cities}`
      let res_str: AxiosResponse = await this.$axios.get(request)
      let res: CityResponse = JSON.parse(res_str.request.response).response
      return res.items
    }
    @Watch('input_text')
    awaitUserTyping() {
      if (this.current_timeout) {
        clearTimeout(this.current_timeout);
      }
      this.current_timeout = setTimeout(() => {
        this.getCitiesFromVK(0).then(cities => {
          this.cities = cities
        })
        return true
      }, 500);
    }
    @Watch('select_selected')
    onSelect() {
      this.city = this.select_selected
      this.select_showed = false
      this.input_text = ''
      this.cities = []
    }

  }

  CityInput.directive('focus', {
    // When the bound element is inserted into the DOM...
    update: function (el, binding) {
      // Focus the element
      if (binding.expression) {
        el.focus()
      }
    }
  })
  export default CityInput
</script>

<style lang="scss" scoped>
  .city_input {
    margin-left: 30px;
    display: grid;
    select {
      margin-top: 4px;
    }
  }
</style>