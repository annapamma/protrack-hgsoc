<template>
  <div class="input-heatmap-customize">
    <v-expansion-panels focusable v-model="panel" multiple>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Reorder samples
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- <heatmap-sort-by-track /> -->
          <heatmap-sorter />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- <v-expansion-panel>
        <v-expansion-panel-header>
          Hide/show data types
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <heatmap-data-type-selector />
        </v-expansion-panel-content>
      </v-expansion-panel> -->

    </v-expansion-panels>
  </div>
</template>

<script>
// import HeatmapSortByTrack from './HeatmapSortByTrack.vue'
import HeatmapSorter from './HeatmapSorter.vue'
// import HeatmapDataTypeSelector from './HeatmapDataTypeSelector.vue'

export default {
    components: { 
      HeatmapSorter,
      // HeatmapSortByTrack,
      // HeatmapDataTypeSelector,
    },
    
    name: "input-heatmap-customize",

    computed: {
    },
    
    data: () => ({
      panel: [0, 1], 
    }),

    methods: {
    },

    mounted() {
          this.$store.dispatch('submitHeatmapGenes', 
          { 
            view: 'Heatmap', 
            heatmapGenes: ['A1BG', 'A2M'],
          }
        )
    },
}
</script>

<style>
.input-heatmap-customize {
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