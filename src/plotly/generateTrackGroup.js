
/*
Input

tracks: array of objects
[
  {
    gene: str,
    data: {
      sampleId (str): zscore (float),
      ...
    }
  },
  ...
]
*/

/*
Output

Plotly trace group object (group of tracks)

{
    x: [...sampleIds],
    y: [...trackNamesAlphabetized],
    z: [...zScores],
    type: 'heatmap',
    hovertemplate: zScoreHoverTemplate,
    colorscale: colorscaleValueZscore,
    showscale: true,
    connectgaps: false,
    hoverongaps: true,
    autocolorscale: false,
    zmin:-3,
    zmax:3,
    colorbar: {
      title: '<b>zscore</b>',
        x: 1.00,
        thickness: 10,
        side: 'bottom',
    },
    title: 'zscore'
}
 */

import arr from './arr-stats'

import _ from 'lodash'

export default function generateTrackGroup({
  label,
  trackList,
  samples,
  k_track_v_data,
  i,
}) {
  let colorbar, colorscale, zmax, zmin, showscale, autocolorscale;
  
  showscale = i === 0
  zmax = 3
  zmin = -3
  colorscale =  [
    [0.0, '#002CFE'],
    [1.0, '#FFFF00'],
  ]
  colorbar = {
      title: '<b>z-score</b>',
      xref: 'paper',
      yref: 'paper',
      x: 1.01,
      y: 0.5,
      thickness: 10,
      side: 'bottom',
      len: 220,
      lenmode: 'pixels',
  }
  autocolorscale = false
  trackList.reverse()
  const notMutTracks = trackList.filter(el => !el.includes(' mut'))
  const mutTrackTitle = trackList.find(el => el.includes(' mut'))
  
  let finalTrackOrder = [...notMutTracks]

  const raw_z = k_track_v_data ? notMutTracks.map((track) => {
    return samples.map((sample) => {
      return sample in k_track_v_data[track] ? 
      k_track_v_data[track][sample] : 
      ''
    })
  }) : []
  
  const unnormalized = [...raw_z].map(z => z.filter(score => !_.isString(score) && score > -Infinity))
  const z_scores = unnormalized.map(z => arr.zScores(z))
  const z_score_dict = unnormalized.map((z, j) => Object.fromEntries(z.map((v, i) => [v, z_scores[j][i]])))
  
  let z = raw_z.map((z, i) => z.map(score => {
    if (score in z_score_dict[i]) {
      return z_score_dict[i][score]
    } else {
        return null
    }
  }))  

  //TODO: fix mutation tracks
  
  // if (k_track_v_data && mutTrackTitle) {
  //   const mutZ = samples.map((sample) => {
  //     if (sample in k_track_v_data[mutTrackTitle]) {
  //       console.log('k_track_v_data[sample] ', k_track_v_data[mutTrackTitle][sample])
  //         if (k_track_v_data[mutTrackTitle][sample] === 0) {
  //           return 0.5
  //         }
  //         if (k_track_v_data[mutTrackTitle][sample] === 1) {
  //           return -2.5
  //         }
  //         return null
  //       }
  //       return null
  //     }
  //   )
  //   z.push(mutZ)
  //   finalTrackOrder.push(mutTrackTitle)
  // }

  return {
      x: [...samples],
      y: [...finalTrackOrder],
      z: [...z],
      type: 'heatmap',
      colorscale,
      connectgaps: false,
      hoverongaps: true,
      hovertemplate: `%{y}<extra></extra>`,
      autocolorscale,
      hoverinfo:'text',
      zmin,
      zmax,
      colorbar,
      showscale,
    }
}
