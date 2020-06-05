<template>
    <div class="main">
        <div class="blocker"></div>
        <div class="wrapper">
            <div class="t">
                <div :class="['l', { active: quo.L, iactive: quo.ST }]">
                    <shot-timer :team="1" :shots="shotTimer1" :isplay="isShotTimerPlay1" :isupdate="isShotTimerUpdate" @rtShotClock="rtShotClock"/>
                </div>
                <div :class="['c', { active: quo.C, iactive: quo.GT }]">
                    <game-timer :isplay="isGameTimerPlay" :keystroke="keyStroke" :preset="[presetGameTimeMin, presetGameTimeSec]" @rtGameTimer="rtGameTimer"/>
                </div>
                <div :class="['r', { active: quo.R, iactive: quo.ST }]">
                    <shot-timer :team="2" :shots="shotTimer2" :isplay="isShotTimerPlay2" :isupdate="isShotTimerUpdate" @rtShotClock="rtShotClock"/>
                </div>
            </div>
            <div class="n">
                <div :class="['l', { active: quo.L }]">
                    <span>{{ teamNameH }}</span>
                </div>
                <div class="c">
                </div>
                <div :class="['r', { active: quo.R }]">
                    <span>{{ teamNameG }}</span>
                </div>
            </div>
            <div class="s">
                <div :class="['l', { active: quo.L, iactive: quo.TS }]">
                    <team-score :team="1" :score="scores1" @adjustTeamScoreByClick="adjustTeamScoreByClick"/>
                </div>
                <div class="q">
                    <div :class="['l', { active: quo.L, iactive: quo.TF }]">
                        <team-fouls :team="1" :foul="fouls1"/>
                    </div>
                    <div :class="['c', { active: quo.C, iactive: quo.GP }]">
                        <game-period :period="gamePeriod"/>
                    </div>
                    <div :class="['r', { active: quo.R, iactive: quo.TF }]">
                        <team-fouls :team="2" :foul="fouls2"/>
                    </div>
                </div>
                <div :class="['r', { active: quo.R, iactive: quo.TS }]">
                    <team-score :team="2" :score="scores2" @adjustTeamScoreByClick="adjustTeamScoreByClick"/>
                </div>
            </div>
            <div class="p">
                <div :class="['l', { active: quo.L }]">
                    <team-names :names="teamNamesH" :isscore="quo.TS" :isfouls="quo.TF" :score="scores1" :foul="fouls1" :issubplay="isSubPlayer1" :position="playerView" :team="1" @adjustNameScoreByClick="adjustNameScoreByClick"/>
                </div>
                <div class="c">
                </div>
                <div :class="['r', { active: quo.R }]">
                    <team-names :names="teamNamesG" :isscore="quo.TS" :isfouls="quo.TF" :score="scores2" :foul="fouls2" :issubplay="isSubPlayer2" :position="playerView" :team="2" @adjustNameScoreByClick="adjustNameScoreByClick"/>
                </div>
            </div>
            <div class="a">
                <div :class="['l', { active: quo.L, iactive: quo.PS }]">
                    <player-sub :subpin="subpin1" :subpou="subpou1" :team="1"/>
                </div>
                <div class="c">
                </div>
                <div :class="['r', { active: quo.R, iactive: quo.PS }]">
                    <player-sub :subpin="subpin2" :subpou="subpou2" :team="2"/>
                </div>
            </div>
        </div>
        <div class="cntrllr">
            <u-i-bot-controls :page="'home-index'" @swapCourt="changeCourt" @gameSetupInit="gameSetupInit" @pushToWiFi="sendRequest"/>
        </div>
    </div>
</template>

