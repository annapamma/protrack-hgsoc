<template>
  <div class="scatterplot">
      <div :id="divId">
      </div>
  </div>
</template>

<script>
import scatterplot from '../plotly/scatterplotly'

export default {
    name: "scatterplot",

    props: [ 'track' ],

    data: () => ({
      view: 'Scatterplot'
    }),

    computed: {
        divId() { return `${this.track.split(' ').join('-')}-${this.view}` },
        scatterplotCategory() { return this.$store.state.scatterplotCategory },
        scatterplotGenes() { return this.$store.state.scatterplotGenes },
        scatterplotTracks() { return this.$store.state.scatterplotTracks },
        sampleMeta() { return this.$store.state.sampleMeta },
        trackDetails() { return this.$store.state.trackDetails },
    },

    watch: {
      scatterplotCategory() { this.generateScatterplot() },
      scatterplotGenes() { this.generateScatterplot() },
      scatterplotTracks() { this.generateScatterplot() },
      sampleMeta() { this.generateScatterplot() },
      track() { this.generateScatterplot() },
    },

    methods: {
      generateScatterplot() {
        scatterplot({
          divId: this.divId,
          track: this.track,
          trackData: this.scatterplotTracks[this.track],
          sampleMeta: this.sampleMeta,
          category: this.scatterplotCategory,
          trackDetails: this.trackDetails,
        })
      },
    },

    mounted() { this.generateScatterplot() },
}
</script>

<style>
.scatterplot {
    width: 100%;

}
</style>