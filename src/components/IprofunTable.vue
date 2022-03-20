<template>
    <div class="iprofun-table">
        <table class="iprofun-table-table">
            <!-- main header -->
            <tr> 
                <th colspan=1></th>
                <th v-for="header in headers"  
                    :style="`background: ${responseColors[header]};`" 
                    :key="header">
                    {{ header }} {{ header === 'Interaction' ? '' : 'tumors' }}
                </th>
            </tr>
            <tr>
                <td 
                    style="text-align: center;"
                     :class="{
                        isBold: true,
                        isYellow: true,
                    }"
                >
                    <div class="stat-header">
                        <div>
                            cis-regulation found
                        </div>
                        <v-tooltip 
                            content-class='custom-tooltip'
                            bottom 
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
                            <span>{{ statDetails.iProFun_identified.description }}</span>
                        </v-tooltip>
                    </div>
                </td>
                <td                 
                    v-for="header in headers"
                    :key="header"
                    :class="{
                        isBold: true,
                        isGreen: cisregulationFound(iprofunRegression[header]),
                    }"
                >
                {{ cisregulationFound(iprofunRegression[header]) ? 'Yes' : 'No' }} -- {{ cisregulationGroup(iprofunRegression[header]) }}
                </td>
                </tr>
        </table>
        <iprofun-table-details :predictor="predictor" />
    </div>
</template>

<script>
import IprofunTableDetails from './IprofunTableDetails.vue'
    export default {
        props: ['predictor'],
        components: {
                IprofunTableDetails
        },
        data() {
            return {
                statDetails: {
                    EST: {
                        label: 'Co-efficient',
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
                    'Refractory': 'rgba(12, 123, 220, 0.5)',
                    'Sensitive': 'rgba(255, 194, 10, 0.5)',
                    'Interaction': '#CBC3E3',

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
                    'iProFun_identified',  'P', 'EST',
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
            cisregulationFound(regressionGroup) {
                return Object.values(regressionGroup).map(el => el.iProFun_identified).every(el => el === 1)
            },
            cisregulationGroup(regressionGroup) {
                return Object.entries(regressionGroup).map(([dt, el]) => [dt, el.iProFun_identified])
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
.iprofun-table {
    width: 100%;
    margin: 10px;
}
/* Style for cells with any colspan attribute */
td[colspan] {
  text-align: center;
}

.iprofun-table-table {
    width: 100%;
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
</style>