<script>
    import GamePeriod from '../components/GamePeriod.vue';
    import GameTimer from '../components/GameTimer.vue';
    import ShotTimer from '../components/ShotTimer.vue';
    import TeamScore from '../components/TeamScore.vue';
    import TeamNames from '../components/TeamNames.vue';
    import TeamFouls from '../components/TeamFouls.vue';
    import PlayerSub from '../components/PlayerSub.vue';

    import UIBotControls from '../components/UIBotControls.vue';

    export default {
        components: {
            GamePeriod,
            TeamScore,
            GameTimer,
            ShotTimer,
            TeamNames,
            TeamFouls,
            PlayerSub,
            UIBotControls
        },
        data() {
            return {
                actionStack: [],
                isProcessing: false,
                lastTeamOpen: 0,
                keyStroke: "",
                isUIEnable: false,
                isGameTimerPlay: false,
                isShotTimerPlay1: false,
                isShotTimerPlay2: false,
                isGamePlay: false,
                isShotTimerUpdate: false,
                isSubPlayer1: false,
                isSubPlayer2: false,
                playerView: 0,
                quo: { L: false, R: false, C: true, ST: false, TS: false, TF: false, PS: false, GT: false, GP: false },
                scores1: 0,
                scores2: 0,
                scoresClk1: 0,
                scoresClk2: 0,
                fouls1: 0,
                fouls2: 0,
                score1: 0,
                score2: 0,
                foul1: 0,
                foul2: 0,
                subpin1: '00',
                subpou1: '00',
                subpin2: '00',
                subpou2: '00',
                gamePeriod: 0,
                gameTimerRT: 0, 
                shotClockRT1: 0,
                shotClockRT2: 0,
                presetGameTimeMin: 12,
                presetGameTimeSec: 0,
                shotTimer1: 0,
                shotTimer2: 0,
                teamNameH: 'HOME',
                teamNameG: 'GUEST',
                teamNamesH: [],
                teamNamesG: []
            }
        },
        methods: {
            showL() {
                if( this.lastTeamOpen == 2 )
                    this.noneAction(1);
                this.lastTeamOpen = 1;
                this.shotTimer1 = 24;
                this.shotTimer2= 24;
                this.isShotTimerPlay2 = false;
                let q = { L: true, R: false, C: true, ST: false, TS: false, TF: false, PS: false, GT: true, GP: true };
                this.quo = q;
            },
            showR() {
                if( this.lastTeamOpen == 1 )
                    this.noneAction(1);
                this.lastTeamOpen = 2;
                this.shotTimer1 = 24;
                this.shotTimer2= 24;
                this.isShotTimerPlay1 = false;
                let q = { L: false, R: true, C: true, ST: false, TS: false, TF: false, PS: false, GT: true, GP: true };
                this.quo = q;
            },
            pushGP() {
                let q = { L: false, R: false, C: true, ST: false, TS: false, TF: false, PS: false, GT: false, GP: true };
                this.quo = q;     
            },
            pushTS() {
                this.quo.ST = false;
                this.quo.TS = true;
                this.quo.TF = false;
            },
            pushTF() {
                this.quo.ST = false;
                this.quo.TS = false;
                this.quo.TF = true;       
            },
            changeCourt() {
                this.dataPushToWindow(true, true);
                this.$router.push('/game/court-change');
            },
            subPlayerSort(t) {
                let nn = [], nt, ts = t == 1 ? [0,1] : [1,0];
                if( this.quo.L )
                    nt = this.teamNamesH.slice();
                if( this.quo.R )
                    nt = this.teamNamesG.slice();
                nt.forEach((v, i) => {
                    if( v.isPlay == ts[0] )
                        nn.push(v);
                });
                nt.forEach((v, i) => {
                    if( v.isPlay == ts[1] )
                        nn.push(v);
                });
                if( this.quo.L )
                    this.teamNamesH = nn.slice();
                if( this.quo.R )
                    this.teamNamesG = nn.slice();
            },
            gameSetupInit() {
                this.dataPushToWindow(true, false);
                this.$router.push('/game/setup');
            },
            dataPushToWindow(is_clear = true, is_swap = false) {
                if( is_swap )
                    window.erjdata = { namesH: this.teamNamesG.slice(), namesG: this.teamNamesH.slice(), nameH: this.teamNameG, nameG: this.teamNameH, gameTimeMin: this.presetGameTimeMin, gameTimeSec: this.presetGameTimeSec, scores1: this.scores2, scores2: this.scores1 };
                else
                    window.erjdata = { namesH: this.teamNamesH.slice(), namesG: this.teamNamesG.slice(), nameH: this.teamNameH, nameG: this.teamNameG, gameTimeMin: this.presetGameTimeMin, gameTimeSec: this.presetGameTimeSec, scores1: this.scores1, scores2: this.scores2 };
                if( is_clear ) {
                    this.teamNamesH = [];
                    this.teamNamesG = [];
                    this.scores1 = 0;
                    this.scores2 = 0;
                }
            },
            adjustTeamScoreByClick({ team, score }) {
                if( team == 1 )
                    this.scores1 = score;
                if( team == 2 )
                    this.scores2 = score;
            },
            adjustNameScoreByClick({ id, team, score }) {
                if( team == 1 ) {
                    const ts = this.teamNamesH[id];
                    ts.score += score;
                    this.$set(this.teamNamesH, id, ts);
                    if( this.scores1 > this.scoresClk1 ) {
                        this.scoresClk1 += score;
                        return;
                    }
                    if( this.scores1 == this.scoresClk1 ) {
                        this.scores1 += score;
                        this.scoresClk1 += score;
                    }
                }
                if( team == 2 ) {
                    const ts = this.teamNamesG[id];
                    ts.score += score;
                    this.$set(this.teamNamesG, id, ts);
                    if( this.scores2 > this.scoresClk2 ) {
                        this.scoresClk2 += score;
                        return;
                    }
                    if( this.scores2 == this.scoresClk2 ) {
                        this.scores2 += score;
                        this.scoresClk2 += score;
                    }
                }
            },
            rtGameTimer(t) {
                this.gameTimerRT = t;
            },
            rtShotClock(s) {
                if( s[0] == 1 )
                    this.shotClockRT1 = s[1];
                if( s[0] == 2 )
                    this.shotClockRT2 = s[1];
            },
            sendRequest() {
                let query = { g: this.isGameTimerPlay ? 1 : 0, m: this.isShotTimerPlay1 ? 1 : 0, n: this.isShotTimerPlay2 ? 1 : 0, u: this.shotClockRT1, v: this.shotClockRT2, t: this.gameTimerRT, a: this.gamePeriod, x: this.scores1, y: this.scores2, p: this.fouls1, q: this.fouls2 };
                let request = "AD_X=&";
                Object.keys(query).forEach( n => {
                    request += n +'='+ query[n] +'&';
                });
                request += "AD_Y=";
                this.$http.get(this.SERVER_URI +"/?"+ request, { timeout: 1500, before(e) { console.log("..."); }}).then(
                    res => {
                        if (res.ok) {
                            console.log('sent');
                        }
                        else {
                            console.log('err');
                        }
                    },
                    res => {
                        console.log('fail');
                    }
                );
            },
            execAction() {
                this.isProcessing = true;
                let aaa = this.actionStack;
                if( 'T' == aaa[0] ) {
                    let tt =  !this.isGameTimerPlay;
                    this.isGameTimerPlay = tt;
                    if( this.quo.L )
                        this.isShotTimerPlay1 = tt;
                    if( this.quo.R )
                        this.isShotTimerPlay2 = tt;
                    if( this.lastTeamOpen == 1 )
                        this.$set(this.actionStack, 0, "ARROWLEFT");
                    if( this.lastTeamOpen == 2 )
                        this.$set(this.actionStack, 0, "ARROWRIGHT");
                    this.sendRequest();
                } else if( 'P' == aaa[0] ) {
                    this.pushGP();
                    if( (aaa[3] == '-' || aaa[3] == ',') && this.gamePeriod > 0 ) {
                        this.fouls1 = 0;
                        this.fouls2 = 0;
                        this.gamePeriod = this.gamePeriod - 1;
                        this.sendRequest();
                    }
                    if( (aaa[3] == '=' || aaa[3] == '.') && this.gamePeriod < 5 ) {
                        this.fouls1 = 0;
                        this.fouls2 = 0;
                        this.gamePeriod = this.gamePeriod + 1;
                        this.sendRequest();
                    }
                    this.noneAction(3);
                } else if( ' ' == aaa[0] ) {
                    if( this.isGameTimerPlay ) {
                        if( this.lastTeamOpen == 1 ) {
                            this.isShotTimerPlay1 = !this.isShotTimerPlay1;
                            this.$set(this.actionStack, 0, "ARROWLEFT");
                        }
                        if( this.lastTeamOpen == 2 ) {
                            this.isShotTimerPlay2 = !this.isShotTimerPlay2;
                            this.$set(this.actionStack, 0, "ARROWRIGHT");
                        }
                        this.sendRequest();
                    }
                } else if( aaa[0] == "ARROWLEFT" ) {
                    this.showL();
                    switch( aaa[1] ) {
                        case 'S':
                            this.pushTS();
                            if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                this.playerView--;
                                this.noneAction(2);
                            }
                            if( aaa[2] == "ARROWDOWN" && (this.playerView < 4) ) {
                                this.playerView++;
                                this.noneAction(2);
                            }
                            if( ['1', '2', '3'].indexOf(aaa[3]) > -1 ) {
                                this.score1 = Number(aaa[3]);
                                let score = Number(aaa[3]);
                                if( this.scores1 > this.scoresClk1 ) {
                                    this.scoresClk1 += score;
                                    if( this.scoresClk1 > this.scores1 ) {
                                        this.scores1 = this.scoresClk1;
                                    }
                                } else if( this.scores1 == this.scoresClk1 ) {
                                    this.scores1 += score;
                                    this.scoresClk1 += score;
                                } else if( this.scoresClk1 > this.scores1 ) {
                                    this.scores1 = this.scoresClk1;
                                }
                                const ts = this.teamNamesH[this.playerView];
                                ts.score += score;
                                this.$set(this.teamNamesH, this.playerView, ts);
                                this.sendRequest();
                                this.noneAction(3);
                            }
                            break;
                        case 'B':
                            this.shotTimer1 = 24;
                            this.isShotTimerUpdate = !this.isShotTimerUpdate;
                            this.noneAction(1);
                            break;
                        case 'V':
                            this.shotTimer1 = 14;
                            this.isShotTimerUpdate = !this.isShotTimerUpdate;
                            this.noneAction(1);
                            break;
                        case ' ':
                            this.isShotTimerPlay1 = !this.isShotTimerPlay1;
                            this.sendRequest();
                            break;
                        case 'F':
                            this.pushTF();
                            if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                this.playerView = this.playerView - 1;
                                this.noneAction(2);
                            }
                            if( aaa[2] == "ARROWDOWN" && this.playerView < 4 ) {
                                this.playerView = this.playerView + 1;
                                this.noneAction(2);
                            }
                            if( aaa[3] == ',' && this.fouls1 > 0 ) {
                                this.foul1 = -1;
                                this.fouls1 = this.fouls1 - 1;
                                let tf = this.teamNamesH[this.playerView];
                                tf.fouls -= 1;
                                this.$set(this.teamNamesH, this.playerView, tf);
                                this.sendRequest();
                                this.noneAction(3);
                            }
                            if( aaa[3] == '.' && this.fouls1 < 5 ) {
                                this.foul1 = 1;
                                this.fouls1 = this.fouls1 + 1;
                                let tf = this.teamNamesH[this.playerView];
                                tf.fouls += 1;
                                this.$set(this.teamNamesH, this.playerView, tf);
                                this.sendRequest();
                                this.noneAction(3);
                            }
                            break;
                        case 'U':
                            this.isSubPlayer1 = true;
                            if( this.subpin1 == '00' ) this.subPlayerSort(1);
                            if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                this.playerView = this.playerView - 1;
                                this.noneAction(2);
                            }
                            if( aaa[2] == "ARROWDOWN" && this.playerView < 7 ) {
                                this.playerView = this.playerView + 1;
                                this.noneAction(2);
                            }
                            if( this.subpin1 == '00' && aaa[3] == 'I' ) {
                                this.subpin1 = this.teamNamesH[this.playerView].jersey;
                                this.teamNamesH[this.playerView].isPlay = 1;
                                this.subPlayerSort(2);
                            }
                            if( this.subpou1 == '00' && aaa[3] == 'O' ) {
                                this.subpou1 = this.teamNamesH[this.playerView].jersey;
                                this.teamNamesH[this.playerView].isPlay = 0;
                                this.subPlayerSort(0);
                                this.isSubPlayer1 = false;
                                this.playerView = 0;
                                window.setTimeout(() => {
                                    this.subpin1 = '00';
                                    this.subpou1 = '00';
                                }, 10000);
                                this.noneAction(1);
                            }
                            break;
                    }
                    this.noneAction(2);
                    this.noneAction(3);
                } else if( aaa[0] == "ARROWRIGHT" ) {
                    this.showR();
                    switch( aaa[1] ) {
                        case 'S':
                            this.pushTS();
                            if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                this.playerView = this.playerView - 1;
                                this.noneAction(2);
                            }
                            if( aaa[2] == "ARROWDOWN" && this.playerView < 4 ) {
                                this.playerView = this.playerView + 1;
                                this.noneAction(2);
                            }
                            if( ['1', '2', '3'].indexOf(aaa[3]) > -1 ) {
                                this.score2 = Number(aaa[3]);
                                let score = Number(aaa[3]);
                                if( (this.scores2 > this.scoresClk2) ) {
                                    this.scoresClk2 += score;
                                    if( this.scoresClk2 > this.scores2 ) {
                                        this.scores2 = this.scoresClk2;
                                    }
                                } else if( this.scores2 == this.scoresClk2 ) {
                                    this.scores2 += score;
                                    this.scoresClk2 += score;
                                } else if( this.scoresClk2 > this.scores2 ) {
                                    this.scores2 = this.scoresClk2;
                                }
                                let ts = this.teamNamesG[this.playerView];
                                ts.score += score;
                                this.$set(this.teamNamesG, this.playerView, ts);
                                this.sendRequest();
                                this.noneAction(3);
                                }
                            break;
                        case 'B':
                            this.shotTimer2 = 24;
                            this.isShotTimerUpdate = !this.isShotTimerUpdate;
                            this.noneAction(1);
                            break;
                        case 'V':
                            this.shotTimer2 = 14;
                            this.isShotTimerUpdate = !this.isShotTimerUpdate;
                            this.noneAction(1);
                            break;
                        case ' ':
                            this.isShotTimerPlay2 = !this.isShotTimerPlay2;
                            this.sendRequest();
                            break;
                        case 'F':
                                this.pushTF();
                                if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                    this.playerView = this.playerView - 1;
                                    this.noneAction(2);
                                }
                                if( aaa[2] == "ARROWDOWN" && this.playerView < 4 ) {
                                    this.playerView = this.playerView + 1;
                                    this.noneAction(2);
                                }
                                if( aaa[3] == ',' && this.fouls2 > 0 ) {
                                    this.foul2 = -1;
                                    this.fouls2 = this.fouls2 - 1;
                                    let tf = this.teamNamesG[this.playerView];
                                    tf.fouls -= 1;
                                    this.$set(this.teamNamesG, this.playerView, tf);
                                    this.sendRequest();
                                    this.noneAction(3);
                                }
                                if( aaa[3] == '.' && this.fouls2 < 5 ) {
                                    this.foul2 = 1;
                                    this.fouls2 = this.fouls2 + 1;
                                    let tf = this.teamNamesG[this.playerView];
                                    tf.fouls += 1;
                                    this.$set(this.teamNamesG, this.playerView, tf);
                                    this.sendRequest();
                                    this.noneAction(3);
                                }
                            break;
                        case 'U':
                            this.isSubPlayer2 = true;
                            if( this.subpin2 == '00' ) this.subPlayerSort(1);
                            if( aaa[2] == "ARROWUP" && this.playerView > 0 ) {
                                this.playerView = this.playerView - 1;
                                this.noneAction(2);
                            }
                            if( aaa[2] == "ARROWDOWN" && this.playerView < 7 ) {
                                this.playerView = this.playerView + 1;
                                this.noneAction(2);
                            }
                            if( this.subpin2 == '00' && aaa[3] == 'I' ) {
                                this.subpin2 = this.teamNamesG[this.playerView].jersey;
                                this.teamNamesG[this.playerView].isPlay = 1;
                                this.subPlayerSort(2);
                            }
                            if( this.subpou2 == '00' && aaa[3] == 'O' ) {
                                this.subpou2 = this.teamNamesG[this.playerView].jersey;
                                this.teamNamesG[this.playerView].isPlay = 0;
                                this.subPlayerSort(0);
                                this.isSubPlayer2 = false;
                                this.playerView = 0;
                                window.setTimeout(() => {
                                    this.subpin2 = '00';
                                    this.subpou2 = '00';
                                }, 10000);
                                this.noneAction(1);
                            }
                            break;
                    }
                    this.noneAction(3);
                }
                this.isProcessing = false;
            },
            noneAction(ind) {
                this.$set(this.actionStack, ind, null); 
            }
        },
        mounted() {
            let vm = this;
            window.addEventListener("keyup", function(e) {
                let ks = e.key.toUpperCase();
                let is_n = vm.KEY_CONTROLS.navi.indexOf(ks) > -1,
                    is_m = vm.KEY_CONTROLS.mode.indexOf(ks) > -1,
                    is_v = vm.KEY_CONTROLS.view.indexOf(ks) > -1,
                    is_s = vm.KEY_CONTROLS.shot.indexOf(ks) > -1;
                if( is_n || is_m || is_v || is_s ) {
                    if( is_n )
                        vm.$set(vm.actionStack, 0, ks);
                    if( is_m )
                        vm.$set(vm.actionStack, 1, ks);
                    if( is_v )
                        vm.$set(vm.actionStack, 2, ks);
                    if( is_s )
                        vm.$set(vm.actionStack, 3, ks);
                    this.keyStroke = ks;
                    if( !this.isProcessing )
                        vm.execAction();
                }
            });
        },
        created() {
            if( window.erjdata ) {
                if( window.erjdata.hasOwnProperty('namesH') && window.erjdata.namesH.length > 0 )
                    this.teamNamesH = window.erjdata.namesH.slice();
                if( window.erjdata.hasOwnProperty('namesG') && window.erjdata.namesG.length > 0 )
                    this.teamNamesG = window.erjdata.namesG.slice();
                this.teamNameH = window.erjdata.nameH;
                this.teamNameG = window.erjdata.nameG;
                this.scores1 = window.erjdata.scores1;
                this.scores2 = window.erjdata.scores2;
                this.scoresClk1 = window.erjdata.scores1;
                this.scoresClk2 = window.erjdata.scores2;
                this.presetGameTimeMin = window.erjdata.gameTimeMin;
                this.presetGameTimeSec = window.erjdata.gameTimeSec;
                window.erjdata = null;
            } else {
                this.teamNameH = 'HOME';
                this.teamNameG = 'GUEST';
                this.presetGameTimeMin = 12;
                this.presetGameTimeSec = 0;
                this.teamNamesH = [
                        { score: 0, fouls: 0, name: "a", jersey: "01", isPlay: 1 },
                        { score: 0, fouls: 0, name: "b", jersey: "02", isPlay: 1 },
                        { score: 0, fouls: 0, name: "c", jersey: "03", isPlay: 1 },
                        { score: 0, fouls: 0, name: "d", jersey: "04", isPlay: 1 },
                        { score: 0, fouls: 0, name: "e", jersey: "05", isPlay: 1 },
                        { score: 0, fouls: 0, name: "f", jersey: "06", isPlay: 0 },
                        { score: 0, fouls: 0, name: "g", jersey: "07", isPlay: 0 },
                        { score: 0, fouls: 0, name: "h", jersey: "08", isPlay: 0 }
                    ];
                this.teamNamesG = [
                        { score: 0, fouls: 0, name: "s", jersey: "90", isPlay: 1},
                        { score: 0, fouls: 0, name: "t", jersey: "91", isPlay: 1},
                        { score: 0, fouls: 0, name: "u", jersey: "92", isPlay: 1},
                        { score: 0, fouls: 0, name: "v", jersey: "93", isPlay: 1},
                        { score: 0, fouls: 0, name: "w", jersey: "94", isPlay: 1},
                        { score: 0, fouls: 0, name: "x", jersey: "95", isPlay: 0},
                        { score: 0, fouls: 0, name: "y", jersey: "96", isPlay: 0},
                        { score: 0, fouls: 0, name: "z", jersey: "97", isPlay: 0}
                    ];
            }

            let gameTimer = this.presetGameTimeMin +':'+ this.presetGameTimeSec;          
        },
        destroyed() {
            this.actionStack = [];
            window.removeEventListener("keyup", function(){});
        }
    }
