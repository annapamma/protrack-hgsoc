import trackDetails from "../refs/trackDetails"

export default function generateBoxplot({
    associationResults,
    divId,
    k_track_v_data,
    responseCategory,
    sampleMeta,
    track,
    xAxisCategory,
    yAxisLabels,
}) {
    if (!k_track_v_data) { return }
    
    const Plotly = window.Plotly
    const trackArr = track.split(' ')
    const gene = trackArr[0]
    const dataType = trackArr[1]
    const remainder = trackArr.slice(2,).join(' ')
    const dataTypeTranslate = {
      'proteo': 'protein abundance',
      'RNA': 'RNA expression',
      'phospho': 'phosphosite abundance',
      'cnv': 'CNV'
    }
    const trackTitle = `${gene} ${dataTypeTranslate[dataType]} ${remainder}`
    
    const pVals = associationResults[gene]
    let category = xAxisCategory
    
    let xAxisSamples = {}
  
    Object.entries(sampleMeta).forEach(([sample, o]) => {
        let label = o[xAxisCategory]
        if (!(label in xAxisSamples)) {
            xAxisSamples[label] = []
        }
        xAxisSamples[label].push(sample)
    })

    const yAxisCategory = responseCategory
    let yAxisSamples = {}

    Object.entries(sampleMeta).forEach(([sample, o]) => {
        let label = o[yAxisCategory]
        if (!(label in yAxisSamples)) {
            yAxisSamples[label] = []
        }
        yAxisSamples[label].push(sample)
    })

    let data = trackDetails[xAxisCategory].map((o) => {
        const xSamples = xAxisSamples[o.label]
        let trace = {
          x: [],
          y: [],
          name: o.label.length > 0 ? o.label : 'Missing',
          marker: { color: o.label.length > 0 ? o.color : '#808080' },
          type: 'box',
          boxpoints: 'all',
          pointpos: 0,
        }

        trackDetails[yAxisCategory].forEach((yAxisOpt) => {
          const yLabel = yAxisOpt.label
          const ySamples = yAxisSamples[yLabel]
          const overlapSamples = ySamples.filter(ySample => xSamples.includes(ySample))
          overlapSamples.forEach((oSample) => {
            trace.x.push(yLabel.length > 0 ? yLabel : 'Missing')
            trace.y.push(k_track_v_data[track][oSample])
          })
        })

        return trace
      })
    
    let title = ''
    if (yAxisCategory !== xAxisCategory) {
      title = `${yAxisCategory}<br>stratified by<br>${xAxisCategory}`
    } else {
      title = yAxisCategory
    }

    let annotations = []
    if (pVals && responseCategory.includes('cluster') && track.includes('proteo')) {
      Object.entries(pVals).forEach(([cluster, pVal]) => {
          if (!isNaN(parseInt(cluster) )) {
            annotations.push({
              xref: 'x',
              yref: 'paper',
              x: parseInt(cluster),
              xanchor: 'center',
              y: 1.1,
              text: `p = ${pVal}`,
              showarrow: false
            })
        }
      }) 
    }

    if (pVals 
      && responseCategory === 'Tumor response' 
      && xAxisCategory === 'Tumor response') {
        const trackArr = track.split(' ')
        const dataType = trackArr[1]
        if (dataType in pVals) {
          
          if (dataType === 'phospho') {
            const site = trackArr[trackArr.length - 1]
            if (site in pVals.phospho) {
              const pVal = pVals.phospho[site]
              annotations.push({
                xref: 'paper',
                yref: 'paper',
                x: 0.5,
                xanchor: 'center',
                y: 1.1,
                text: `p = ${pVal}`,
                showarrow: false
              })
            }

          } else {
            const pVal = pVals[dataType]
            annotations.push({
              xref: 'paper',
              yref: 'paper',
              x: 0.5,
              xanchor: 'center',
              y: 1.1,
              text: `p = ${pVal}`,
              showarrow: false
            })
          }

        }
    }

    const yAxisLabel = yAxisLabels[track.split(' ')[1]]

    const layout = {
      title: trackTitle,
      annotations: annotations,
      xaxis: {
        automargin: true,
        title,
      },
      yaxis: {
        title: yAxisLabel,
      },
      legend: {
      },
      boxmode: category !== responseCategory ? 'group' : 'box',
    }

    const config = {
      responsive: true
    }

    Plotly.newPlot(divId, data, layout, config);
}