<template>
  <div class="input-boxplot-customize">
      <!-- <v-radio-group v-model="boxplotView" label="Organize boxplots:">
        <v-radio
          v-for="el in boxplotViews"
          :key="el.value"
          :label="el.label"
          :value="el.value"
        ></v-radio>
      </v-radio-group> -->
<!-- 
      <div v-if="boxplotView === 'byGene'">
        <v-select
          :items="boxplotGenes"
          label="Gene"
          v-model="boxplotGene"
        ></v-select>
      </div> -->
      <div>
        <v-select
          :items="dataTypes"
          item-disabled="customDisabled"
          item-value="dataType"
          item-text="text"
          label="Data type"
          v-model="boxplotDataType"
        >
        </v-select>
      </div>

      <v-select
        :items="trackDetails"
        label="X axis:"
        v-model="boxplotCategory2"
      ></v-select>

      <v-select
        :items="trackDetailsWithNone"
        label="Stratify the Boxplots according to:"
        v-model="boxplotCategory"
      ></v-select>
  </div>
</template>

<script>
export default {
    name: "input-boxplot-customize",

    computed: {
      availableDataTypes() {
        let available = []
        if (this.k_gene_v_tracks) {
          Object.values(this.k_gene_v_tracks)
            .flat().forEach(el => {
              const dt = el.split(' ')[1]
              if (!available.includes(dt)) {
                available.push(dt)
              }
            })
        }
        return available
      },
      boxplotCategory: {
        get() { return this.$store.state.boxplotCategory },
        set(boxplotCategory) { 
          if (boxplotCategory === 'None') {
            this.$store.dispatch('setBoxplotCategory', { boxplotCategory: this.boxplotCategory2 }) 
          } else {
            this.$store.dispatch('setBoxplotCategory', { boxplotCategory }) 
          }
        }
      },
      boxplotCategory2: {
        get() { return this.$store.state.boxplotCategory2 },
        set(boxplotCategory2) { this.$store.dispatch('setBoxplotCategory2', { boxplotCategory2: boxplotCategory2 }) }
      },
      boxplotDataType: {
        get() { return this.$store.state.boxplotDataType },
        set(boxplotDataType) { this.$store.dispatch('setBoxplotDataType', { boxplotDataType })},
      },
      // boxplotGene: {
      //   get() { return this.$store.state.boxplotGene },
      //   set(boxplotGene) { this.$store.dispatch('setBoxplotGene', { boxplotGene })},
      // },
      // boxplotGenes() { return this.$store.state.boxplotGenes },
      // boxplotView: {
      //   get() { return this.$store.state.boxplotView },
      //   set(boxplotView) { this.$store.dispatch('setBoxplotView', { boxplotView })},
      // },

      dataTypes() { 
        const dataTypeLabels = {
          'proteo': 'protein abundance',
          'phospho': 'phosphosite abundance',
          'cnv': 'cnv',
          'RNA': 'RNA expression',
        }
        let dataTypes = this.$store.state.boxplotDataTypes
          .map(dataType => ({ 
            dataType,
            text: dataTypeLabels[dataType],
            customDisabled: !this.availableDataTypes.includes(dataType),
          })) 
        return [{
          dataType: 'All',
          text: 'All',
          customDisabled: false,
        }, ...dataTypes]
      },
      trackDetails() { return Object.keys(this.$store.state.trackDetails) },
      trackDetailsWithNone() { return ['None', ...Object.keys(this.$store.state.trackDetails)] },
      k_gene_v_tracks() { return this.$store.state.Boxplot_k_gene_v_tracks },
    },
    
    data: () => ({
      // boxplotViews: [
      //   {
      //     value: 'byGene', 
      //     label: 'By Gene', 
      //   },
      //   {
      //     value: 'byDataType', 
      //     label: 'By Data Type', 
      //   },
      // ],
    }),

    methods: {
    },
}
</script>

<style>
.input-boxplot-customize {
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