<template>
  <div class="demo">
      <img src="../assets/demo1.png" style="width: 600px;"/>
      <img src="../assets/demo2.png" style="width: 600px;"/>
  </div>
</template>

<script>

export default {
    name: "demo",

    props: [ 'track' ],
    
    data: () => ({
    }),

    computed: {
    },

    watch: {
    },

    methods: {
    },

    mounted() {}
}
</script>

<style>
.demo {
    width: 100%;
    display: flex;
    flex-direction: row;
}
</style>