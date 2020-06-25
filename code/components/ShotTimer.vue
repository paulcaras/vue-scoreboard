<template>
  <div class="wrap w">
  	<span class="v" v-if="team == 1" @click.left="adjustShot(1)" @click.right="adjustShot(-1)">{{ shotClock1 }}</span>
  	<span class="v" v-if="team == 2" @click.left="adjustShot(1)" @click.right="adjustShot(-1)">{{ shotClock2 }}</span>
  </div>
</template>

<script>
export default {
 	props: ['team', 'shots', 'isplay', 'isupdate'],
 	data() {
 		return {
 			timeHandler: null,
 			isTimerPlay1: false,
 			isTimerPlay2: false,
 			playStateSec1: 24,
 			playStateSec2: 24
 		};
 	},
 	computed: {
 		shotClock1() {
 			return this._formatDigit(this.playStateSec1, 2);
 		},
 		shotClock2() {
 			return this._formatDigit(this.playStateSec2, 2);
 		}
 	},
 	methods: {
 		startTimer() {
			this.timeHandler = window.setInterval(this._tick,  1000);
	    },
	    adjustShot(t) {
	    	if( this.team == 1 ) {
  				this.isTimerPlay1 = false;
  				let temp = this.playStateSec1;
                temp += t;
                if (temp >= 0)
                    this.playStateSec1 = temp;
                this.$emit("rtShotClock", [1, this.playStateSec1]);
  			}
  			if( this.team == 2 ) {
  				this.isTimerPlay2 = false;
                let temp = this.playStateSec2;
                temp += t;
                if (temp >= 0)
                    this.playStateSec2 = temp;
                this.$emit("rtShotClock", [2, this.playStateSec2]);
  			}
	    },
	    _tick() {
	    	if( this.team == 1 ) {
  				if( this.playStateSec1 != 0 ) {
		    		if( this.isTimerPlay1 )
		    			this.playStateSec1--;
            this.$emit("rtShotClock", [1, this.playStateSec1]);
		    		return;
		    	}
		    	this.playStateSec1 = 0;
  			}
  			if( this.team == 2 ) {
  				if( this.playStateSec2 != 0 ) {
		    		if( this.isTimerPlay2 )
		    			this.playStateSec2--;
            this.$emit("rtShotClock", [2, this.playStateSec2]);
		    		return;
		    	}
		    	this.playStateSec2 = 0;
  			}
	    }
 	},
 	watch: {
      	isplay(n, o) {
  			if( this.team == 1 ) {
  				this.isTimerPlay1 = !this.isTimerPlay1;
  				this.isTimerPlay2 = false;
  			}
  			if( this.team == 2 ) {
  				this.isTimerPlay1 = false;
  				this.isTimerPlay2 = !this.isTimerPlay2;
  			}
        },
        isupdate(n, o) {
        	if( this.team == 1 ) {
        		this.isTimerPlay1 = false;
        		this.playStateSec1 = this.shots;
        	}
        	if( this.team == 2 ) {
        		this.isTimerPlay2 = false;
        		this.playStateSec2 = this.shots;
        	}
	    }
    },
    mounted() {
    	this.startTimer();
    },
	destroyed() {
    	window.clearInterval(this.timeHandler);
    }
}
</script>

<style scoped>
	.wrap { margin: 0 auto; height: 108px; width: 128px; background-color: #151515; text-align: center; }
	.wrap span { font-family: "Digital-7 Italic"; font-size: 96px; ifont-weight: bold; }
</style>


