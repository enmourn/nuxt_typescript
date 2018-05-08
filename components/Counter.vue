<template>
	<div class="counter">
		<span class="counter">Count {{ $store.state.counter }}</span>
		<button v-on:click="$store.commit('increment')">Add</button>
	</div>
</template>

<style lang="scss" scoped>
	.counter {
		span {
			font-size: 25px;
			color: green;
		}
		button {
			display: block;
			width: 80px;
			margin-top: 10px;
			background: red;
			border: none;
			outline: none;
			cursor: pointer;
		}
	}
</style>