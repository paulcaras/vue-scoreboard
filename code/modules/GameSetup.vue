 <template>
    <div class="main">
        <div class="wrapper">
            <div class="t">
                <div></div>
                <div>
                    <time-entry @gameTimeMin="onGameTimeMin" @gameTimeSec="onGameTimeSec"/>
                </div>
                <div></div>
            </div>
            <div class="n">
                <div :class="['l', { active: quoL }]">
                    <input v-model="teamNameH" :disabled="!quoL" maxlength="8"/>
                </div>
                <div class="c">
                </div>
                <div :class="['r', { active: quoR }]">
                    <input v-model="teamNameG" :disabled="!quoR" maxlength="8"/>
                </div>
            </div>
            <div class="p">
                <div :class="['l', { active: quoL }]">
                    <name-entry :team="1" :names="teamNamesH" :position="playerView" :isupdate="isupdate" @showModalByTeam="showModalByTeam" @showModalByName="showModalByName" @removeEntryName="removeEntryName"/>
                </div>
                <div class="c">
                    <span>vs</span>
                </div>
                <div :class="['r', { active: quoR }]">
                    <name-entry :team="2" :names="teamNamesG" :position="playerView" :isupdate="isupdate" @showModalByTeam="showModalByTeam" @showModalByName="showModalByName" @removeEntryName="removeEntryName"/>
                </div>
            </div>
        </div>
        <div class="inputtr" v-show="quoEntryModal">
            <div>
                <div class="m">
                    <div>
                        <span>JERSEY</span>
                        <input v-model="entryModalJersey" autofocus="" required="" maxlength="2"/>
                    </div>
                    <div>
                        <span>PLAYER NAME</span>
                        <input v-model="entryModalName" autofocus="" required="" maxlength="8"/>
                    </div>
                    <div>
                        <span>STARTING PLAYER</span>
                        <i @click="entryModalTop5 = !entryModalTop5;" :class="{ active: entryModalTop5}">CHECK</i>
                    </div>
                </div>
                <div class="c">
                    <span class="i" @click="quoEntryModal = false;">CANCEL</span> <span class="o" @click="submitEntryName()">OKAY</span>
                </div>
            </div>
        </div>

        <div class="cntrllr">
            <u-i-bot-controls :page="'game-setup'" @saveEntry="submitEntryAll"/>
        </div>
    </div>
</template>

<script>
    import UIBotControls from '../components/UIBotControls.vue';
    import NameEntry from '../components/NameEntry.vue';
    import TimeEntry from '../components/TimeEntry.vue';

    export default {
        components: {
            UIBotControls,
            NameEntry,
            TimeEntry
        },
        data() {
            return {
                actionStack: [],
                playerView: 0,
                teamNamesH: [],
                teamNamesG: [],
                entryModalName: '',
                entryModalJersey: '',
                entryModalTop5: true,
                entryModalID: 0,
                entryModalTeam: 1,
                quoL: true,
                quoR: false,
                quoEntryModal: false,
                gameTimeMin: 12,
                gameTimeSec: 0,
                teamNameH: '',
                teamNameG: '',
                scores1: 0,
                scores2: 0,
                isupdate: false,
                isSubmitFromClick: false
            }
        },
        methods: {
            fetchTeams() {
                if( window.erjdata ) {
                    if( window.erjdata.hasOwnProperty('namesH') && window.erjdata.namesH.length > 0 )
                        this.teamNamesH = window.erjdata.namesH.slice();
                    if( window.erjdata.hasOwnProperty('namesG') && window.erjdata.namesG.length > 0 )
                        this.teamNamesG = window.erjdata.namesG.slice();
                    this.teamNameH = window.erjdata.nameH;
                    this.teamNameG = window.erjdata.nameG;
                    this.scores1 = window.erjdata.scores1;
                    this.scores2 = window.erjdata.scores2;
                    this.gameTimeMin = window.erjdata.gameTimeMin;
                    this.gameTimeSec = window.erjdata.gameTimeSec;
                    // window.erjdata = null;
                }
            },
            showL() {
                this.quoL = true;
                this.quoR = false;
            },
            showR() {
                this.quoR = true;
                this.quoL = false;
            },
            onGameTimeSec(v) {
                this.gameTimeSec = v;
            },
            onGameTimeMin(v) {
                this.gameTimeMin = v;
            },
            showModalByTeam(team) {
                this.entryModalJersey = '';
                this.entryModalName = '';
                if( this.quoL && team == 1 )
                    this.quoEntryModal = true;
                if( this.quoR && team == 2 )
                    this.quoEntryModal = true;
            },
            showModalByName({ team, player }) {
                const p = team == 1 ? this.teamNamesH[player] : this.teamNamesG[player];
                this.isSubmitFromClick = true;
                this.entryModalID = player;
                this.entryModalJersey = p.jersey;
                this.entryModalName = p.name;
                this.entryModalTeam = team;
                this.entryModalTop5 =p.isPlay;
                if( this.quoL && team == 1 )
                    this.quoEntryModal = true;
                if( this.quoR && team == 2 )
                    this.quoEntryModal = true;
            },
            submitEntryName() {
                this.noneAction(3);
                if( this.isSubmitFromClick ) {
                    const p = this.entryModalTeam == 1 ? this.teamNamesH[this.entryModalID] : this.teamNamesG[this.entryModalID];
                    p.jersey = this.entryModalJersey;
                    p.name = this.entryModalName;
                    p.isPlay = this.entryModalTop5;
                    this.$set(this.entryModalTeam == 1 ? this.teamNamesH : this.teamNamesG, this.entryModalID, p);
                    this.isSubmitFromClick = false;
                } else {
                    const name = { score: 0, fouls: 0, jersey: this.entryModalJersey, name: this.entryModalName, isPlay: this.entryModalTop5 };
                    if( this.quoL )
                        this.teamNamesH.push(name);
                    if( this.quoR )
                        this.teamNamesG.push(name);
                }
                this.isupdate = !this.isupdate;
                this.quoEntryModal = false;
            },
            removeEntryName({ team, player }) {
                const p = team == 1 ? this.teamNamesH[player] : this.teamNamesG[player];
                p.jersey = "";
                p.name = "";
                this.$set(team == 1 ? this.teamNamesH : this.teamNamesG, player, p);
                this.isupdate = !this.isupdate;
            },
            submitEntryAll() {
                window.erjdata = { namesH: this.teamNamesH, namesG: this.teamNamesG, nameH: this.teamNameH, nameG: this.teamNameG, gameTimeMin: this.gameTimeMin, gameTimeSec: this.gameTimeSec, scores1: this.scores1, scores2: this.scores2 };
                this.$router.push('/name/entry-submit');
            },
            execAction() {
                let aaa = this.actionStack;
                if( aaa[0] == "ARROWLEFT" ) {
                    this.showL();
                    this.quoEntryModal = false;
                }
                if( aaa[0] == "ARROWRIGHT" ) {
                    this.showR();
                    this.quoEntryModal = false;
                }
                if( aaa[1] == "ARROWUP" && this.playerView > 0 ) {
                    this.playerView = this.playerView - 1;
                    this.quoEntryModal = false;
                    this.noneAction(1);
                }
                if( aaa[1] == "ARROWDOWN" && this.playerView < (15 - 1) ) {
                    this.playerView = this.playerView + 1;
                    this.quoEntryModal = false;
                    this.noneAction(1);
                }
                if( aaa[2] == 'ENTER' ) {
                    this.entryModalJersey = '';
                    this.entryModalName = '';
                    this.quoEntryModal = true;
                    this.noneAction(2);
                }
                if( aaa[3] == ' ' ) {
                    this.submitEntryName();
                }
            },
            noneAction(ind) {
                this.$set(this.actionStack, ind, null);
            }
        },
        mounted() {
            this.fetchTeams();
            let vm = this;
            window.addEventListener("keyup", function(e) {
                let ks = e.key.toUpperCase();
                let is_0 = ['ARROWLEFT', 'ARROWRIGHT'].indexOf(ks) > -1,
                    is_1 = ['ARROWUP', 'ARROWDOWN'].indexOf(ks) > -1,
                    is_2 = ['ENTER', ' '].indexOf(ks) > -1;
                if( is_0 || is_1 || is_2 ) {
                    if( is_0 )
                        vm.$set(vm.actionStack, 0, ks);
                    if( is_1 )
                        vm.$set(vm.actionStack, 1, ks);
                    if( ks == 'ENTER' )
                        vm.$set(vm.actionStack, 2, ks);
                    if( ks == ' ')
                        vm.$set(vm.actionStack, 3, ks);
                    vm.execAction();
                }
            });
        },
        destroyed() {
            window.removeEventListener("keyup", function(){});
        }
    }
