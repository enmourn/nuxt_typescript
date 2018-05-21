<template>
  <div class="city_input">
    <input :value=cityToStr(select_selected) title="some_input" @focus="search_showed = true">
    <div v-show="search_showed">
      <input
        v-model="current_search.query"
        title="some_input"
        v-focus="search_showed"
        @focus="search()"
      >
      <select v-model="select_selected" @scroll="selectScroll" :size="4" title="some_select">
        <option v-for="city in current_search.cities" :value=city>{{ cityToStr(city) }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Provide, Watch } from "nuxt-property-decorator"
  import { City, CurrentSearch, SearchResponse } from '~/types'
  import { AxiosResponse } from 'axios'
  import Timer = NodeJS.Timer;

  @Component({})
  class CityInput extends Vue {
    @Provide() search_showed: boolean = false
    @Provide() city: City | null = null
    @Provide() select_selected: City | null = null

    @Provide() scroll_lock: boolean = false
    @Provide() current_timeout: Timer | null = null
    @Provide() current_search: CurrentSearch = {
      query: '',
      chunk_size: 8,
      offset: 0,
      count: 0,
      cities: []
    }
    @Watch('current_search.query')
    awaitUserTyping() {
      if (this.current_timeout) {
        clearTimeout(this.current_timeout);
      }
      this.current_timeout = setTimeout(() => {
        this.clearCurrentSearch()
        this.search()
        return true
      }, 500);
    }
    @Provide() async search() {
      if (this.current_search.offset !== 0 && this.current_search.offset >= this.current_search.count) return false
      let request: string = `geolocation/city/?q=${this.current_search.query}`
          request += `&offset=${this.current_search.offset}`
          request += `&count=${this.current_search.chunk_size}`
      let res_str: AxiosResponse = await this.$axios.get(request)
      let res: SearchResponse = JSON.parse(res_str.request.response).response
      this.current_search.offset += this.current_search.chunk_size
      this.current_search.count = res.count
      this.current_search.cities.push(...res.items)
      this.scroll_lock = false
    }
    @Provide() clearCurrentSearch() {
      this.current_search.offset = 0
      this.current_search.count = 0
      this.current_search.cities = []
    }
    @Provide() selectScroll(e: any) {
      let o: any = e.target
      if (o.offsetHeight + o.scrollTop >= o.scrollHeight && !this.scroll_lock) {
        this.scroll_lock = true
        this.search()
      }
    }
    @Provide() cityToStr(city : City | null): string {
      return city ? `${city.title}${city.area ? ', ' + city.area : ''}${city.region ? ', ' + city.region : ''}` : ''
    }
    @Watch('select_selected')
    onSelect() {
      this.city = this.select_selected
      this.search_showed = false
      this.clearCurrentSearch()
    }
  }

  CityInput.directive('focus', {
    update: function (el, binding) {
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
    width: 400px;
    position: relative;
    div {
      position: absolute;
      display: grid;
      width: 100%;
      select {
        width: 100%;
      }
    }
  }
</style>