import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { FormGroup, Input }                                 from 'reactstrap'
import { Field }                                            from 'redux-form'
import { EntryFormProps }                                   from './index'
import { minLength5, minLength20 }                          from '../../validations'
import EntryAnalysisResult                                  from '../EntryAnalysisResult'
import                                                      './EntryForm.css'

const EntryForm = ({ analysisResultsModalIsShowing, analyzeEntry, currentFormContent, currentTitle, documentTones, formType, lastAnalyzedEntryResults, lastAnalyzedTextSubmission, sentencesToneObjectArray, showAnalysisResultsModal, valid }: EntryFormProps) => {                                                      
  

  return (
    <div>
      <div className=''>
        
        {!analysisResultsModalIsShowing&&(
          <div className='Entry-Form'>        
            <h2>{formType} Entry </h2><br/>
            <form> 
              <label>Title</label>
              <Field name='title'label='title' type='input'component={ReduxFormInput}  validate={ [minLength5] } />
            
              <label>Content</label>
              <Field name='content'label='content 'type='textarea'component={ReduxFormInput} validate={ [minLength20] } />
            
              <Button id='Entry-Form-Show-Analysis-Button' block disabled={!valid} onClick={(e:any) => currentFormContent === lastAnalyzedTextSubmission ? showAnalysisResultsModal(true) : analyzeEntry(e, currentFormContent)} > Show Analysis </Button>
            </form>
          </div>
        )}

        {analysisResultsModalIsShowing&&(
          <div>
            <EntryAnalysisResult formType={formType} currentFormContent={currentFormContent} currentTitle={currentTitle} documentTones={documentTones} sentencesToneObjectArray={sentencesToneObjectArray}/>
          </div> 
        )}
        
      </div>
    </div>
  )
}

const ReduxFormInput: React.FC = (field: any) => (
  <div>
  <FormGroup row={true}>
    <Input
      {...field.input}
      className='Entry-Form-Input'
      type={field.type}
      rows='10'
      disabled={field.disabled}
    />
  </FormGroup>
  <div className='text-danger Entry-Form-Field-Errors'>{field.meta.touched && <span>{field.meta.error}</span>}</div>
  </div>
)

export default EntryForm

