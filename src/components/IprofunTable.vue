<template>
    <div class="iprofun-table">
        <table class="iprofun-table-table">
            <!-- main header -->
            <tr> 
                <th colspan=1>{{ iprofunGene }}</th>
                <th :colspan="stats.length" v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
            <!-- space for stats headers  -->
            <tr>
                <td></td>
                <template v-for="header in headers">
                    <td v-for="stat in stats" :key="`${stat}-${header}`">
                        <div  class="stat-header">
                        <v-tooltip 
                            content-class='custom-tooltip'
                            bottom 
                            v-if="header === 'Refractory'"
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
                            <span>{{ statDetails[stat].description }}</span>
                        </v-tooltip>
                        <br>
                        {{ statDetails[stat].label }}
                    </div>
                    </td>
                </template>
            </tr>
            <!-- dataType rows -->
            <tr v-for="dataType in dataTypes" :key="dataType">
                <td>{{ dataType }}</td>
                <template v-for="header in headers">
                    <td v-for="stat in stats" :key="`${stat}-${header}-${dataType}`">{{ 
                        foundStat(header, dataType, stat)
                    }}</td>
                </template>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['predictor'],
        components: {
        },
        data() {
            return {
                statDetails: {
                    EST: {
                        label: 'EST',
                        description: 'estimate of the regression coefficients',
                    },
                    P: {
                        label: 'Pval',
                        description: 'P-value of the regression coefficients',
                    },
                    FWER: {
                        label: 'FWER',
                        description: 'Family-wise error rate',
                    },
                    FDR: {
                        label: 'FDR',
                        description: 'False-discovery rate'
                    },
                    iProFun_identified: {
                        label: 'cis-regulation (iProFun)',
                        description: 'Whether an association is identified in multi-omic integrative iProFun analysis.',
                    }
                },
                translate: {
                    iProFun_identified: {
                        0: 'No',
                        1: 'Yes',
                    }
                }
            }
        },
        name: "iprofun-table",
        computed: {
            headers() {
                const availableOrder = [
                    'Refractory', 'Sensitive', 'Interaction'
                ]
                return availableOrder.filter(header =>  Object.keys(this.iprofunRegression).includes(header) )
            },
            dataTypes() {
                const availableOrder = [
                    'RNA', 'Protein', 'Phospho'
                ]
                return availableOrder.filter(dataType =>  Object.keys(this.iprofunRegression[this.headers[0]]).includes(dataType) )
            },
            stats() {
                const availableOrder = [
                    'EST', 'P', 'FWER', 'iProFun_identified'
                ]
                return availableOrder.map((stat) => {
                    if (Object.keys(this.iprofunRegression[this.headers[0]][this.dataTypes[0]]).includes(stat)) {
                        return stat
                    }
                })
            },
            iprofunGene() {
                return this.$store.state.iprofunGene
            },
            iprofunRegression() {
                return this.$store.state.iprofunRegression[this.predictor]
            },
        },
        methods: {
            foundStat(h, dt, s) {
                const statExists = this.iprofunRegression &&
                        this.iprofunRegression[h] &&
                        this.iprofunRegression[h][dt]
                const statVal = statExists ? this.iprofunRegression[h][dt][s] : ''
                return this.translate[s] ? this.translate[s][statVal] : statVal
            }
        }
    }
</script>

<style scoped>
.iprofun-table {
    width: 70%;
    margin: 10px;
}
/* Style for cells with any colspan attribute */
td[colspan] {
  text-align: center;
}

.iprofun-table-table {
    width: 70%;
}
/* No extra space between cells */
table {
overflow-x:scroll;
  border-collapse: collapse;
}

th, td {
  border: 1px solid gray;
  margin: 0;
  padding: 3px 10px;
  text-align: left;
}

.stat-header {
    display: flex;
    flex-direction: row;
}

.custom-tooltip {
    opacity: 1!important;
    width: 200px!important;
}
</style>