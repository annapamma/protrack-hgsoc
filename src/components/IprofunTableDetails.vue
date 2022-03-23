<template>
    <div class="iprofun-table-details">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                Expand to see associated p-values for each data type and tumor group
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <table class="iprofun-table-table">
                        <!-- main header -->
                        <tr> 
                            <th colspan=1 rowspan=2>P-value details</th>
                            <th :colspan="stats.length" v-for="header in headers"  
                                :style="`background: ${responseColors[header]}; `" 
                                :class="{
                                    isBordered: true,
                                }"
                                :key="header">
                                {{ header }} {{ header === 'Interaction' ? '' : 'tumors' }}
                            </th>
                        </tr>
                        <!-- space for stats headers  -->
                        <tr>
                            <template v-for="header in headers">
                                <td 
                                    v-for="stat in stats" 
                                    :key="`${stat}-${header}`"
                                    :class="{
                                        isBordered: stat === 'P',
                                    }"
                                >
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
                                    <div>
                                    {{ statDetails[stat].label }}
                                    </div>
                                </div>
                                </td>
                            </template>
                        </tr>
                        <!-- dataType rows -->
                        <tr v-for="dataType in dataTypes" :key="dataType" >
                            <td style="text-align: center;">Association between <b><br>{{ IprofunGene }} {{ dataType }} {{ suffix[dataType] }}</b> and <b><br>{{ predictor }}</b></td>
                            <template v-for="header in headers">
                                <td 
                                    v-for="stat in stats" 
                                    :key="`${stat}-${header}-${dataType}`" 
                                    :class="{
                                            isBold: isCisRegulation({ label: statDetails[stat].label }),
                                            isGreen: IprofunFound({ found: foundStat(header, dataType, stat) }),
                                            isBordered: stat === 'P',
                                    }"
                                >
                                    {{ 
                                        foundStat(header, dataType, stat)
                                    }}
                                </td>
                            </template>
                        </tr>
                    </table>

                </v-expansion-panel-content>

            </v-expansion-panel>
        </v-expansion-panels>
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
                        label: 'Coefficient',
                        description: 'estimate of the regression coefficients',
                        show: true,
                    },
                    P: {
                        label: 'Pval',
                        description: 'P-value of the regression coefficients',
                        show: true,
                    },
                    FWER: {
                        label: 'FWER',
                        description: 'Family-wise error rate',
                        show: false,
                    },
                    FDR: {
                        label: 'FDR',
                        description: 'False-discovery rate',
                        show: false,
                    },
                    iProFun_identified: {
                        label: 'cis-regulation found',
                        description: 'Whether an association is identified in multi-omic integrative iProFun analysis.',
                        show: true,
                    }
                },
                suffix: {
                    RNA: 'expression',
                    Protein: 'abundance',
                    Phospho: 'abundance',
                },
                responseColors: {
                    'Refractory': 'rgba(12, 123, 220, 0.2)',
                    'Sensitive': 'rgba(255, 194, 10, 0.2)',
                    'Interaction': '#CBC3E3',

                },
                dataTypeTranslate: {
                    'RNA': 'RNA',
                    'Protein': 'protein',
                    'Phospho': 'phosphosite',
                },

                translate: {
                    iProFun_identified: {
                        0: 'No',
                        1: 'Yes',
                    }
                }
            }
        },
        name: "iprofun-table-details",
        computed: {
            headers() {
                if (!this.iprofunRegression) { return [] }
                const availableOrder = [
                    'Refractory', 'Sensitive', 'Interaction'
                ]
                
                return availableOrder.filter(header =>  Object.keys(this.iprofunRegression).includes(header) )
            },
            dataTypes() {
                if (!this.iprofunRegression) { return [] }
                const availableOrder = [
                    'RNA', 'Protein', 'Phospho'
                ]

                return availableOrder.filter(dataType =>  Object.keys(this.iprofunRegression[this.headers[0]]).includes(dataType) )
            },
            stats() {
                if (!this.iprofunRegression) { return [] }
                const availableOrder = [
                    'P', 'EST',
                ]
                return availableOrder.map((stat) => {
                    if (Object.keys(this.iprofunRegression[this.headers[0]][this.dataTypes[0]]).includes(stat)) {
                        return stat
                    }
                })
            },
            IprofunGene() {
                return this.$store.state.IprofunGene
            },
            iprofunRegression() {
                return this.$store.state.iprofunRegression[this.predictor]
            },
        },
        methods: {
            isCisRegulation({ label }) { 
                return label && label.includes('cis-regulation') 
            },
            IprofunFound({ found }) {
                return found === 'Yes'
            },
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
.iprofun-table-details {
    width: 100%;
    margin-top: 20px;
}

/* Style for cells with any colspan attribute */
td[colspan] {
  text-align: center;
}

.iprofun-table-table {
    width: 100%;
    margin-top: 10px;
}
/* No extra space between cells */
table {
    overflow-x:scroll;
  border-collapse: collapse;

}

th, td {
  border: 1px solid #bebebe;
  margin: 0;
  padding: 3px 10px;
  text-align: left;
  text-align: center;
}

.stat-header {
    display: flex;
    flex-direction: row;
}

.custom-tooltip {
    opacity: 1!important;
    width: 200px!important;
}

.isBold {
    font-weight: bold;
}

.isGreen {
    background: #e5f6df;
}

.isYellow {
    background: #ffffe9;
}

.isBordered {
    /* border: solid 1px #000000 !important; */
}
</style>