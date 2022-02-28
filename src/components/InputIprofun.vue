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

      <p>iProFun is an integrative analysis tool to screen for Proteogenomic Functional traits perturbed by DNA-level alterations. </p>
      The goal is to characterize functional consequences of DNA-level alterations in tumors and to facilitate screening for cancer drivers contributing to tumor initiation and progression.
      </div>
    <div class="iprofun-description-2">
            <p>A linear additive regression was considered for each outcome (mRNA/protein/phoshpo) with DNA-level alterations (mutation/CNV-dosage/CNV-LOH), tumor response (Sensitive vs Refractory) and their interactive effects as primary predictors, adjusting for covariates (e.g. age, tumor location, tumor purity, RNA quality for mRNA).</p>
      iProFun analysis was performed using regression summaries.
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
  background: #E0F2F1;
  padding: 20px;
  margin: 10px;
  font-size: 0.85em;
}

.iprofun-description-2 {
  background: #FFFDE7;
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
</style>