import React, { Component }                                 from 'react'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
// import './EntryForm.css'

export default class EntryForm extends Component {

  render() {
    const {  } = this.props

    return (
      <div className="">
      <h2>New/Edit Entry (fix this based on conditional route)</h2><br/><br/>
        <form onSubmit={e => alert('do something here')}>
            <label>Title</label>
            <Field 
              name="title" 
              label='title'
              component={renderField}
            />
            
     

          <Button
            block
            disabled=''
            type="submit"
            className=""
          >

          </Button>
        </form>
      </div>
    );
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div >
    <input className='form-control'{...input} placeholder={label} type={type}/>  
    {touched && (error && <small style={{'color':'red'}}>{error}</small>)}
  </div>
)
