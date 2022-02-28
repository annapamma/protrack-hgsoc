<template>
    <div class="iprofun-container">
      <div class="iprofun-header">
        <h2>{{ IprofunGene }}</h2>
      </div>
      <iprofun-table-container :predictor="'Mutation'"/>
      <iprofun-table-container :predictor="'CNV'"/>
      <iprofun-table-container :predictor="'LOH'"/>
    </div>
</template>

<script>
import IprofunTableContainer from './IprofunTableContainer.vue'

export default {
  components: {  
    IprofunTableContainer,
  },
  name: "iprofun-container",
  computed: {
    IprofunGene() {
      return this.$store.state.IprofunGene
    },
    // iprofunFigureGenerated() {
    //   return this.$store.state.iprofunFigureGenerated
    // },
    // iprofunRegression() {
    //   return this.$store.state.iprofunRegression
    // }
  },
}
</script>

<style scoped>
    .iprofun-container {
        width: 80%;
        /* min-width: 1200px; */
        border-left: solid 1px lightgray;
        height: 100vh;
    }


    .iprofun-header h2 {
      margin: 0 auto;
      display: flex;
      font-weight: bold;
      font-size: 1.75em;
      flex-direction: row;
      justify-content: center;
      background: lightgray;
    }

    .iprofun h3 {
      margin: 0 auto;
      display: flex;
      font-weight: bold;
      font-size: 1.5em;
      flex-direction: row;
      justify-content: center;
      background: lightgray;
    }

</style>