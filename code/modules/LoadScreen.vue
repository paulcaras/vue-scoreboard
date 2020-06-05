<template>
    <div class="init">
        <div class="name">
            <v-icon name="th"></v-icon> <span>{{ APP_NAME_FLASH }}</span> <i>scoreboard</i>
        </div>
        <div class="srvr" v-show="isConnecting">
            <span>Server:</span> <i>{{ SERVER_IP }}</i>
        </div>
        <div class="load" v-show="isConnecting">
            establishing connection 
        </div>
        <div class="stat" v-show="isConnecting">
            <span><b></b></span>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/th';

    export default {
        data() {
            return {
                isConnecting: false
            }
        },
        methods: {
            establishConnection() {
                this.isConnecting = true;
                let vm = this;
                window.setTimeout(function(){
                    vm.$router.push('/home/index');
                }, 6000);
            }
        },
        mounted() {
            let vm = this;
            window.setTimeout(this.establishConnection, 7000);
        }
    }
</script>

<style scoped>
    .init { position: relative; height: 100vh; box-sizing: border-box; background-color: #111; }
    .name { position: absolute;  top: 40%;  text-align: center;  width: 100%; }
    .name span { display: inline-block; color: #b2babb;  font-family: "Digital-7";  font-size: 64px; font-weight: bold; text-align: center; -webkit-animation-delay: 1s; -webkit-animation-duration: 4s; -webkit-animation-fill-mode: both;  -webkit-animation-name: bounce; }
    .name i { display: inline-block; color: #303030;  font-family: "Digital-7 Italic";  font-size: 32px; font-weight: bold; text-align: center; -webkit-animation-delay: 1s; -webkit-animation-duration: 4s; -webkit-animation-fill-mode: both;  -webkit-animation-name: bounce; }
    .name svg { width: 112px; height: 112px; color: #13575b; margin-bottom: -18px; margin-right: 8px; -webkit-animation-delay: 2s; -webkit-animation-duration: 6s; -webkit-animation-fill-mode: both;  -webkit-animation-name: bounce; -webkit-animation-iteration-count: infinite; }
    .load {  position: absolute;  bottom: 0;  left: 0;  right: 0;  text-align: right;  padding: 12px 54px 12px 24px;  color: #fff;  font-size: 10px; text-transform: uppercase;  font-family: "Digital-7"; }
    @-webkit-keyframes bounce { 
          0%, 10%, 30%, 50%, 70%, 90%, 100% { -webkit-transform: translateY(0); }
          20% { -webkit-transform: translateY(-30px); } 
          40% { -webkit-transform: translateY(-20px); } 
          60% { -webkit-transform: translateY(-10px); }
          80% { -webkit-transform: translateY(-5px); } 
    }
    .srvr { position: absolute;  bottom: 12px;  left: 24px; color: #a0a0a0;  font-size: 10px; text-transform: uppercase;  font-family: "Digital-7"; }
    .srvr i { margin-left: 6px; color: #000; line-height: 1; background-color: #c0c0c0; padding: 1px 4px; }
    .stat { position: absolute;  bottom: 12px;  right: 24px; }
    .stat span {  display: block; margin: 0 auto; position: relative; background-color: #444; height: 8px; width: 24px; }
    .stat span b { background-color: #fff; height: 8px; top: 0;  width: 2px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 3s;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: alternate; }
    @-webkit-keyframes loaderer { from { left: 0 } to { left: 100%; margin-left: -2px } }
</style>
