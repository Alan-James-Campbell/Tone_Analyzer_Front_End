import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { FormGroup, Input }                                 from 'reactstrap'
import { Field }                                            from 'redux-form'
import { EntryFormProps }                                   from './index'
import { minLength5, minLength20 }                          from '../../validations'
import                                                      './EntryForm.css'

const EntryForm = ({ analyzeEntry, currentFormContent, formType, lastAnalyzedEntryResults, lastAnalyzedTextSubmission, valid }: EntryFormProps) => {                                                      
  console.log('lastAnalyzedTextSubmission', lastAnalyzedTextSubmission)
  return (
    <div className='EntryForm'>
    <h2>{formType} Entry </h2><br/><br/>
      <form onSubmit={(e:any) => analyzeEntry(e, currentFormContent)}>
          
        <label>Title</label>
        <Field 
          name='title' 
          label='title'
          type='input'
          component={ReduxFormInput}
          validate={ [minLength5] }
        />            

        <label>Content</label>
        <Field
          name='content'
          label='content'
          type='textarea'
          component={ReduxFormInput}
          validate={ [minLength20] }

        />
          
        <Button
          block
          disabled={!valid||(currentFormContent===lastAnalyzedTextSubmission)}
          type='submit'
        >
          Analyze
        </Button>        

        <Button
          block
          disabled={true}
        >
          Save Entry
        </Button>
      </form>
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

