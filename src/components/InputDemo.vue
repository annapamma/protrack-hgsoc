<template>
  <div class="input-demo">
    <v-autocomplete
        v-model="demoGenes"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select gene`"
        multiple
        clearable
    >
    </v-autocomplete>
  </div>
</template>

<script>
// import InputBoxplotCustomize from './InputBoxplotCustomize.vue'

export default {
  // components: { InputBoxplotCustomize },
    name: "input-demo",

    computed: {
        available() { return this.$store.state.available },
        loaderBoxplot() { return this.$store.state.loaderBoxplot },
        genes() { 
            return ['PARK7']
        },
        valid() { return this.demoGenes.length <= this.maxGenes && this.demoGenes.length > 0 },
    },
    
    data: () => ({
        demoGenes: ['PARK7'],
        loading: false,
        maxGenes: 10,
    }),


    // methods: {
    //     submitBoxplotGenes() {
    //         this.$store.dispatch('submitBoxplotGenes', 
    //         { 
    //           view: 'Boxplot', 
    //           boxplotGenes: this.boxplotGenes 
    //         }
    //       )
    //     },
    // },

    // mounted() { this.submitBoxplotGenes() }
}
</script>

<style>
.input-demo {
    margin: 0 auto;
    width: 80%;
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