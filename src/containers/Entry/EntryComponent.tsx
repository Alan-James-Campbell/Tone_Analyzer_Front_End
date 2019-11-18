import React, { useState}      							from 'react'
import { useParams }                     				from 'react-router-dom'
import { Button }              							from 'react-bootstrap'
import EntryAnalysisResult                              from '../EntryAnalysisResult'
import { EntryProps }									from './index'
import _											    from 'lodash'
// import 												'./Entry.css'

const Entry = ({ allEntries }: EntryProps) => {
  const { id } = useParams()
  const data = JSON.parse(allEntries)
  const paramsEntry = _.find(data, function(obj) {return obj.entryId === id})
  let currentFormContent, currentTitle, documentTones, sentencesToneObjectArray
  if(paramsEntry){
    currentFormContent = paramsEntry.content
    currentTitle = paramsEntry.title
    documentTones = paramsEntry.analysis.documentTones
    sentencesToneObjectArray = paramsEntry.analysis.sentencesTones
  }

  return (
  	<div className='row'>
	  
	  	{data.length > 0&&(
	     <EntryAnalysisResult formType='' currentFormContent={currentFormContent} currentTitle={currentTitle} documentTones={documentTones} sentencesToneObjectArray={sentencesToneObjectArray}/>
	  	)}

	</div>

  )
}


export default Entry


