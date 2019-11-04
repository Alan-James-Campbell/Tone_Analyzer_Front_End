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
      {analysisResultsModalIsShowing&&(
        <EntryAnalysisResult currentFormContent={currentFormContent} currentTitle={currentTitle} documentTones={documentTones} sentencesToneObjectArray={sentencesToneObjectArray} /> 
      )}
      
      {!analysisResultsModalIsShowing&&(
        <div className='EntryForm'>
          <h2>{formType} Entry </h2><br/><br/>
          <form>
            
            <label>Title</label>
            <Field name='title'label='title' type='input'component={ReduxFormInput} validate={ [minLength5] } />
            
             <label>Content</label>
             <Field name='content'label='content 'type='textarea'component={ReduxFormInput} validate={ [minLength20] } />
            
            <Button block disabled={!valid} onClick={(e:any) => currentFormContent === lastAnalyzedTextSubmission ? showAnalysisResultsModal(true) : analyzeEntry(e, currentFormContent)} > Show Analysis </Button>

          </form>
        </div>
      )}

    </div>
  )
}

const ReduxFormInput: React.FC = (field: any) => (
  <FormGroup row={true}>
    <Input
      {...field.input}
      type={field.type}
      placeholder={field.label}
      disabled={field.disabled}
    />
    {field.meta.touched && <p className='text-danger'>{field.meta.error}</p>}
  </FormGroup>
)

export default EntryForm

