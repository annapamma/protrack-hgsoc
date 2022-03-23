export default function scatterplot({
  divId,
  sampleMeta,
  track,
  trackData,
  trackDetails,
  category,
  width,
}) {
    const Plotly = window.Plotly
    let data = []

    if (!trackData) { return }

    if (category && category !== 'None') {
      let k_sample_v_categoryLabel = {}
    
      Object.entries(sampleMeta).forEach(([sample, meta]) => {
        k_sample_v_categoryLabel[sample] = meta[category]
      })
  
      data = trackDetails[category].map((o) => {
        let x = []
        let y = []
        let samples = []
        trackData.samples.forEach((sample, i) => {
          if (k_sample_v_categoryLabel[sample] === o.label) {
            samples.push(sample)
            x.push(trackData.a[i])
            y.push(trackData.b[i])
          }
        })
        return {
          x,
          y,
          text: samples,
          mode: 'markers',
          type: 'scatter',
          marker: { 
            size: 8,
            color: o.color.toLowerCase() === '#ffffff' ? '#ebebeb' : o.color,
          },
          name: o.label.length > 0 ? o.label : 'Missing value',
        }
      })
    } else {

      const trace1 = {
        x: trackData.a,
        y: trackData.b,
        mode: 'markers',
        type: 'scatter',
        text: trackData.samples,
        marker: { size: 8 }
      }
      data = [ trace1 ]

    }

    const trackArr = track.split(' - ')
    const trackArrA = trackArr[0].split(' ')
    const trackArrB = trackArr[1].split(' ')
    const geneA = trackArrA[0]
    const dataTypeA = trackArrA[1]
    const remainderA = trackArrA.slice(2,).join(' ')

    const geneB = trackArrB[0]
    const dataTypeB = trackArrB[1]
    const remainderB = trackArrB.slice(2,).join(' ')

    const dataTypeTranslate = {
      'proteo': 'protein abundance',
      'RNA': 'RNA expression',
      'phospho': 'phosphosite abundance',
      'cnv': 'CNV'
    }
    const trackTitle = ``
    const layout = {
      xaxis: {
        title: trackData.gene_a,
      },
      yaxis: {
        title: trackData.gene_b,
      },
      legend: {
        title: {text: category},
      },
      height: 400,
      width,
      title: `${geneA} ${dataTypeTranslate[dataTypeA]} ${remainderA}- ${geneB} ${dataTypeTranslate[dataTypeB]} ${remainderB}<br>pearson correlation: ${trackData.correlation}`,
    }

    const config = {
      responsive: true
    }

    Plotly.newPlot(divId, data, layout, config);
}