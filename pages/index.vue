<template>
	<section>
  	<counter></counter>
  	<engine></engine>
	</section>
</template>

<script lang="ts">
	import { Store } from 'vuex'
	import Counter from '~/components/Counter.vue'
	import Engine from '~/components/Engine.vue'

	export default {
		components: {
			Counter,
			Engine
		}
	}
</script>

<style type="scss">
	section {
		display: flex;
	}
</style>