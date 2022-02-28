<template>
  <v-app>
    <introduction />
    <main class="main">
        <input-container class="input-container-main" />
        <heatmap-container :style="showHeatmap" view="Heatmap"  />
        <boxplot-container :style="showBoxplot" view="Boxplot" />
        <sample-dashboard :style="showSampleDashboard" view="SampleDashboard" />
        <iprofun-container :style="showIprofun" view="Iprofun" />
        <scatterplot-container :style="showScatterplot" view="Scatterplot" /> 
    </main>
  </v-app>
</template>

<script>
import BoxplotContainer from './components/BoxplotContainer.vue';
import HeatmapContainer from './components/HeatmapContainer.vue';
import InputContainer from './components/InputContainer.vue';
import Introduction from './components/Introduction.vue';
import IprofunContainer from './components/IprofunContainer.vue';
import SampleDashboard from './components/SampleDashboard.vue';
import ScatterplotContainer from './components/ScatterplotContainer.vue';

export default {
  name: 'App',

  components: {
    BoxplotContainer,
    HeatmapContainer,
    InputContainer,
    Introduction,
    IprofunContainer,
    SampleDashboard,
    ScatterplotContainer,
  },

  data: () => ({
  }),

  computed: {
    view() { return this.$store.state.view },
    showBoxplot() { return this.view === 'Boxplot' ? "" : "display: none;" },
    showDemo() { return this.view === 'Demo' ? "" : "display: none;" },
    showHeatmap() { return this.view === 'Heatmap' ? "" : "display: none;" },
    showIprofun() { return this.view === 'Iprofun' ? "" : "display: none;" },
    showSampleDashboard() { return this.view === 'Sample dashboard' ? "" : "display: none;" },
    showScatterplot() { return this.view === 'Scatterplot' ? "" : "display: none;" },
  },

  mounted() { this.$store.dispatch('sortSamples', { asc: true, series: 'Tumor response' }) }
};
</script>

<style scoped>
html {
    box-sizing: border-box;
}

*, *:before, *:after {
    box-sizing: inherit;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.main {
    display: flex;
    flex-direction: row;
    width: 90%;
  }
</style>