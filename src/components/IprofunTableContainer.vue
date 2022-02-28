<template>
    <div class="iprofun-table-container">
            <div>
              <b style="margin-right: 3px;">{{ predictorLabels[predictor] }}</b>
              <v-tooltip 
                content-class='custom-tooltip'
                bottom 
                color="#263238"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                  color="#546E7A"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  small
                  >
                  mdi-help-circle
                  </v-icon>
                </template>
                <span> {{ predictorLabelsDescription[predictor] }}</span>
              </v-tooltip>
            </div>
            <iprofun-table v-if="iprofunRegression[predictor]" :predictor="predictor"/>
            <div v-else style="margin-left: 10px;">{{ predictor }} data not found</div>

            <div class="iprofun" v-for="(isGenerated, iprofunFigure) in iprofunFigureGenerated" :key="iprofunFigure">
                <img width="450" v-if="isGenerated && iprofunFigure.toUpperCase().indexOf(predictor.toUpperCase()) > -1" :src="`https://calina01.u.hpc.mssm.edu/protrack/${iprofunFigure}/${IprofunGene}`" />
            </div>
    </div>
</template>

<script>
import IprofunTable from './IprofunTable.vue'

export default {
  props: ['predictor'],
  data() {
    return {
      predictorLabels: {
        Mutation: 'Mutation',
        CNV: 'CNV-Dosage',
        LOH: 'CNV-LOH',
      },
      predictorLabelsDescription: {
        Mutation: 'Somatic mutation derived from WGS (whole genome sequencing) data. Categorized to binary variable (Yes/No) for the existence of any types of mutation in the gene.',
        CNV: 'Somatic copy number variation, dosage value (total number of copies). The value is centered at 2 copies and log2 transformed. ',
        LOH: 'Somatic copy number variation, loss of heterozygosity (the proportion of minor allele). The range is (0, 0.5). ',
      }
    }
  },
  components: {  
    IprofunTable,
  },
  name: "iprofun-table-container",
  computed: {
    IprofunGene() {
      return this.$store.state.IprofunGene
    },
    iprofunRegression() {
      return this.$store.state.iprofunRegression
    },
    iprofunFigureGenerated() {
      return this.$store.state.IprofunFigureGenerated
    },
  },
}
</script>

<style scoped>
    .iprofun-table-container {
        width: 80%;
        /* min-width: 1200px; */
        /* border-left: solid 1px lightgray; */
        margin-left: 10px;
        margin-top: 20px;
    }


    .iprofun {
      width: 60%;
    }

    .custom-tooltip {
      opacity: 1!important;
      width: 200px!important;
    }
</style>