<template>
    <div class="main">
        <nav>
            <div><input type="range" :min="adjuster_min" :max="adjuster_max" step="1" v-model="adjuster_val" disabled/></div>
            <div><button @click="sendToArduino('S')" disabled>{{ isStarted ? 'OFF' : 'ON' }}</button></div>
        </nav>
    </div>
</template>

<script>
    const Event = { START: "S", ADJ_LEFT: "ARROWLEFT", ADJ_RIGHT: "ARROWRIGHT" };

    export default {
        data() {
            return {
                isSending: false,
                isStarted: 0,
                adjuster_min: 0,
                adjuster_max: 10,
                adjuster_val: 0
            }
        },
        methods: {
            sendToArduino(keystroke) {
                const isStarted = !this.isStarted;
                switch( keystroke ) {
                    case Event.START:
                        this.isStarted = isStarted;
                        break;
                    case Event.ADJ_LEFT:
                        if( this.adjuster_val > this.adjuster_min )
                            this.adjuster_val--;
                        break;
                    case Event.ADJ_RIGHT:
                        if( this.adjuster_val < this.adjuster_max )
                            this.adjuster_val++;
                        break;
                    default:
                }
                this.$http.get(this.SERVER_URI +"/?&_v="+ (this.adjuster_val*25) +"&s="+ (isStarted ? 1 : 0) +"&_", { timeout: 100, before(e) { console.log("..."); }}).then(res => {}, res => {});
                this.isSending = false;
            }
        },
        mounted() {
            let vm = this;
            window.addEventListener("keyup", function(e) {
                let ks = e.key.toUpperCase();
                if( !vm.isSending ) {
                    vm.isSending = true;
                    vm.sendToArduino(ks);
                }
            });
        }
    }
</script>

<style scoped>
.main {
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fff;
}

nav { display: block; position: absolute; top: 20%; left: 20%; right: 20%; text-align: center; }
</style>
