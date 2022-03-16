<template>
  <div class="boxplot-container">
    <div v-if="tracks && tracks.length > 0">
      <boxplot v-for="track in tracks" :key="track" :track="track" />
    </div>
  </div>
</template>

<script>
import Boxplot from './Boxplot.vue'

export default {
  components: { Boxplot },
    name: "boxplot-container",

    props: ['view'],

    data: () => ({
    }),
    
    computed: {
        boxplotGene() { return this.$store.state.boxplotGene },
        boxplotDataType() { return this.$store.state.boxplotDataType },
        boxplotDataTypes() { return this.$store.state.boxplotDataTypes },
        boxplotView() { return this.$store.state.boxplotView },
        k_gene_v_tracks() { return this.$store.state[`${this.view}_k_gene_v_tracks`] },
        k_dataType_v_tracks() { 
          if (!this.k_gene_v_tracks) { return null }


          let dataTypes = Object.fromEntries(this.boxplotDataTypes.map(dt => [dt, []]))
          Object.keys(dataTypes).forEach((dataType) => {
            Object.entries(this.k_gene_v_tracks).forEach(([, tracks]) => {
              tracks.forEach((track) => {
                if (track.includes(dataType)) {
                  dataTypes[dataType].push(track)
                }
              })
            })
          })
          return dataTypes
        },
        tracks() { 
          if (!this.k_gene_v_tracks) { return [] }
          if (this.boxplotDataType === 'All') {
            return Object.values(this.k_dataType_v_tracks).flat()
          }
          // if (this.boxplotView === 'byGene') {
          //     return this.k_gene_v_tracks[this.boxplotGene]
          // }

          // if (this.boxplotView === 'byDataType') {
            return this.k_dataType_v_tracks[this.boxplotDataType]
          // }

          // return []
        },
    },
}
</script>

<style>
.boxplot-container {
    width: 100%;
    min-width: 600px;
}
</style>