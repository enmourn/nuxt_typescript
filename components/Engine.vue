<template>
	<form>
		<input v-model="message" placeholder="Введите число"/>
		<button type="button" v-on:click="calc">Посчитать</button>
		<textarea v-model="result"></textarea>
	</form>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"

  @Component({})
	export default class Engine extends Vue {
    result: any = null
    message: number = 0
    calc() {
      this.result = this.result + this.message
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