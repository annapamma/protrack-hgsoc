<template>
    <div class="heatmap-sorter-level">

        <div v-if="!editing">{{ updatedTrack }}</div>
        <div v-else>
            <v-autocomplete
                dense
                v-model="updatedTrack"
                :items="allTracks"
            ></v-autocomplete>
        </div>

        <div v-if="!editing">
            <v-btn
                icon
                color="grey"
                x-small
                @click="editing = true"
                style="margin-left: 10px;"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </div>
        <div v-else>
            <v-btn
                icon
                color="grey"
                x-small
                @click="updateLockTrack"
                style="margin-left: 10px;"
            >
                <v-icon>mdi-check</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    name: "heatmap-sorter-level",
    
    props: ['track', 'i'],

    computed: {
        allTracks() {
            return [...this.clinicalTracks, ...this.molecularTracks]
        },
        clinicalTracks() { return Object.keys(this.$store.state.trackDetails) },
        molecularTracks() { return Object.values(this.$store.state.Heatmap_k_gene_v_tracks).flat() } 
    },

    data: () => ({
        editing: false,
        updatedTrack: '',
    }),

    watch: {
    },

    methods: {
        updateLockTrack() {
            this.editing = false
            this.$emit(
                'updateLockTrack', 
                { 
                    updatedTrack: this.updatedTrack,
                    i: this.i,
                }
            )
        },
    },

    mounted() { 
        this.updatedTrack = this.track
    },
}
</script>

<style>
.heatmap-sorter-level {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.heatmap-sorter-level span {
    margin-left: 5px;
}

</style>