import modebar from './layout/modebar'

export default function generateBarplot(
    {
        track,
        divId,
        trackDetails,
        sampleMeta,
        xAxisCategory,
        showText,
    }
) {
    const Plotly = window.Plotly
    let data = []
    let xAxisSamples = {}

    Object.entries(sampleMeta).forEach(([sample, o]) => {
        let label = o[xAxisCategory]
        if (!(label in xAxisSamples)) {
            xAxisSamples[label] = []
        }
        xAxisSamples[label].push(sample)
    })

    const yAxisCategory = track
    let yAxisSamples = {}

    Object.entries(sampleMeta).forEach(([sample, o]) => {
        let label = o[yAxisCategory]
        if (label.length === 0) {
            label = 'Missing'
        }
        if (!(label in yAxisSamples)) {
            yAxisSamples[label] = []
        }
        yAxisSamples[label].push(sample)
    })

    trackDetails[xAxisCategory].forEach(xAxisOpt => {
        const label = xAxisOpt.label
        const xSamples = xAxisSamples[label]
        let trace = {
            name: label.length > 0 ? label : 'Missing',
            type: 'bar',
            x: [],
            y: [],
            customdata: [],
            text: [],
        }

        trace.marker = {
            color: xAxisOpt.color,
            line: {
                color: 'rgb(8,48,107)',
                width: 1
            }
        }

        trackDetails[track].forEach((o) => {
            const yAxisLabel = o.label.length > 0 ? o.label : 'Missing'
            const ySamples = yAxisSamples[yAxisLabel]
            if (!ySamples) {
                return
            }
            trace.x.push(yAxisLabel ? `${yAxisLabel} (${ySamples.length})` : 'Missing')
            let intersectXYSamples = ySamples.filter(sample => xSamples.includes(sample))
            trace.customdata.push(intersectXYSamples)
            trace.y.push(intersectXYSamples.length)
            if (showText) {
                trace.text.push(intersectXYSamples.length)
            }
        })

        data.push(trace)          
    })

    data.reverse()

    const layout = {
        autosize: true,
        width: 400,
        barmode: 'stack', 
        title: {
            text: track.toLowerCase().includes('verhaak') ? 
            `<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2818769/">${track}</a>`
             : track,
            xref: 'x',
            x: 0.5,
            yref: 'y',
            y: 1,
            font: {
                size: 15,
              }
        },
        xaxis: {
            automargin: true,
            showgrid: false,
            zeroline: false,
            type: "category",
        },
        yaxis: {
            showgrid: false, 
            // showticklabels: false
        },
        margin: {
            b: 10,
            t: 20,
            l: 20,
            r: 10,
        },
        legend: {
            orientation: "v",
            y: 0.7,
            x: 1.1,
            title: { 
                text: xAxisCategory !== yAxisCategory ? xAxisCategory : '', 
                font: {
                    size: 12,
                }
            },

        },
        
        modebar: modebar.barplot,
    }

    const config = {
        responsive: true,
        displaylogo: false,
    }

    Plotly.newPlot(divId, data, layout, config)

    return document.getElementById(divId)
}