<template>
  <div class="scatterplot-container">
    <scatterplot 
      v-for="track in tracks" 
      :key="track"
      :track="track" 
    />
  </div>
</template>

<script>
import Scatterplot from './Scatterplot.vue'

export default {
    components: { Scatterplot },

    name: "scatterplot-container",

    computed: {
      scatterplotTracksShown() { 
        let tracks = this.$store.state.scatterplotTracksShown 
        if (!tracks) { return }
        tracks.sort()
        return tracks
      },
    },

    data: () => ({
      tracks: [],
    }),

    watch: {
      scatterplotTracksShown() { this.tracks = this.scatterplotTracksShown }
    }
}
</script>

<style>
.scatterplot-container {
    width: 100%;
}
</style>