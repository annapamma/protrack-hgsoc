<template>
    <div class="view-selector">
        <v-select
          :items="views"
          filled
          v-model="view"
          label="View"
          dense
        >
            <template v-slot:item="data">
                {{ data.item }}
                <v-tooltip v-if="data.item.includes('Cis-regulation')" right color="#3F51B5">
                    <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        color="#546E7A"
                        v-bind="attrs"
                        v-on="on"
                        class="ml-2"
                        small
                    >
                        mdi-help-circle
                    </v-icon>
                    </template>
                    <div>
                        Identify associations between<br>
                        DNA-level alterations<br> 
                        and protein/RNA/phosphoprotein <br> 
                        expression levels.
                    </div>
                </v-tooltip>
            </template>
        </v-select>
    </div>
</template>

<script>

export default {
    name: "view-selector",

    computed: {
        view: {
            get() { return this.$store.state.view },
            set(view) { this.$store.dispatch('setView', { view }) },
        },
        views() {
            const views = this.$store.state.views
            // return views.map(view => { return {'name': view} })
            return views
        },
    },
    methods: {
        showTooltip() {
        }
    },

}
</script>

<style scoped>
    .view-selector {
        max-width: 400px;
        min-width: 400px;
        border-top: none;
        border-right: solid 1px lightgray;
        padding: 10px 10px 2px 10px;
    }

    /* .view-selector > div {
        margin-bottom: 1em;
    } */

    .mssm-logo {
        margin: 2em;
    }
</style>