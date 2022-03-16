<template>
  <div class="input-boxplot">
    <v-textarea
      name="input-7-1"
      outlined
      clearable
      @click:clear="clearInput"
      no-resize
      v-model="boxplotGeneInput"
      :label="`Input newline separated genes (max ${maxGenes})`"
      :hint="notFound.length > 0 ? `Not found: ${notFound.join(', ')}` : ''"
    ></v-textarea>
    <!-- <v-autocomplete
        v-model="boxplotGenes"
        :items="genes"
        outlined
        chips
        deletable-chips
        small-chips
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select up to ${maxGenes} genes`"
        multiple
        clearable
    >
    </v-autocomplete> -->

    <v-btn
        v-if="boxplotGeneInput.length > 0"
        :loading="loaderBoxplot"
        :disabled="loading || !valid"
        color="blue-grey"
        class="ma-2 white--text"
        @click="submitBoxplotGenes"
      >
        
        {{ valid ? 'Render boxplots' : 'Select fewer genes' }}
    </v-btn>
    <input-boxplot-customize />
  </div>
</template>

<script>
import InputBoxplotCustomize from './InputBoxplotCustomize.vue'

export default {
  components: { InputBoxplotCustomize },
    name: "input-boxplot",

    computed: {
        available() { return this.$store.state.available },
        boxplotGenes() { 
          return this.boxplotGeneInput
            .split('\n')
            .map(gene => gene.toUpperCase())
            .filter(gene => gene.length > 0 && this.genes.includes(gene) )
        },
        loaderBoxplot() { return this.$store.state.loaderBoxplot },
        genes() { 
            const available = Object.keys(this.available)
            available.sort()
            return available
        },
        notFound() {
          return this.boxplotGeneInput
            .split('\n')
            .map(gene => gene.toUpperCase())
            .filter(gene => gene.length > 0 && !this.genes.includes(gene) )
        },
        valid() { return this.boxplotGenes.length <= this.maxGenes && this.boxplotGenes.length > 0 },
    },
    
    data: () => ({
        boxplotGeneInput: 'G6PD\nH6PD\nPGD\nPKM\nTIGAR',
        loading: false,
        maxGenes: 10,
    }),


    methods: {
        clearInput() { this.boxplotGeneInput = '' },

        submitBoxplotGenes() {
            this.$store.dispatch('submitBoxplotGenes', 
            { 
              view: 'Boxplot', 
              boxplotGenes: this.boxplotGenes 
            }
          )
        },
    },

    mounted() { 
      this.boxplotGeneInput = 
      this.submitBoxplotGenes() 
    }
}
</script>

<style>
.input-boxplot {
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