</script>

<style scoped>
    .main { width: 840px; margin: 0 auto; position: relative; height: 100vh; box-sizing: border-box; padding: 12px 0 0 0; background-color: #070707; }
    .wrapper { width: 720px; margin: 0 auto 48px auto; }

    .cntrllr { position: absolute; bottom: 0; left: 0; right: 0; }

    .inputtr { z-index: 9999; position: absolute; top: 40%; width: 100%; }
    .inputtr > div { background-color: #008177; width: 432px; margin: 0 auto; padding: 0 16px; box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3); background-clip: padding-box; border: none; }
    .inputtr div.m { display: grid; grid-template-columns: 100px 200px 100px; }
    .inputtr div.m div { margin: 8px; }
    .inputtr div.m span { font-family: "Digital-7"; font-size: 12px; color: #eee; display: block; margin-bottom: 2px; }
    .inputtr div.m input { text-align: center; background-color: #015156; font-size: 24px; font-family: "Digital-7"; color: #fff; width: 100%; border: none; }
    .inputtr div.m i { display: inline-block; height: 26px; border: none; padding: 5px 4px; background-color: #015156; font-size: 24px; font-family: "Digital-7"; color: #ddd; width: 64px; font-size: 14px; line-height: 1; text-align: center; font-style: normal; }
    .inputtr div.m i.active { background-color: #eee; color: #015156; }
    .inputtr div.c { text-align: right; padding-bottom: 10px; }
    .inputtr div.c span { margin-left: 6px; display: inline-block; height: 24px; background-color: transparent; padding: 4px 12px; font-size: 12px; line-height: 1; text-align: center; font-family: "Digital-7"; }
    .inputtr div.c span.i { color: #bbb; border: 1px solid #b0b0b0; }
    .inputtr div.c span.o { color: #ddd; border: 1px solid #d0d0d0; }

    .n { display: grid; grid-template-columns: 300px 120px 300px; }
    .n div input { text-align: center; background-color: #000; font-size: 48px; font-family: "Digital-7"; color: #c0c0c0; width: 100%; border: none; }
    .n .l.active input, .n .r.active input { color: #fff; }

    .p { display: grid; grid-template-columns: 300px 120px 300px; }
    .p .c { text-align: center; color: #33677b; font-family: "Digital-7"; font-size: 36px; }

    .p .l >>> .tab, .p .r >>> .tab { background-color: #d0d0d0; }
    .p .l.active >>> .tab, .p .r.active >>> .tab { background-color: #fff; }
    .p .l.active >>> .tab tr.active td, .p .r.active >>> .tab tr.active td { background-color: #d0d3d4; }

    .t { display: grid; grid-template-columns: 210px 300px 210px; margin-bottom: 12px; }
</style>
