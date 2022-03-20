<template>
  <div class="heatmap-legend">
    <div style="text-align: center; font-weight: bold;">Interactive Legend</div>
    <div style="text-align: center;">Click buttons to hide/show samples.</div>
    <v-container>
      <v-row no-gutters>
        <v-col md="6">
          <heatmap-legend-element 
              v-for="(trackData, track) in col1"
              :key="track"
              :trackData="trackData"
              :track="track"
              :width="80"
          />
        </v-col>
        <v-col md="6">
            <heatmap-legend-element 
              v-for="(trackData, track) in col2"
              :key="track"
              :trackData="trackData"
              :track="track"
              :width="50"
          />
        </v-col>
      </v-row> 
    </v-container>
  </div>
</template>

<script>
import trackDetails from '../refs/trackDetails'
import HeatmapLegendElement from './HeatmapLegendElement.vue'

export default {
  components: { HeatmapLegendElement },
    name: "heatmap-legend",

    computed: {
        trackDetails() { return this.$store.state.trackDetails },
    },

    data: () => ({
      col1: {},
      col2: {},
    }),

    mounted() {
      let col1Keys = [
        'Tumor response',
        'Protein cluster',
      ]
      let col2Keys = [
        'chr17LOH',
        'Tumor Location Group',
        'TCGA-RNA clusters (VerHaak)',
      ]
      let col1 = col1Keys.map(col => [col, this.trackDetails[col]])
      let col2 = col2Keys.map(col => [col, this.trackDetails[col]])

      this.col1 = Object.fromEntries(col1)
      this.col2 = Object.fromEntries(col2)
    }
}
</script>

<style>
.heatmap-legend {
    width: 100%;
    margin-top: 50px;
    min-width: 400px;
}
</style>