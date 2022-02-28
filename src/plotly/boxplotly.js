import trackDetails from "../refs/trackDetails"

export default function generateBoxplot({
    associationResults,
    k_track_v_data,
    divId,
    responseCategory,
    sampleMeta,
    xAxisCategory,
    track,
}) {
    if (!k_track_v_data) { return }
    
    const Plotly = window.Plotly

    const gene = track.split(' ')[0]
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
    console.log('annotations: ', annotations)
    const layout = {
      title: track.includes('RNA') ? `${track} Log2 CPM` : track,
      annotations: annotations,
      xaxis: {
        automargin: true,
        title,
      },
      yaxis: {
        title: '',
      },
      legend: {
        title: 'test?'
      },
      boxmode: category !== responseCategory ? 'group' : 'box',
    }

    const config = {
      responsive: true
    }

    Plotly.newPlot(divId, data, layout, config);
}