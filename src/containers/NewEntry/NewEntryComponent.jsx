import React, { Component }                   from 'react'
import { withRouter }                         from 'react-router'
import { Button }                             from 'react-bootstrap'
import { Field }                              from 'redux-form'
import config                                 from '../../config'
import './NewEntry.css'

class NewEntry extends Component {
  
  constructor(props) {
    super(props);
  }

  validateForm() {
    return this.props.content.length > 0;
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
    this.setState({ isLoading: true });
  }

  render() {
    const { content, upload, isLoading, handleSubmit, history } = this.props
    return (
      <div className="NewEntry">
        <form onSubmit={e => handleSubmit(e, content, upload, history)}>
          <h2>New Entry</h2>
          <Field 
            id='testy'
            name='content'
            type='textarea'
            label='content'
            component={'textarea'}
            placeholder='Content'
          />

          <Field name='upload' component={file_upload} type='file' className='form-control' />

          <Button
            block
            disabled={!this.validateForm()}
            type='submit'
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div>
                Create
              </div>
            )}
          </Button>
          
        </form>
      </div>
    )
  }
}

const file_upload= ({ input, type, meta: { touched, error, warning } }) => {
  delete input.value

  return (
    <div>
      <label htmlFor={input.name}>
        <input {...input} type={type}/>
      </label>
    </div>
  )
}

export default withRouter(NewEntry)