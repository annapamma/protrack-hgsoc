import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import available from '../refs/available'
import categoryTracks from '../refs/categoryTracks'
import sampleMeta from '../refs/sampleMeta'
import trackDetails from '../refs/trackDetails'

import { 
  getAssociationResults,
  getiProFunRegression,
  getiProFunResults,
  getScatterPlotTracks,
  getTrackData,
  getTracks, 
} from '../firebase'

import sortFn from '../sortFn'

const trackDetails_k_label_v_value = {}
Object.keys(trackDetails).forEach(series => {
  const res = {}
  trackDetails[series]
    .forEach(el => 
      res[el.label] = el.value
    )
  trackDetails_k_label_v_value[series] = res
})

export default new Vuex.Store({
  state: {
    available,
    associationResults: {},
    barplotCategory: 'Tumor response',
    boxplotCategory: 'Tumor response',
    boxplotCategory2: 'Protein cluster',
    boxplotGene: null,
    boxplotGenes: null,
    boxplotDataType: 'proteo',
    boxplotDataTypes: ['proteo', 'RNA', 'phospho', 'cnv'],
    boxplotView: 'byGene',
    Boxplot_k_gene_v_tracks: null,
    Boxplot_k_track_v_data: null,
    categoryTracks: categoryTracks,
    clinicalTracks: null,
    heatmapGenes: null,
    heatmapLockTracks: true,
    heatmapShownDataTypes: ['RNA', 'proteo', 'phospho', 'CNV', 'LOH'],
    heatmapTracksToLock: ['Tumor response'],
    Heatmap_k_gene_v_tracks: null,
    Heatmap_k_track_v_data: null,
    IprofunFigureGenerated: {},
    IprofunGene: '',
    iprofunRegression: {},
    loaderBoxplot: false,
    loaderHeatmap: false,
    loaderIprofun: false,
    loaderScatterplot: false,
    sampleMeta,
    sampleOrder: Object.keys(sampleMeta),
    sampleOrderFiltered: Object.keys(sampleMeta),
    scatterplotCategory: null,
    scatterplotGenes: null,
    scatterplotTracks: {},
    scatterplotTracksShown: null,
    Scatterplot_k_gene_v_tracks: null,
    Scatterplot_k_track_v_data: null,
    selectedGroup: '',
    selectedSample: null,
    selectedSeries: null,
    selectedValue: null,
    showText: true,
    trackDetails,
    trackDetails_k_label_v_value,
    // view: 'Iprofun',
    view: 'Heatmap',
    views: ['Boxplot', 'Heatmap', 'Iprofun', 'Sample dashboard', 'Scatterplot',],
  },
  mutations: {
    SET_BOXPLOT_ASSOCIATION_RESULTS(state, { associationResults }) { 
      state.associationResults = associationResults },
    SET_BARPLOT_CATEGORY(state, { barplotCategory }) { state.barplotCategory = barplotCategory },
    SET_BOXPLOT_DATA_TYPE(state, { boxplotDataType }) { state.boxplotDataType = boxplotDataType },
    SET_BOXPLOT_GENE(state, { boxplotGene }) { state.boxplotGene = boxplotGene },
    SET_BOXPLOT_CATEGORY(state, { boxplotCategory }) { state.boxplotCategory = boxplotCategory },
    SET_BOXPLOT_CATEGORY2(state, { boxplotCategory2 }) { state.boxplotCategory2 = boxplotCategory2 },
    SET_BOXPLOT_GENES(state, { boxplotGenes }) { state.boxplotGenes = boxplotGenes },
    SET_BOXPLOT_VIEW(state, { boxplotView }) { state.boxplotView = boxplotView },
    SET_K_GENE_V_TRACKS(state, { view, k_gene_v_tracks }) {
      state[`${view}_k_gene_v_tracks`] = k_gene_v_tracks
    },
    SET_K_TRACK_V_DATA(state, { view, k_track_v_data }) {
      state[`${view}_k_track_v_data`] = k_track_v_data
    },
    SET_HEATMAP_GENES(state, { heatmapGenes }) { state.heatmapGenes = heatmapGenes },
    SET_HEATMAP_LOCK_TRACKS(state, { heatmapLockTracks }) { state.heatmapLockTracks = heatmapLockTracks },
    SET_HEATMAP_SHOWN_DATA_TYPES(state, { heatmapShownDataTypes }) { state.heatmapShownDataTypes  = heatmapShownDataTypes },
    SET_HEATMAP_TRACKS_TO_LOCK(state, { heatmapTracksToLock }) { state.heatmapTracksToLock = heatmapTracksToLock },
    SET_IPROFUN_FIGURE_GENERATED(state, { IprofunFigureGenerated }) { state.IprofunFigureGenerated = IprofunFigureGenerated },
    SET_IPROFUN_GENE(state, { IprofunGene }) { state.IprofunGene = IprofunGene },
    SET_IPROFUN_REGRESSION(state, { predictor, resp }) {
      state.iprofunRegression = { ...state.iprofunRegression, [predictor]: resp}
    },
    SET_LOADING(state, { loader, isLoading }) { state[loader] = isLoading },
    SET_SAMPLE_ORDER_FILTERED(state, { sampleOrderFiltered }) { state.sampleOrderFiltered = sampleOrderFiltered },
    SET_SCATTERPLOT_CATEGORY(state, { scatterplotCategory }) { state.scatterplotCategory = scatterplotCategory },
    SET_SCATTERPLOT_GENES(state, { scatterplotGenes }) { state.scatterplotGenes = scatterplotGenes },
    SET_SCATTERPLOT_TRACKS(state, { scatterplotTracks }) { state.scatterplotTracks = scatterplotTracks },
    SET_SCATTERPLOT_TRACKS_SHOWN(state, { scatterplotTracksShown }) { state.scatterplotTracksShown = scatterplotTracksShown },
    SET_SHOW_TEXT(state, { showText }) { state.showText = showText },
    SET_VIEW(state, { view }) { state.view = view },
    UPDATE_SAMPLES(state, { sampleOrder }) { state.sampleOrder = sampleOrder }, 
    UPDATE_SELECTED_DATA(state, { selectedSample, selectedSeries, selectedValue }) {
      state.selectedSample = selectedSample
      state.selectedSeries = selectedSeries
      state.selectedValue = selectedValue
    },
    UPDATE_TRACK_DETAILS(state, { trackDetails }) { state.trackDetails = trackDetails },
  },
  actions: {
    async fetchAssociationResults(store, { genes }) {
      const asyncPromises = [...genes].map((gene) => {
        return getAssociationResults(gene)
      })

      const res = await Promise.all(asyncPromises)
      const associationResults = Object.fromEntries(res)
      store.commit('SET_BOXPLOT_ASSOCIATION_RESULTS', { associationResults })
    },
    async fetchIprofun(store, { IprofunGene }) {
      const IprofunFigureGenerated = await getiProFunResults(IprofunGene)
      store.commit('SET_IPROFUN_FIGURE_GENERATED', { IprofunFigureGenerated })
      store.commit('SET_LOADING' , { loader: `loaderIprofun`, isLoading: false })
      // store.commit('SET_IPROFUN', resp)
    },
    async fetchIprofunRegression(store, { predictor, gene }) {
      const resp = await getiProFunRegression(predictor, gene)

      store.commit('SET_IPROFUN_REGRESSION', { predictor, resp })
    },
    filterSamples(store) {
      let categoryValuesShown = {}
      Object.entries(store.state.trackDetails)
        .forEach(([track, details]) => {
          categoryValuesShown[track] = {}
          details.forEach(el => 
            categoryValuesShown[track][el.label] = el.show
          )
        })
      const sampleOrderFiltered = store.state.sampleOrder
        .filter((sample) => {
          const showArr = Object.entries(categoryValuesShown)
            .map(([category, valuesShown]) => {
              return valuesShown[store.state.sampleMeta[sample][category]]
            })
          return showArr.every(el => el)
        })

      store.commit('SET_SAMPLE_ORDER_FILTERED', { sampleOrderFiltered })
    },
    async getScatterPlotTracks(store, { genes: [a, b] }) {
      let scatterplotTracks = await getScatterPlotTracks(a, b)
      scatterplotTracks = Object.fromEntries(scatterplotTracks.filter(([, data]) => data))

      store.commit('SET_SCATTERPLOT_TRACKS', { scatterplotTracks })
      store.commit('SET_LOADING' , { loader: `loaderScatterplot`, isLoading: false })
    },
    async getTrackData(store, { view, tracks }) {
      const trackPromises = [...tracks].map((track) => {
        return getTrackData(track)
      })

      const trackRes = await Promise.all(trackPromises)

      const k_track_v_data = Object.fromEntries(trackRes)
      store.commit('SET_K_TRACK_V_DATA', { view, k_track_v_data })
      store.commit('SET_LOADING' , { loader: `loader${view}`, isLoading: false })
    },
    setBarplotCategory(store, { barplotCategory }) { store.commit('SET_BARPLOT_CATEGORY', { barplotCategory }) },
    setBoxplotCategory(store, { boxplotCategory }) { store.commit('SET_BOXPLOT_CATEGORY', { boxplotCategory }) },
    setBoxplotCategory2(store, { boxplotCategory2 }) { store.commit('SET_BOXPLOT_CATEGORY2', { boxplotCategory2 }) },
    setBoxplotGene(store, { boxplotGene }) { store.commit('SET_BOXPLOT_GENE', { boxplotGene }) },
    setBoxplotDataType(store, { boxplotDataType }) { store.commit('SET_BOXPLOT_DATA_TYPE', { boxplotDataType }) },
    setBoxplotView(store, { boxplotView }) { store.commit('SET_BOXPLOT_VIEW', { boxplotView }) },
    setHeatmapLockTracks(store, { heatmapLockTracks }) { store.commit('SET_HEATMAP_LOCK_TRACKS', { heatmapLockTracks }) },
    setHeatmapTracksToLock(store, { heatmapTracksToLock }) { store.commit('SET_HEATMAP_TRACKS_TO_LOCK', { heatmapTracksToLock }) },
    setHeatmapShownDataTypes(store, { heatmapShownDataTypes }) { store.commit('SET_HEATMAP_SHOWN_DATA_TYPES', { heatmapShownDataTypes }) },
    setScatterplotCategory(store, { scatterplotCategory }) { store.commit('SET_SCATTERPLOT_CATEGORY', { scatterplotCategory })},
    setScatterplotTracksShown(store, { scatterplotTracksShown }) { store.commit('SET_SCATTERPLOT_TRACKS_SHOWN', { scatterplotTracksShown }) },
    setShowText(store, { showText }) { store.commit('SET_SHOW_TEXT', { showText }) },
    setView(store, { view }) { store.commit('SET_VIEW', { view }) },
    sortSamples(store, { asc, series }) {
      let data = {}
      if (series in store.state.trackDetails) {
        const labelVal = trackDetails_k_label_v_value[series]
  
        Object.entries(store.state.sampleMeta)
          .forEach(([sample, meta]) => {
            data[sample] = labelVal[meta[series]]
          })
      } else {
        data = deepClone(store.state.Heatmap_k_track_v_data[series])
      }
      
      Object.entries(data).forEach(([sample, val]) => {
        if (val === '' || !val) {
          data[sample] = asc ? -Infinity : Infinity
        }
      })
      
      let sampleOrder = sortFn({
        data,
        asc
      }).filter(s => store.state.sampleOrder.includes(s))

      if (store.state.heatmapLockTracks) {
        const categories = [...store.state.heatmapTracksToLock]
        categories.forEach(category => {
          const k_sample_v_categoryVal = {}
          store.state.sampleOrder.forEach(sample => {
              const label = store.state.sampleMeta[sample][category]
              const categoryVal = store.state.trackDetails_k_label_v_value[category][label]
              k_sample_v_categoryVal[sample] = categoryVal
            }
          )
          sampleOrder.sort(function(a,b){return k_sample_v_categoryVal[a]-k_sample_v_categoryVal[b]})
        })
      }

      store.commit('UPDATE_SAMPLES', { sampleOrder })
      store.dispatch('filterSamples')
     },
    submitBoxplotGenes(store, { view, boxplotGenes }) {
      store.commit('SET_BOXPLOT_GENES', { boxplotGenes })
      store.commit('SET_BOXPLOT_GENE', { boxplotGene: boxplotGenes[0] })
      store.commit('SET_LOADING', { loader: `loader${view}`, isLoading: true })
      store.dispatch('submitInput', { view, genes: boxplotGenes })
      store.dispatch('fetchAssociationResults', { genes: boxplotGenes })
    },
    submitHeatmapGenes(store, { view, heatmapGenes }) {
      store.commit('SET_HEATMAP_GENES', { heatmapGenes })
      store.commit('SET_LOADING', { loader: `loader${view}`, isLoading: true })
      store.dispatch('submitInput', { view, genes: heatmapGenes })
    },
    async submitInput(store, { view, genes }) {
      const trackPromises = [...genes].map((gene) => {
        return getTracks(gene)
      })

      const trackRes = await Promise.all(trackPromises)

      let k_gene_v_tracks = Object.fromEntries(trackRes)

      store.commit('SET_K_GENE_V_TRACKS', { view, k_gene_v_tracks })
      
      const tracks = Object.values(k_gene_v_tracks).flat()

      store.dispatch('getTrackData', { view, tracks })
    },
    submitIprofunGene(store, { view, IprofunGene }) {
      store.commit('SET_LOADING', { loader: `loader${view}`, isLoading: true })
      store.commit('SET_IPROFUN_GENE', { IprofunGene })
      store.dispatch('fetchIprofun', { IprofunGene })
      store.dispatch('fetchIprofunRegression', { gene: IprofunGene, predictor: 'LOH' })
      store.dispatch('fetchIprofunRegression', { gene: IprofunGene, predictor: 'CNV' })
      store.dispatch('fetchIprofunRegression', { gene: IprofunGene, predictor: 'Mutation' })
    },
    submitScatterplotGenes(store, { view, scatterplotGenes }) { 
      if (!scatterplotGenes) { return }
      store.commit('SET_SCATTERPLOT_GENES', { scatterplotGenes })
      store.commit('SET_LOADING', { loader: `loader${view}`, isLoading: true })
      store.dispatch('getScatterPlotTracks', { genes: scatterplotGenes })
    },
    updateSelectedData(store, { selectedSample, selectedSeries, selectedValue }) {
      store.commit('UPDATE_SELECTED_DATA', { selectedSample, selectedSeries, selectedValue })
    },
    updateShownFeatures(store, { track, shownFeatures }) {
      let trackDetails = deepClone(store.state.trackDetails)
      trackDetails[track].forEach((o) => {
        o.show = shownFeatures.includes(o.value)
      })
      store.commit('UPDATE_TRACK_DETAILS', { trackDetails })
      store.dispatch('filterSamples')
    },
  },
})


function deepClone(o) {
  return JSON.parse(JSON.stringify(o))
}