import React      										from 'react'
import { OverlayTrigger, Button }              			from 'react-bootstrap'
import EntryAnalysisChart                               from '../EntryAnalysisChart'
import { EntryAnalysisResultProps }                     from './index'
import 													'./EntryAnalysisResult.css'

const EntryAnalysisResult = ({currentFormContent, currentTitle, documentTones, showAnalysisResultsModal, sentencesToneObjectArray}: EntryAnalysisResultProps) => {

  const renderTooltip = (documentTones:any, documentLevel:boolean, key:number) => (
    <div id='resultsChart'> <EntryAnalysisChart key={key} documentTones={documentTones} documentLevel={documentLevel} /> </div> 
  ) 
 
  return (
    <div className='container entryAnalysisResult'>
      
      <div>
        <Button size='sm' variant="success" id='backToEntryFormButton' onClick = {() => showAnalysisResultsModal(false)} type="button">
		  Go Back to Entry Form
		</Button>		      
		  
		<Button size='sm' variant="danger" onClick = {() => console.log('insertCreateActionHere')}>
		  Save your entry
		</Button>
		  <p className='text-info'><small><i>Hint: Hover over title for document tone and sentences for sentence tone</i></small></p>
	  </div>

	  <OverlayTrigger key={0} placement="top" delay={{ show: 250, hide: 400 }} overlay={() => renderTooltip(documentTones, true, 0)}> 
	    <h4 className='glassHover'>{currentTitle}</h4>
	  </OverlayTrigger>

	  {sentencesToneObjectArray.map((object, idx) => (
	    <OverlayTrigger key={idx+1} placement="top" delay={{ show: 250, hide: 400 }} overlay={() => renderTooltip(object.tones, false, idx+1)}> 
		  <span className='glassHover' id='overlayContentText'>{object.text + '  '}</span>
		</OverlayTrigger>
	  ))}
	  
    </div>
  )
}

export default EntryAnalysisResult

