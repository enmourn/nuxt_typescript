<template>
	<form>
		<input v-model="$store.state.message" placeholder="Введите число"/>
		<button type="button" v-on:click="calc">Посчитать</button>
		<textarea v-model="result"></textarea>
	</form>
</template>

<script lang="ts">
	export default {
		data: () : {result: number} => {
			return {result: 0}
		},
		methods: {
			calc: function() {
				this.result = this.$store.state.counter + parseInt(this.$store.state.message)
			}
		}
	}
</script>

<style lang="scss" scoped>
	form {
		display: flex;
		margin-left: 20px;
		input {
			text-align: center;
			font-size: 20px;
		}
	}
</style>