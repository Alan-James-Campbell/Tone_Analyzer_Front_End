import React                                                          from 'react'
import {ComposedChart, Cell, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import                                                                './EntryAnalysisChart.css'

interface EntryAnalysisChartProps { 
  documentTones:  ReadonlyArray<{tone_name: string, tone_id: string, score: number }>,
  documentLevel: Boolean
}

const EntryAnalysisChart = ({documentTones, documentLevel}: EntryAnalysisChartProps) => (
  <div id='EntryAnalysisChart'> 
    
    <h5>{documentLevel ? 'Overall Document Tone' : 'Sentence Tone'}</h5>
      
    {documentTones.length > 0&&(
      <ComposedChart
        layout='vertical'
        width={500}
        height={190}
        data={documentTones}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type='number' />
        <YAxis width={100} dataKey='tone_name' type='category' />
        <Bar 
          isAnimationActive={false} 
          dataKey="score" barSize={5} 
       >
          {
            documentTones.map((entry, idx) => {
              const color = toneColorDictionary[entry.tone_name] !== undefined ? toneColorDictionary[entry.tone_name] : 'black' 
              return <Cell  key={idx} fill={color} />
            })
          }
       </Bar>
      </ComposedChart>
    )}
      
    {!(documentTones.length > 0)&&(
      <h6 className='center'>{documentLevel ? 'No Overall Document Tone Detected' : 'No Sentence Tone Detected' }</h6>
    )}
  </div>
)

const toneColorDictionary: {[index: string]:any} = {
  Anger: 'red',
  Confident: 'orange',
  Sadness: 'blue',
  Fear: 'purple',
  Joy: 'DeepPink',
  Analytical: 'Brown'
}

export default EntryAnalysisChart
