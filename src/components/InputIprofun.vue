<template>
  <div class="input-iprofun">
    <div style="margin-bottom: 10px;">Select gene to visualize iProFun results</div>
    <v-autocomplete
        v-model="IprofunGene"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        solo
        clearable
    >
    </v-autocomplete>

    <v-btn
        v-if="valid"
        :loading="loaderIprofun"
        :disabled="loaderIprofun && !valid"
        color="blue-grey"
        class="ma-2 white--text"
        @click="submitIprofunGene"
      >
      View iProFun results
    </v-btn>

    <div class="iprofun-description-1">
      The goal of this analysis is to identify associations between DNA-level alterations and protein/RNA/phosphosite expression levels.
      </div>
    <div class="iprofun-description-2">
      <p>We leveraged iProFun, an integrative analysis tool to screen for proteogenomic functional traits perturbed by DNA-level alterations. </p>
      <p>iProFun analysis was performed using regression summaries. A linear additive regression was considered for each outcome (mRNA/protein/phoshpo) with DNA-level alterations (mutation/CNV-dosage/CNV-LOH), tumor response (Sensitive vs Refractory) and their interactive effects as primary predictors, adjusting for covariates (e.g. age, tumor location, tumor purity, RNA quality for mRNA).</p>
    </div>

    <div class="iprofun-description-criteria">
      <p><b>Criteria for determining cis-regulation</b></p>
      <ul>
        <li v-for="criterion in criteria" :key="criterion.label">
          {{ criterion.label }}
            <v-tooltip 
              content-class='custom-tooltip'
              right 
              color="error"
          >
              <template v-slot:activator="{ on, attrs }">
                  <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  small
                  >
                  mdi-help-circle
                  </v-icon>
              </template>
              <span>{{ criterion.description }}</span>
          </v-tooltip>
        </li>
      </ul>
    </div>

    <div class="iprofun-description-3">
      <p>For more information, please see the publication at:</p>
      <a href="https://www.mcponline.org/content/18/8_suppl_1/S52/tab-article-info">Song et al. "Insights into impact of DNA copy number alteration and methylation on the proteogenomic landscape of human ovarian cancer via a multi-omics integrative analysis." Molecular & Cellular Proteomics 18, no. 8 suppl 1 (2019): S52-S65.</a>
    </div>
  </div>
</template>

<script>
export default {
    components: {
    },

    name: "input-iprofun",

    computed: {
        available() { return this.$store.state.available },
        genes() { 
            const available = Object.keys(this.available)
            available.sort()
            return available
        },
        loaderIprofun() { return this.$store.state.loaderIprofun },
        valid() { return this.IprofunGene.length > 0 },
    },
    
    data: () => ({
      IprofunGene: 'CPT1A',
      criteria: [
        {
          label: 'FDR <= 0.1',
          description: '',
        },
        {
          label: 'Posterior probability > 0.75',
          description: '',
        },
        {
          label: 'Same direction across RNA/protein/phosphosite expressions',
          description: ''
        },
      ],
    }),


    methods: {
      submitIprofunGene() {
          this.$store.dispatch('submitIprofunGene', 
          { 
            view: 'Iprofun', 
            IprofunGene: this.IprofunGene 
          }
        )
      },
    },

    mounted() {
      this.submitIprofunGene()
    }
}
</script>

<style>
.input-iprofun {
    margin: 10px;
}

.iprofun-description-1 {
  background: #FFFDE7;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  margin: 10px;
  font-size: 0.85em;
}

.iprofun-description-2 {
  background: #ECEFF1;
  padding: 20px;
  margin: 10px;
  font-size: 0.85em;
}

.iprofun-description-criteria {
  background: #ffffff;
  border: solid 1px black;
  padding: 20px;
  margin: 10px;
  font-size: 0.85em;
}


.iprofun-description-3 {
  background: #ECEFF1;
  padding: 20px;
  margin: 10px;
  font-size: 0.85em;
}

/* ul li:before {
  content: "\2713\0020";
}

ul { list-style-type: none; } */
</style>