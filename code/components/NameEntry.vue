<template>
    <div class="m">
        <table class="tab">
            <tr>
                <th>&times;</th>
                <th>Jersey</th>
                <th>Player Name</th>
            </tr>

            <tr v-for="(t, i) in names" :key="i+(team*7)" :class="{ istop5: t.isPlay }">
                <td @click="removeName(i)">&times;</td>
                <td @click="showModalByName(i)">{{ t.jersey }}</td>
                <td @click="showModalByName(i)">{{ t.name }}</td>
            </tr>
            <tr @click="showModalByTeam(0)" class="add">
                <td colspan="3">-- add player --</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['team', 'names', 'position', 'isupdate'],
        data() {
            return {
                teamAllNames: []
            }
        },
        methods: {
            showModalByTeam(t) {
                this.$emit('showModalByTeam', this.team);
            },
            showModalByName(p) {
                this.$emit('showModalByName', { team: this.team, player: p });
            },
            removeName(p) {
                this.$emit('removeEntryName', { team: this.team, player: p });
            }
        }
        /* watch: {
            isupdate: {
                immediate: true,
                handler(n, o) {
                    this.teamAllNames = this.names;
                }
            }
        },
        mounted() {
            this.teamAllNames = this.names;
        } */
    }
</script>

<style scoped>
    .m { margin: 12px 0 12px 0; text-align: center; background-color: #fff; }
    table { width: 100%; align: center; margin: 0 auto; }
    table tr {}
    table th { font-size: 14px; font-weight: normal; padding: 4px 8px; color: #fff; border: 1px solid #1c2833; text-align: center; background-color: #212f3d; font-family: "Digital-7"; }
    table td { font-size: 14px; font-weight: normal; padding: 4px 8px; color: #111; border: 1px solid #212f3d; text-align: center; font-family: "Digital-7"; height: 23px; }
    table th:nth-child(1) { width: 20px; }
    table th:nth-child(2) { width: 20px; }
    table th:nth-child(3) { width: 120px; }
    table tr { background-color: #fdedec; }
    table tr.istop5 { background-color: #fff; }
    table tr.add { background-color: #fff; }
</style>
