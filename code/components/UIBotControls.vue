<template>
    <div class="ctrl">
        <div>
            <div class="x">
                <span v-if="isHomeIndex" @click="swapCourt()">SWAP COURT</span>
                <span :class="{ buzz: isBuzz }" v-if="isHomeIndex" @click="clkBuzzer()">♫</span>
                <span v-if="isHomeIndex" @click="pushToWiFi()">⌂</span>
                <span v-if="isGameSetup" @click="goBack()">‹ BACK</span>
            </div>
            <div class="y">
                <span v-if="isHomeIndex" @click="reConnect()" :class="[isConnected ? 'o': 'e']">{{ connection }}</span>
            </div>
            <div class="z">
                <span v-if="isHomeIndex" @click="goLink('game-setup')">GAME SETUP</span>
                <span v-if="isGameSetup" @click="saveEntry()">SAVE ENTRY</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['page'],
        data() {
            return {
                cled: 0,
                isBuzz: false,
                isConnected: false,
                connection: 'RECONNECT'
            }
        },
        computed: {
            isHomeIndex() {
                return this.page == 'home-index';
            },
            isGameSetup() {
                return this.page == 'game-setup';
            }
        },
        methods: {
            clkBuzzer() {
                let vm = this;
                this.$http.get(this.SERVER_URI +'/buzzer', { timeout: 1500, before(e) { vm.isBuzz = true; }}).then(
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
                window.setTimeout(() => this.isBuzz = false, 3000);
            },
            pushToWiFi() {
                this.$emit("pushToWiFi");
            },
            saveEntry() {
                this.$emit('saveEntry');
            },
            swapCourt() {
                this.$emit('swapCourt');
            },
            goLink(link) {
                if( link == 'game-setup' )
                    this.$emit('gameSetupInit');
                    
            },
            goBack() {
                this.$router.go(-1)
            },
            reConnect() {
                let vm = this;
                    this.$http.get(this.SERVER_URI, { 
                        timeout: 3000, 
                        before(e) {
                            vm.connection = 'CONNECTING';
                        }}
                    ).then(
                        res => {
                            vm.isConnected = true;
                            vm.connection = 'CONNECTED';
                        },
                        res => {
                            vm.isConnected = false;
                            vm.connection = 'RECONNECT';
                        }
                    );
            }
        },
        mounted() {
            this.reConnect();
        }
    }
</script>

<style scoped>
    .ctrl { background-color: #0a0a0a; padding: 12px 24px; }
    .ctrl > div { background-color: #0a0a0a; display: grid; grid-template-columns: 342px 40px 342px; width: 720px; margin: 0 auto; }
    .ctrl div div { color: #808080; }
    .ctrl div div svg { width: 14px; height: 14px; color: #808080; margin-bottom: -2px; }
    .ctrl div div span { background-color: #202020; font-size: 14px; color: #b0b0b0; padding: 4px 8px; border: 1px solid #202020; margin: 0 2px; line-height: 1; font-family: "Digital-7"; }
    .ctrl div div span.buzz { background-color: #d0d0d0; font-size: 14px; color: #505050; padding: 4px 8px; border: 1px solid #202020; margin: 0 2px; line-height: 1; font-family: "Digital-7"; }
    .ctrl div div.x { text-align: left; }
    .ctrl div div.y { text-align: center; }
    .ctrl div div.y span { background-color: #404040; }
    .ctrl div div.y span.e { color: #751102; }
    .ctrl div div.y span.o { color: #a0a0a0; }
    .ctrl div div.z { text-align: right; }
    .ctrl span:hover { cursor: pointer; border: 1px inset #111; }
</style>
