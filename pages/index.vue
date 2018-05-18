<template>
	<section>
  	<counter></counter>
  	<engine></engine>
		<city-input></city-input>
	</section>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "nuxt-property-decorator"
	import Counter from '~/components/Counter.vue'
	import Engine from '~/components/Engine.vue'
  import CityInput from '~/components/CityInput.vue'

  @Component({
    components: {
      Counter,
			Engine,
			CityInput
    }
  })
  export default class extends Vue {}
</script>

<style type="scss">
	section {
		display: flex;
		align-items: flex-start;
	}
</style>