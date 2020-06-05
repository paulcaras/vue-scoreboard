export default {
	state: {
		erjjson: { gameTimer: '12:00', scores1: 0, scores2: 0, shot1: 24, shot2: 24, gamePeriod: 0, fouls1: 0, fouls2: 0 }
	},
	getters: {
		erjjson: state => state.erjjson,
	},
	mutations: {
		setERJData: (state, { name, data }) => {
			state.erjjson[name] = data;
		}
	},
	actions: {
		setERJData: ({ commit }, { name, data }) => {
			console.log(name, " ", data);
			commit('setERJData', { name, data });
		}
	}
}