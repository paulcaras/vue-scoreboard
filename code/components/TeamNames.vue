<template>
    <div class="wrap">
    	<table class="tab" v-if="names.length > 0">
    		<tr>
    			<th>Jersey</th>
    			<th>Player</th>
    			<th :class="['s', { active: isscore }]">Score</th>
    			<th :class="['f', { active: isfouls }]">Fouls</th>
    		</tr>

    		<tr v-for="(t, i) in names" :key="i+(team*7)" :class="{ istop5: t.isPlay == 1, issubp: issubplay && (position == i) }" @click.left="adjustScore(i, 1)" @click.right="adjustScore(i, -1)">
    			<td>{{ t.jersey }}</td>
    			<td>{{ t.name }}</td>
    			<td v-if="t.score > 0" :class="{ active: playerView == i, s: isscore }">{{ t.score }}</td><td v-else :class="{ active: playerView == i, s: isscore }"></td>
    			<td v-if="t.fouls > 0" :class="{ active: playerView == i, f: isfouls }">{{ t.fouls }}</td><td v-else :class="{ active: playerView == i, f: isfouls }"></td>
    		</tr>
    	</table>
    	<table class="tab" v-else>
    		<tr>
    			<th>Jersey</th>
    			<th>Player</th>
    			<th>Score</th>
    			<th>Fouls</th>
    		</tr>
    		<tr>
    			<td colspan="4">-- no players --</td>
    		</tr>
    	</table>
    </div>
</template>

<script>
export default {
 	props: ['team', 'names', 'isscore', 'isfouls', 'issubplay', 'position', 'score', 'foul'],
 	data() {
 		return {
 			playerView: 0,
 		};
 	},
 	watch: {
 		position(n, o) {
 			this.playerView = n;
 		}
 	},
    methods: {
        adjustScore(i, s) {
            this.$emit('adjustNameScoreByClick', { id: i, team: this.team, score: s });
        }
    }
}
</script>

<style scoped>
	.wrap { margin: 24px 0 12px 0; text-align: center; overflow-y: hidden; height: 208px; }
	table { width: 100%; align: center; margin: 0 auto; }
	table tr {}
	table th { font-size: 14px; font-weight: normal; padding: 4px 8px; color: #d0d0d0; border: 1px solid #111; background-color: #212f3d; font-family: "Digital-7"; }
	table td { font-family: "Digital-7"; font-size: 14px; font-weight: normal; padding: 4px 8px; color: #111; border: 1px solid #111; height: 23px; }
	tr.istop5 { background-color: #eafaf1; }
	tr.issubp { background-color: #fdebd0; }
	table th:nth-child(1) { width: 20px; }
	table th:nth-child(2) { width: 120px; }
	table th:nth-child(3) { width: 20px; }
	table th:nth-child(4) { width: 20px; }
</style>


