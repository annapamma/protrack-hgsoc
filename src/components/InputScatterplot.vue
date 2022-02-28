<template>
  <div class="input-scatterplot">
    <v-autocomplete
        v-model="scatterplotGeneA"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select first gene`"
        clearable
    >
    </v-autocomplete>
        <v-autocomplete
        v-model="scatterplotGeneB"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select second gene`"
        clearable
    >
    </v-autocomplete>
    <v-btn
        v-if="valid"
        :loading="loaderScatterplot"
        :disabled="loading || !valid"
        color="blue-grey"
        class="ma-2 white--text"
        @click="submitScatterplotGenes"
      >
        Render scatterplots
    </v-btn>
    <input-scatterplot-customize />
  </div>
</template>

<script>
import InputScatterplotCustomize from './InputScatterplotCustomize.vue'

export default {
    components: { InputScatterplotCustomize  },
    name: "input-scatterplot",

    computed: {
        available() { return this.$store.state.available },
        loaderScatterplot() { return this.$store.state.loaderScatterplot },
        genes() { 
            const available = Object.keys(this.available)
            available.sort()
            return available
        },
        valid() { return this.scatterplotGeneA && this.scatterplotGeneB },
    },
    
    data: () => ({
        scatterplotGeneA: null,
        scatterplotGeneB: null,
        loading: false,
    }),

    watch: {
    },

    methods: {
        submitScatterplotGenes() {
            this.$store.dispatch('submitScatterplotGenes', 
            { 
              view: 'Scatterplot', 
              scatterplotGenes: [this.scatterplotGeneA, this.scatterplotGeneB]
            }
          )
        },
    },
}
</script>

<style>
.input-scatterplot {
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