<template>
  <div class="wrap">
  	<span class="n">PERIOD</span>
  	<span class="v" @click.left="adjustPeriod(1)" @click.right="adjustPeriod(-1)">{{ period }}</span>
  </div>
</template>

<script>
export default {
 	props: ['period'],
 	data() {
 		return {
 		};
 	},
 	methods: {
 		adjustPeriod(p) {
 			this.$emit("adjustGamePeriodByClick", p);
 		}
 	},
 	computed: {
 	}
 }
</script>

<style scoped>
	.wrap { margin: 0 auto; height: 108px; width: 100px; text-align: center; }
	.n { display: block; color: #fff; font-size: 20px; font-family: "Digital-7"; margin-bottom: 4px; }
	.v { display: block; font-family: "Digital-7 Italic"; font-size: 96px; ifont-weight: bold; background-color: #000; width: 60px; margin: 0 auto; }
</style>


