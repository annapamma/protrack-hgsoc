<template>
    <div class="iprofun-table-container">
      <v-expansion-panels focusable v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>
              <div>
                <b style="margin-right: 3px;">{{ predictorLabels(predictor) }}</b>
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
          </v-expansion-panel-header>
          <v-expansion-panel-content >
              <div class="iprofun-panel-content">
                <iprofun-table v-if="iprofunRegression[predictor]" :predictor="predictor"/>
                <div v-else style="margin-left: 10px;">{{ predictor }} data not found</div>
                <iprofun-table-details :predictor="predictor" v-if="iprofunRegression[predictor]" />
                <div class="iprofun">
                    <img v-if="predictor === 'Mutation' && iprofunRegression.Mutation" height="325" :src="`https://calina01.u.hpc.mssm.edu/protrack/mutation/${IprofunGene}`" />
                    <img v-if="predictor === 'CNV' && iprofunRegression.CNV"  height="325" :src="`https://calina01.u.hpc.mssm.edu/protrack/cnv_boxplot/${IprofunGene}`" />
                    <img v-if="predictor === 'CNV' && iprofunRegression.CNV" height="325" :src="`https://calina01.u.hpc.mssm.edu/protrack/cnv/${IprofunGene}`" />
                </div>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> 
    </div>
</template>

<script>
import IprofunTable from './IprofunTable.vue'
import IprofunTableDetails from './IprofunTableDetails.vue'


export default {
  props: ['predictor'],
  data() {
    return {
      panel: [0, 1, 2], 
      predictorLabelsDescription: {
        Mutation: 'Somatic mutation derived from WGS (whole genome sequencing) data. Categorized to binary variable (Yes/No) for the existence of any types of mutation in the gene.',
        CNV: 'Somatic copy number variation, dosage value (total number of copies). The value is centered at 2 copies and log2 transformed. ',
        LOH: 'Somatic copy number variation, loss of heterozygosity (the proportion of minor allele). The range is (0, 0.5). ',
      },
      // predictorFigure: {
      //   Mutation: 'mutation',
      //   CNV: 'cnv_boxplot', 
      // },
    }
  },
  components: {  
    IprofunTable,
    IprofunTableDetails,
  },
  name: "iprofun-table-container",
  computed: {
    dataTypes() {
      if (!this.iprofunRegression) { return [] }

      const availableOrder = [
        'RNA', 'Protein', 'Phospho'
      ]
      const probeA = this.iprofunRegression ? Object.keys(this.iprofunRegression)[0] : null
      if (!probeA) {
          return []
      }
      const probeB = this.iprofunRegression[probeA] ? Object.keys(this.iprofunRegression[probeA])[0] : null
      if (!probeB) {
        return []
      }

      const dataTypeTranslate = {
        'RNA': 'RNA',
        'Protein': 'protein',
        'Phospho': 'phosphosite',
      }
      // return Object.keys(this.iprofunRegression[probeA][probeB])
      return availableOrder.filter(dataType =>  Object.keys(this.iprofunRegression[probeA][probeB]).includes(dataType) ).map(el => dataTypeTranslate[el])
    },
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
  methods: {
        predictorLabels(predictor) {
      const labelOpts = {
        Mutation: `Mutation: Associations between ${this.IprofunGene} mutation and ${this.dataTypes.join('/')} levels`,
        CNV: `CNV: Associations between ${this.IprofunGene} copy number variation and ${this.dataTypes.join('/')} levels`,
        LOH: `LOH: Associations between ${this.IprofunGene} loss of heterozygosity and ${this.dataTypes.join('/')} levels`,
        // CNV: 'CNV',
        // LOH: 'LOH',
      }
      return labelOpts[predictor]
    },
  }
}
</script>

<style scoped>
    .iprofun-table-container {
        width: 98%;
        /* min-width: 1200px; */
        margin-left: 10px;
        margin-top: 20px;
    }

    .iprofun-panel-content {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }


    .iprofun {
      width: 60%;
      margin-top: 10px;
    }

    .custom-tooltip {
      opacity: 1!important;
      width: 200px!important;
    }
</style>