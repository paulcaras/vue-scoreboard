<template>
	<div>
		<transition>
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			uri: true,
			transitionName: ''
		}
	},
	methods: {
		connect() {
			let data = this.uri ? 'ON' : 'OFF';
			this.uri = !this.uri;
			this.$http.get("http://192.168.4.1:8080/?APP_DATA_X=&toggle="+data+"&uname=hello&passw=world&APP_DATA_Y=", { timeout: 1000, before(e) { console.log("sending..."); }}).then(
				res => {
					if (res.ok) {
						console.log('sent');
					}
					else {
						console.log('err');
					}
				},
				res => {
					console.log('failed');
				}
			);
		}
	},
	mounted() {
    	//let fetcher = window.setInterval(this.connect, 5000);									
	}
	/**watch: {
	    '$route' (to, from) {
	        const toDepth = to.path.split('/').length;
	        const fromDepth = from.path.split('/').length;
	        this.transitionName = toDepth < fromDepth ? 'slide' : 'slide';
	   	 }
  	} **/
}
</script>



<style scoped>
	.slide-enter-active { -webkit-transition: all 1000ms ease; }
	.slide-leave-active { -webkit-transition: all 1000ms cubic-bezier(1.0, 0.5, 0.8, 1.0); }
	.slide-enter, .slide-leave-to { -webkit-transform: translateX(100%); opacity: 0; }
<style>