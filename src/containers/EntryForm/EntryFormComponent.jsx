import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
import                                                      './EntryForm.css'

const EntryForm = ({ formType, analyzeEntry, currentFormContent }) => {

  return (
    <div className='EntryForm'>
    <h2>{formType} Entry </h2><br/><br/>
      <form onSubmit={e => analyzeEntry(e, currentFormContent)}>
          
        <label>Title</label>
        <Field 
          name='title' 
          label='title'
          type='input'
          component={renderField}
        />            

        <label>Content</label>
        <Field
          name='content'
          label='content'
          type='textarea'
          component={renderField}
        />
          
        <Button
          block
          disabled=''
          type='submit'
        >
          Analyze
        </Button>
      </form>
    </div>
  )
 
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div >
    {type === 'input'&& <input className='form-control'{...input} type={type}/>} 
    {type === 'textarea'&&<textarea className='form-control' id='entryTextArea' {...input} type={type}/>} 
    {touched && (error && <small style={{'color':'red'}}>{error}</small>)}
  </div>
)

export default EntryForm

