<template>
  <div class="heatmap-sorter">
      {{ lockTracks }}
        <p>Samples are ordered by:</p>
        <heatmap-sorter-level v-for="(track, i) in lockTracks" 
            :key="track" 
            :track="track" 
            :i="i"
            @updateLockTrack="updateLockTrack"
        />
        <!-- <v-autocomplete
            v-model="selectTrack"
            :items="heatmapTracks.filter(track => !lockTracks.includes(track))"
            xSmall
            label="Add another level of ordering"
            hide-details
            prepend-icon="mdi-plus"
            append-icon=""
        ></v-autocomplete> -->
  </div>
</template>

<script>
import HeatmapSorterLevel from './HeatmapSorterLevel.vue'

export default {
    components: {
        HeatmapSorterLevel
    },
    name: "heatmap-sorter",

    computed: {
        heatmapLockTracks: {
            get() { return this.$store.state.heatmapLockTracks },
            set(heatmapLockTracks) { this.$store.dispatch('setHeatmapLockTracks', { heatmapLockTracks }) },
        },
        heatmapTracksToLock() { return this.$store.state.heatmapTracksToLock },
        gene() { return this.selectedSeries ? this.selectedSeries.split(' ')[0] : null },
        selectedSample() { return this.$store.state.selectedSample },
        selectedSeries() { return this.$store.state.selectedSeries },
        selectedValue() { return this.$store.state.selectedValue },
        selectedData() { return [
            ['Selected series', this.selectedSeries],
            ['Selected sample', this.selectedSample],
            ['Selected value', this.selectedValue],
        ] },
        heatmapTracks() { return Object.keys(this.$store.state.trackDetails) },
    },

    data: () => ({
        lockTracks: [],
        selectTrack: '',
        sortTracks: [],
        sortButtons: {
            asc: {
                label: 'Asc',
                icon: 'mdi-arrow-up-bold',
                asc: true,
            },
            desc: {
                label: 'Desc',
                icon: 'mdi-arrow-down-bold',
                asc: false,
            },
        }
    }),

    watch: {
        selectTrack() { this.addTrack() },
        lockTracks() { 
            console.log('updated lock track')
            // const rev = [...this.lockTracks]
            // rev.reverse()
            // this.$store.dispatch('setHeatmapTracksToLock', { heatmapTracksToLock: rev })
        },

    },

    methods: {
        lockIdx(i) { return this.lockTracks.length > 1 ? i + 1 : '' },
        sortBySeries({ asc }) {
            this.$store.dispatch('sortSamples', { asc, series: this.selectedSeries })
        },
        removeTrack(track) { 
            const res = this.lockTracks.filter(el => el !== track) 
            this.lockTracks = res
        },
        addTrack() { 
            this.lockTracks.push(this.selectTrack) 
        },
        updateLockTrack({ i, updatedTrack }) {
            let lockTracks = [...this.lockTracks]
            lockTracks[i] = updatedTrack
            this.lockTracks = lockTracks
        },
    },

    mounted() { 
        const rev = [...this.$store.state.heatmapTracksToLock]
        rev.reverse()
        this.lockTracks = rev
    },
}
</script>

<style>
.heatmap-sorter {
    width: 100%;
    margin-top: 10px;
}

.sort-buttons-container {
    text-align: center;
    background-color: #ebebeb;
    padding: 10px;
    margin: 4px;
}

.sort-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.lock-element {
    border: solid 1px #ebebeb;
}

.lock-element-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.lock-tracks-switch {
    display: flex;
    flex-direction: row;
}
</style>