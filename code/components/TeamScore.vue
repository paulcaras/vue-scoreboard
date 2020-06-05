<template>
  <div class="wrap w">
  	<span @click.left="adjustScore(1)" @click.right="adjustScore(-1)" class="v">{{ scoreCount }}</span>
  </div>
</template>

<script>
 export default {
 	props: ['team', 'score'],
 	data() {
 		return {
 			totalScore: 0
 		};
 	},
 	computed: {
 		scoreCount() {
 			return this._formatDigit(this.totalScore, 3);
 		}
 	},
 	methods: {
 		adjustScore(s) {
 			if( this.totalScore >= 0 ) {
 				let temp = this.totalScore;
 				temp += s;
	 			if( temp < 0 )
	 				temp = 0;
	 			this.totalScore = temp;
	 			this.$emit('adjustTeamScoreByClick', { team: this.team, score: this.totalScore })
			} else {
				this.totalScore = 0;
				this.$emit('adjustTeamScoreByClick', { team: this.team, score: this.totalScore })
			}
 		}
 	},
 	watch: {
 		score: {
 			immediate: true,
	 		handler(n, o) {
	 			this.totalScore = n;
	 		}
	 	}
 	}
 }
</script>

<style scoped>
	.wrap { margin: 0 auto; height: 128px; width: 210px; background-color: #000; text-align: center;}
	.wrap span { font-family: "Digital-7 Italic"; font-size: 116px; ifont-weight: bold; }
</style>