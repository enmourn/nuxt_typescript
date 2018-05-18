<template>
  <div class="city_input">
    <input v-model="input_text" title="some_input">
    <select :size="select_size" title="some_select">
      <option v-for="city in cities">{{ cityToStr(city) }}</option>
    </select>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide, Watch} from "nuxt-property-decorator"
  import { City, CityResponse } from '~/types'
  import { AxiosResponse } from 'axios'

  @Component({})
  export default class CityInput extends Vue {
    @Provide() input_text: string = ''
    @Provide() select_size: number = 1
    @Provide() cities: Array<City> = []
    @Watch('input_text')
    /**
     * Берет данные из ВК.
     */
    async onInputTextChange() {
      let res_str: AxiosResponse = await this.$axios.get(`geolocation/city/?q=${this.input_text}`)
      let res: CityResponse = JSON.parse(res_str.request.response).response
      this.select_size = Math.min(res.count, 8)
      this.cities = res.items
    }
    @Provide() cityToStr(city : City) {
      return `${city.title}${city.area ? ', ' + city.area : ''}${city.region ? ', ' + city.region : ''}`
    }
  }
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