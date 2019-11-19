import React, { useState}      							from 'react'
import { useHistory, useParams }                        from 'react-router-dom'
import { Button }              							from 'react-bootstrap'
import EntryAnalysisChart                               from '../EntryAnalysisChart'
import { EntryAnalysisResultProps }                     from './index'
import _												from 'lodash'
import 													'./EntryAnalysisResult.css'

const EntryAnalysisResult = ({currentFormContent, currentTitle, documentTones, formType, showAnalysisResultsModal, sentencesToneObjectArray, postEntry, updateEntry}: EntryAnalysisResultProps) => {

  const [isDocumentLevelAnalysis, changeIsDocumentLevelAnalysis] = useState(true)
  const [highlightedTextIndex, changeHighlightedTextIndex] = useState(-1)
  const [currentTones, changeCurrentTones] = useState(documentTones)
  const history = useHistory()
  const params = useParams()
  const entryId = _.get(params, 'id', '')
 
  return (
  	<div className='row'>
	  
	  <div className='col-md-6 Entry-Analysis'>

	   <p className='Entry-Analysis-Text-Info'>
	     <small><i>Click on the title for the overall document tone.<br/> Click on individual sentences for more specific tone.</i></small>
	   </p>

	    
	    <div className='Entry-Analysis-Text-Interaction'>
	      <h3 
	        id='Entry-Analysis-Text-Interaction-Title' 
	        onClick={e => {
	          changeHighlightedTextIndex(-1)
	          changeIsDocumentLevelAnalysis(true)
	          changeCurrentTones(documentTones)
	        }}
	        className={highlightedTextIndex === -1 ? 'Entry-Analysis-Active-Text' : ''}

	       >
		    {currentTitle}
		  </h3>

		  {sentencesToneObjectArray.map((object, idx) => (
		    <span
		      key={idx}
		      className={highlightedTextIndex === idx ? 'Entry-Analysis-Active-Text' : 'Entry-Analysis-Text'}
		      id=''
		      onClick={e => {
		      	changeHighlightedTextIndex(idx)
		        changeIsDocumentLevelAnalysis(false)
		        changeCurrentTones(object.tones)
		      }}
		    >
		      {object.text + '  '}
		    </span>
		  ))}
	    </div>

	    <div className='Entry-Analysis-Buttons'>
	      <span>
	      	{formType===''&&
		      	<span>
				  <Button 
				    className='Entry-Analysis-Buttons-1'
				    variant='warning' 
				    onClick = {() => {
				      showAnalysisResultsModal(false)
				  	  history.push({
				  	  	pathname: '/entries/edit/' + entryId,
				  	  	state: { currentFormContent, currentTitle, entryId }
				  	  })
				    }} 
				  	type="button"
				  >
				    Edit Entry
				  </Button>	      
					  
	     		  <Button className='Entry-Analysis-Buttons-2' variant='primary' onClick = {() => history.push('/')}>
			        Back to List
				  </Button>		
				</span>
		      }	  
		      {formType==='New'&&
		      	<span>
			      <Button className='Entry-Analysis-Buttons-1' variant='primary' onClick = {() => showAnalysisResultsModal(false)}>
			        Edit Entry
				  </Button>		      
					  
				  <Button className='Entry-Analysis-Buttons-2' variant='warning' onClick={(e:any) => postEntry(e, currentTitle, currentFormContent, documentTones, sentencesToneObjectArray, history)} type="button">
				    Save Entry
				  </Button>
				</span>
		      }	      
		      {formType==='Edit'&&
		      	<span>   
					  
				  <Button 
				    className='Entry-Analysis-Buttons-1'
				    variant='warning' 
				    onClick = {() => {
				      showAnalysisResultsModal(false)
				  	  history.push({
				  	  	pathname: '/entries/edit/' + entryId,
				  	  	state: { currentFormContent, currentTitle, entryId }
				  	  })
				    }} 
				  	type="button"
				  >
				    Edit Entry
				  </Button>

				  <Button className='Entry-Analysis-Buttons-2' variant='success' onClick={(e:any) => updateEntry(e, currentTitle, currentFormContent, documentTones, sentencesToneObjectArray, history, entryId)} type="button">
				    Save Entry
				  </Button>
				</span>
		      }
	      </span>


	    </div>

	  </div>

	  <div className='col-md-6'>
        <div className='Entry-Analysis-Results-Chart'> <EntryAnalysisChart documentTones={currentTones} documentLevel={isDocumentLevelAnalysis} /> </div> 
	  </div>



	</div>

  )
}

export default EntryAnalysisResult

