<template>
  <div class="input-scatterplot-customize">
    <v-slider
      hint="Im a hint"
      max="80"
      min="40"
      label="Plot width"
      @end="setScatterplotWidth"
      v-model="scatterplotWidthInput"
    ></v-slider>

    <v-select
      :items="categories"
      label="Category to color markers"
      dense
      prepend-icon="mdi-format-color-fill"
      v-model="scatterplotCategory"
      solo
    ></v-select>

    <v-expansion-panels focusable v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Hide/show graphs
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-switch
            dense
            hide-details
            :label="selectAll ? 'Hide all' : 'Show all'"
            v-model="selectAll"
          >
          </v-switch>
          <v-switch
            dense
            hide-details
            v-for="track in tracks"
            :key="track"
            :value="track"
            v-model="scatterplotTracksShown"
            :label="getTrackLabel(track)"
          >
          </v-switch>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
export default {
    name: "input-scatterplot-customize",

    computed: {
      categories() { return ['None', ...Object.keys(this.trackDetails)] },
      trackDetails() { return this.$store.state.trackDetails },
      scatterplotCategory: {
        get() { return this.$store.state.scatterplotCategory },
        set(scatterplotCategory) { this.$store.dispatch('setScatterplotCategory', { scatterplotCategory })},
      },
      scatterplotTracksShown: {
        get() { return this.$store.state.scatterplotTracksShown },
        set(scatterplotTracksShown) { this.$store.dispatch('setScatterplotTracksShown', { scatterplotTracksShown })},
      },
      tracks() { return Object.keys(this.$store.state.scatterplotTracks) },
    },
    
    data: () => ({
      scatterplotWidthInput: null,
      panel: 0,
      selectAll: false,
    }),

    watch: {
      selectAll() { 
        if (this.selectAll) {
          this.scatterplotTracksShown = this.tracks
        } else {
          this.scatterplotTracksShown = []
        }
      },
      tracks() { 
        const proteoProteoTracks = this.tracks.map(el => el.split(' - ')).filter(a => a.every(a_el => a_el.includes('proteo')))
        this.scatterplotTracksShown = proteoProteoTracks.map(el => el.join(' - ')) 
      },
    },

    methods: {
      getTrackLabel(track) {
        const trackArr = track.split(' - ')
        const trackArrA = trackArr[0].split(' ')
        const trackArrB = trackArr[1].split(' ')
        const geneA = trackArrA[0]
        const dataTypeA = trackArrA[1]
        const remainderA = trackArrA.slice(2,).join(' ')

        const geneB = trackArrB[0]
        const dataTypeB = trackArrB[1]
        const remainderB = trackArrB.slice(2,).join(' ')

        const dataTypeTranslate = {
          'proteo': 'protein',
          'RNA': 'RNA',
          'phospho': 'phosphosite',
          'cnv': 'CNV'
        }
        const trackTitle = `${geneA} ${dataTypeTranslate[dataTypeA]} ${remainderA}- ${geneB} ${dataTypeTranslate[dataTypeB]} ${remainderB}`
        return trackTitle
      },
      setScatterplotWidth() { 
        this.$store.dispatch('setScatterplotWidth', { scatterplotWidth: this.scatterplotWidthInput * 10 })}
    },

    mounted() { 
      const proteoProteoTracks = this.tracks.map(el => el.split(' - ')).filter(a => a.every(a_el => a_el.includes('proteo')))
      this.scatterplotTracksShown = proteoProteoTracks.map(el => el.join(' - ')) 
      this.scatterplotWidthInput = this.$store.state.scatterplotWidth / 10
    },


}
</script>

<style>
.input-scatterplot-customize {
    margin: 10px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>