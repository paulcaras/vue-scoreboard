<template>
	<div class="wrap">
  		<span class="n u">FOULS</span>
  		<span class="v w">{{ fouls }}</span>
	</div>
</template>

<script>
export default {
 	props: ['team', 'foul'],
 	data() {
 		return {
 			totalFouls: 0
 		};
 	},
 	computed: {
 		fouls() {
 			return this.totalFouls;
 		}
 	},
 	watch: {
 		foul: {
 			immediate: true,
	 		handler: function(o, i) {
	 			this.totalFouls = o;
	 		}
	 	}
	}
}
</script>

<style scoped>
	.wrap { margin: 32px auto 0 auto; height: 100px; width: 48px; text-align: center; font-weight: normal; }
	.n { display: block; font-size: 20px; font-family: "Digital-7"; margin-bottom: 4px; }
	.v { width: 48px; background-color: #131313; display: inline-block; font-family: "Digital-7 Italic"; font-size: 64px; ifont-weight: bold; line-height: 1; padding: 2px 8px; }
</style>


