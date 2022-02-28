<template>
  <div class="input-scatterplot-customize">
    <v-select
      :items="categories"
      label="Category to color markers"
      dense
      prepend-icon="mdi-format-color-fill"
      v-model="scatterplotCategory"
      solo
    ></v-select>
    <v-expansion-panels focusable>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Hide/show graphs
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-switch
            dense
            hide-details
            v-for="track in tracks"
            :key="track"
            :value="track"
            v-model="scatterplotTracksShown"
            :label="track"
          ></v-switch>
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
    }),

    watch: {
      tracks() { this.scatterplotTracksShown = this.tracks },
    },

    mounted() { this.scatterplotTracksShown = this.tracks },


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