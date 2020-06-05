<template>
 	<div class="wrap">
 		<div v-if="team == 1">
			<span class="s u">SUB</span>
			<span class="in u">IN:</span>
			<span class="id i v">{{ in1 }}</span>
			<span class="out u">OUT:</span>
			<span class="id o v">{{ ou1 }}</span>
		</div>
		<div v-if="team == 2">
			<span class="s u">SUB</span>
			<span class="in u">IN:</span>
			<span class="id i v">{{ in2 }}</span>
			<span class="out u">OUT:</span>
			<span class="id o v">{{ ou2 }}</span>
		</div>
	</div>
</template>

<script>
 export default {
 	props: ['team', 'subpin', 'subpou'],
 	data() {
 		return {
 			in1: '00',
 			in2: '00',
 			ou1: '00',
 			ou2: '00'
 		};
 	},
 	methods: {
 		clearSubs() {
 			this.in1 = '00';
 			this.in2 = '00';
 			this.ou1 = '00';
 			this.ou2 = '00';
 		}
 	},
 	watch: {
 		subpin(n, o) {
 			if( this.team == 1 )
 				this.in1 = n;
 			if( this.team == 2 )
 				this.in2 = n;
 		},
 		subpou(n, o) {
 			if( this.team == 1 )
 				this.ou1 = n;
 			if( this.team == 2 )
 				this.ou2 = n;
 		}
 	}
 }
</script>

<style scoped>
	.wrap { text-align: center; }
	.wrap span { display: inline-block; font-size: 24px; ifont-weight: bold; }
	.s { margin-right: 12px; font-family: "Digital-7"; }
	.id { font-family: "Digital-7 Italic"; }
	.in, .out { font-family: "Digital-7"; margin-left: 4px; }
</style>


