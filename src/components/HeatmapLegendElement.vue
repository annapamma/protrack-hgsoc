<template>
  <div class="heatmap-legend-element">
      <div v-if="track.includes('VerHaak')"><a 
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2818769/"
        target="_blank"
      >{{track}}</a></div>
      <div v-else>{{ track }}</div>
      <v-btn-toggle multiple v-model="shownFeatures">
        <div 
            class="heatmap-legend-element-buttons" 
            :style="`width: ${width}%;`"
        >
            <v-btn
                v-for="el in trackData"
                :key="el.value"
                :value="el.value"
                small
                :class="getTextColor(el)"
                elevation="0"
                :plain="!el.value"
                :color="getBackgroundColor(el)"

            >
                <span style="">
                    {{ getButtonLabel(el) }}
                </span>
            </v-btn>
        </div> 
      </v-btn-toggle>
  </div>
</template>

<script>
export default {
    name: "heatmap-legend-element",

    props: ['track', 'trackData', 'width'],

    data: () => ({
        shownFeatures: [],
        isLoaded: false,
    }),

    methods: {
        getButtonLabel(el) {
            if (el.label.length === 0) { return 'Missing' }
            
            // if (el.label.includes('.')) { return el.label.split('.')[0] }
            
            // if (el.label.includes(',')) { return el.label.split(',').join(',\n') }
            //  ? el.label.split('.')[0] : 'Missing value' }}
            return el.label

        },
        getBackgroundColor(el) {
            return this.shownFeatures.includes(el.value) ? el.color : '#ffffff'
        },
        getTextColor(el) {
            if (!el.value) { return `black--text` }

            if (!this.shownFeatures.includes(el.value)) {
                return `black--text`
            }
            
            return `white--text`
        },
        
    },

    watch: {
        shownFeatures() {
            if (this.isLoaded) {
                this.$store.dispatch('updateShownFeatures', 
                { track: this.track, shownFeatures: this.shownFeatures }) 
            }
            this.isLoaded = true
        },
    },

    mounted() { 
        this.shownFeatures = this.trackData.map(el => el.value) 
    }

}
</script>

<style>
.heatmap-legend-element {
    width: 100%;
    margin-top: 10px;
    min-width: 120px;
    display: flex; 
    flex-direction: column;
}

.heatmap-legend-element-buttons {
    display: flex; 
    flex-direction: column;
}

.heatmap-legend-element .v-btn {
    border: solid 1px #000000;
}
</style>