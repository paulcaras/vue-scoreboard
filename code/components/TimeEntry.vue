<template>
	<div class="w">
		<span class="v">
			<input v-model="minutes" maxlength="2" class="m"/>:<input v-model="seconds" maxlength="2" class="s"/>
		</span>
	</div>
</template>

<script>
export default {
 	props: [],
 	data() {
 		return {
 			minutes: '12',
 			seconds: '00',
 		};
 	},
 	watch: {
 		minutes(n, o) {
 			this.$emit('gameTimeMin', parseInt(n));
 		},
 		seconds(n, o) {
 			this.$emit('gameTimeSec', parseInt(n));
 		}
 	}
}
</script>

<style scoped>
	.w { margin: 0 auto; height: 96px; background-color: #000; text-align: center; }
	.v { font-family: "Digital-7 Italic"; font-size: 90px; ifont-weight: bold; color: #ff0000; }
	.v input { background-color: #000; font-size: 90px; font-family: "Digital-7"; color: #ff0000; width: 140px; border: none; }

	input.m { text-align: right; }
	input.s { text-align: left; }
</style>