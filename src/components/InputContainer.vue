<template>
    <div class="input-container">
        <view-selector />
        <input-heatmap :style="showHeatmap" />
        <input-boxplot :style="showBoxplot" />
        <input-sample-dashboard :style="showSampleDashboard" />
        <input-scatterplot :style="showScatterplot" />
        <input-iprofun :style="showIprofun" />
    </div>
</template>

<script>
import InputBoxplot from './InputBoxplot.vue'
import InputHeatmap from './InputHeatmap.vue'
import InputSampleDashboard from './InputSampleDashboard.vue'
import InputIprofun from './InputIprofun.vue'
import InputScatterplot from './InputScatterplot.vue'
import ViewSelector from './ViewSelector.vue'

export default {
    components: {
        InputBoxplot,
        InputHeatmap,
        InputSampleDashboard,
        InputIprofun,
        InputScatterplot,
        ViewSelector,
    },
    name: "input-container",
    computed: {
        showBoxplot() { return this.view === 'Boxplot' ? "" : "display: none;" },
        showDemo() { return this.view === 'Demo' ? "" : "display: none;" },
        showHeatmap() { return this.view === 'Heatmap' ? "" : "display: none;" },
        showIprofun() { return this.view === 'Cis-regulation effects' ? "" : "display: none;" },
        showSampleDashboard() { return this.view === 'Sample dashboard' ? "" : "display: none;" },
        showScatterplot() { return this.view === 'Scatterplot' ? "" : "display: none;" },
        view() { return this.$store.state.view },
    }
}
</script>

<style scoped>
    .input-container {
        max-width: 400px;
        min-width: 400px;
        border-top: none;
        padding-top: 8px;
        overflow-y: scroll;
        border-right: solid 1px lightgray;
}

    .input-container > div {
        margin-bottom: 1em;
    }

    .mssm-logo {
        margin: 2em;
    }
</style>