</script>

<style scoped>
    .main { margin: 0 auto; width: 840px; position: relative; height: 100vh; box-sizing: border-box; background-color: #070707; padding: 0 0 16px 0; }
    .wrapper { width: 720px; margin: 8px auto 0 auto; }
    .blocker { background-color: #0a0a0a; height: 8px; }
    .cntrllr { position: absolute; bottom: 0; left: 0; right: 0; }

    .t { display: grid; grid-template-columns: 180px 360px 180px; }
    .n { display: grid; grid-template-columns: 210px 300px 210px; }
    .n div.l, .n div.r { font-size: 48px; text-align: center; padding: 4px 0 4px 0; font-family: "Digital-7"; background-color: #191919; margin: 4px 0; line-height: 1; }
    .s { display: grid; grid-template-columns: 210px 300px 210px; }
    .s .q { display: grid; grid-template-columns: 100px 100px 100px; }
    .p { display: grid; grid-template-columns: 320px 80px 320px; }
    .a { display: grid; grid-template-columns: 320px 80px 320px; }

    .l >>> .v, .r >>> .v { color: #2f0000; }
    .l.active >>> .v, .r.active >>> .v { color: #cf0000; }
    .l.active.iactive >>> .v, .r.active.iactive >>> .v { color: #ff0000; }
    .l.active.iactive >>> .w, .r.active.iactive >>> .w { background-color: #000; }

    .n .l, .n .r, .l >>> .u, .r >>> .u { color: #c0c0c0; }
    .n .l.active, .n .r.active, .l.active >>> .u, .r.active >>> .u { color: #d0d0d0; }
    .q .l.active.iactive >>> .u, .q .r.active.iactive >>> .u { color: #fff; }
    .q .l.active.iactive >>> .w, .q .r.active.iactive >>> .w { background-color: #000; }

    .p .l >>> .tab, .p .r >>> .tab { background-color: #d0d0d0; }
    .p .l.active >>> .tab, .p .r.active >>> .tab { background-color: #fff; }
    .p .l.active >>> .tab th, .p .r.active >>> .tab th { color: #fff; }
    .p .l.active >>> .tab th.s.active, .p .r.active >>> .tab th.s.active { background-color: #154360; color: #fff; border: 1px solid #154360; }
    .p .l.active >>> .tab th.f.active, .p .r.active >>> .tab th.f.active { background-color: #7b241c; color: #fff; border: 1px solid #7b241c; }
    .p .l.active >>> .tab td.s.active, .p .r.active >>> .tab td.s.active { background-color: #7fb3d5; color: #111; }
    .p .l.active >>> .tab td.f.active, .p .r.active >>> .tab td.f.active { background-color: #d98880; color: #111; }

    .c >>> .v { color: #ff0000; }
    .c.active >>> .v { color: #2f0000; }
    .c.active.iactive >>> .v { color: #ff0000; }
</style>
