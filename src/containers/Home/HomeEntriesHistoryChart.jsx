import React                                    from 'react'
import _ 										from 'lodash'
import                                          './Home.css'
const ReactHighstock = 							require('react-highcharts/ReactHighstock')

const TheChart = ({allEntries}) => {
  config.series = makeData(JSON.parse(allEntries))

  return (
    <div id='Home-HighStock-Chart'>
      <ReactHighstock config={config}> </ReactHighstock>
    </div>
  )
}

const config = {
  rangeSelector: {
    selected: 1
  },
  title: {
    text: 'Document Tones by Date'
  },
  time: {
    useUTC: false
  },
  credits: {
  	enabled: false
  }, 
  legend: {
    enabled: true,
    align: 'center',
    verticalAlign: 'bottom',
  },
}

const makeData = entries => {
  entries.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
  const dataSeries = []
  entries.forEach(entry => {
    const docTones = _.get(entry, 'analysis.documentTones', [])
    const time = _.get(entry, 'createdAt', null)
	docTones.forEach(tone => {
	  const index = _.findIndex(dataSeries, (obj) => obj.name === tone.tone_name ) 
      if(index >= 0){
        dataSeries[index].data.push([time, tone.score])
      }else {
        dataSeries.push({
          name: tone.tone_name,
          data: [[time, tone.score]],
          tooltip: {
		    valueDecimals: 1,
		    xDateFormat: '%m/%d/%Y  %l:%M %P',
		  }
        })
	  }
    })
  })
  return  dataSeries
}

export default TheChart
