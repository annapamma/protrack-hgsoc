import fillerObj from "./fillerObj"
import generateCategoricalTrackGroup from "./generateCategoricalTrack"
import generateLayout from './layout/generateLayout'
import generateTrackGroup from './generateTrackGroup'


export default function generateHeatmap(
  {
    categoryTracks,
    k_gene_v_tracks,
    k_track_v_data,
    sampleMeta,
    sampleOrder,
    // shownDataTypes,
    trackDetails
  }
) {
    if (!sampleMeta) { return }
    
    const Plotly = window.Plotly
    let molecular = []


    let categorical_a = [
      ...generateCategoricalTrackGroup({
          sampleOrder,
          sampleMeta,
          trackDetails,
          tracks: categoryTracks.Ungrouped.slice(0,3),
      }),
      fillerObj({
          i: 1,
          samples: sampleOrder,
          marker: '-'
      })
  ]  
  .flat()
  .reverse()
  if (k_gene_v_tracks && k_track_v_data) {
    molecular = Object.entries(k_gene_v_tracks)
      .map(([gene, trackList], i) => {
        const filteredTracks = trackList
            // const filteredTracks = trackList.filter(track => {
            //     const trackArr = track.split(' ')
            //     const trackDataType = trackArr[1]
            //     return shownDataTypes.includes(trackDataType)
            // }
          // )
            return [                
                fillerObj({
                        i: i+1,
                        samples: sampleOrder,
                        marker: '*'
                    }),
                generateTrackGroup({
                    label: gene,
                    trackList: [...filteredTracks],
                    samples: sampleOrder,
                    i,
                    k_track_v_data,
                })
            ] 
      })
      .flat()
  }


  let categorical_b = [
        ...generateCategoricalTrackGroup({
            sampleOrder,
            sampleMeta,
            trackDetails,
            tracks: categoryTracks.Ungrouped.slice(3,),
        }),
        fillerObj({
            i: 1,
            samples: sampleOrder,
            marker: '-'
        })
    ]  
    .flat()
    .reverse()
    if (k_gene_v_tracks && k_track_v_data) {
      molecular = Object.entries(k_gene_v_tracks)
        .map(([gene, trackList], i) => {
          const filteredTracks = trackList
              return [                
                  fillerObj({
                          i: i+1,
                          samples: sampleOrder,
                          marker: '*'
                      }),
                  generateTrackGroup({
                      label: gene,
                      trackList: [...filteredTracks],
                      samples: sampleOrder,
                      i,
                      k_track_v_data,
                  })
              ] 
        })
        .flat()
    }

      const filler =  fillerObj({
        i: 2,
        samples: sampleOrder,
        marker: "'"
    })

    let data = [
      ...molecular,
      ...categorical_b,
      filler,
      ...categorical_a,
    ]

    data.forEach((track) => {
      if (track) {
          track.z.splice(0,0,[])
          track.y.splice(0,0,'')
          track.xgap = 0.1
      }
    })

    const layout = generateLayout(data)

    const config = { 
        repsonsive: true,
        displaylogo: false,
        annotations: [
        ],
    }

    Plotly.newPlot('plotly-heatmap', data, layout, config);

    return document.getElementById('plotly-heatmap')
}