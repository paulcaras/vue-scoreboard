<template>
  <div class="wrap">
  	<span class="v" @click="isTimerPlay = !isTimerPlay">{{ mins }}:{{ secs }}</span>
  </div>
</template>

<script>
 export default {
 	props: ['isplay', 'keystroke', 'preset'],
 	data() {
 		return {
 			timeHandler: null,
 			isTimerPlay: false,
 			playStateMin: 12,
 			playStateSec: 0
 		};
 	},
 	computed: { 
 		secs() {
 			return this._formatDigit(this.playStateSec, 2);
 		},
		mins() {
			return this._formatDigit(this.playStateMin, 2);
		}
 	},
 	methods: {
 		startTimer() {
			this.timeHandler = window.setInterval(this._tick,  1000);
	    },
	    _tick() {
            this.$emit("rtGameTimer", this.playStateMin*60 - (60-this.playStateSec) + 60);
	    	if( this.playStateSec != 0 ) {
	    		if( this.isTimerPlay )
	    			this.playStateSec--;
	    		return;
	    	}
	    	if( this.playStateMin != 0 ) {
	    	 	if( this.isTimerPlay ) {
	    	 		this.playStateMin--;
	    	 		this.playStateSec = 59;
	    	 	}
	    	 	return;
	    	} 
	    }
 	},
 	watch: {
      	isplay(n, o) {
      		if( n )
      			this.isTimerPlay = true;
      		else
      			this.isTimerPlay = false;
        },
        keystroke: {
        	immediate: true,
        	handler(n, o ) {
        		if( 'R' == n && this.playStateSec == 0 && this.playStateMin == 0 )
        			this.playStateMin = 12;
        	}
        }
    },
    mounted() {
    	this.playStateMin = this.preset[0];
    	this.playStateSec = this.preset[1];
    	this.startTimer();
    },
    destroyed() {
    	window.clearInterval(this.timeHandler);
    }
 }
</script>

<style scoped>
	.wrap { margin: 0 auto; height: 128px; background-color: #000; text-align: center; }
	.wrap span { font-family: "Digital-7 Italic"; font-size: 114px; ifont-weight: bold; }
</style>