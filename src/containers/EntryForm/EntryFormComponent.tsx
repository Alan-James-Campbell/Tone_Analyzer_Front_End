import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { FormGroup, Input }                                 from 'reactstrap'
import { Field }                                            from 'redux-form'
import { EntryFormProps }                                   from './index'
import                                                      './EntryForm.css'

const EntryForm = ({ formType, analyzeEntry, currentFormContent, valid }: EntryFormProps) => {                                                      

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
        />            

        <label>Content</label>
        <Field
          name='content'
          label='content'
          type='textarea'
          component={ReduxFormInput}
        />
          
        <Button
          block
          disabled={!valid}
          type='submit'
        >
          Analyze
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

