import React, { Component }                                 from 'react'
import { withRouter }                                       from 'react-router'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
import { passwordValidation, emailValidation }              from './validations'

import './Signup.css'

class Signup extends Component {

  validateForm() {
    const { password, passwordConfirmation } = this.props
    return (password.length && (password === passwordConfirmation));
  }

  validateConfirmationForm() {
    return this.props.confirmCode.length > 0;
  }


  renderConfirmationForm() {
    const { confirmCode, history, newUserSignedUp, handleConfirmationSubmit, signupErrorMessage, updateSignupErrors, isLoading } = this.props
    return (
      <div className="Login">
        <h2>Confirmation</h2><br/><br/>
        <form onSubmit={e => handleConfirmationSubmit(e, newUserSignedUp, confirmCode, history)}>
            <label>Confirmation Code</label>
            <Field 
              name="confirmCode" 
              type="tel"
              label='Confirmation Code'
              component={renderField}
              onFocus={e => signupErrorMessage ? updateSignupErrors('') : null }
            />
            <p>Please check your email for the code.</p>
          <Button
            block
            disabled={!this.validateConfirmationForm()}
            type='submit'
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div>
                Confirm
              </div>
            )}
          </Button>
        </form>
        {signupErrorMessage&&(
          <div className='loginErrorAlert'>
            <div className="alert alert-danger" role="alert">
              {signupErrorMessage}
            </div>
          </div>
        )}
      </div>
    );
  }

  renderForm() {
    const { handleSignupSubmit, email, password, history, signupErrorMessage, updateSignupErrors, isLoading, valid } = this.props

    return (
      <div className="Login">
        <h2>Signup</h2><br/><br/>

        <form onSubmit={e => handleSignupSubmit(e, email, password, history)}>
          <label>Email</label>
          <Field 
            name="email" 
            type="email"
            label='email'
            component={renderField}
            onFocus={e => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [emailValidation] }

          />

          <label className="signUpFieldTopMargin">Password</label>
          <Field 
            name="password" 
            type="password"
            label='password'
            component={renderField}
            onFocus={e => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [passwordValidation] }
          />

          <label className="signUpFieldTopMargin">Confirm Password</label>
          <Field 
            name="confirmPassword" 
            type="password"
            label="confirm password"
            component={renderField}
            onFocus={e => signupErrorMessage ? updateSignupErrors('') : null }
          />

          <Button
            block
            disabled={!this.validateForm()||!valid}
            type='submit'
            text='Signup'
            id='signupConfirmButton'
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div>
                Confirm
              </div>
            )}
          </Button>

        </form>

        {signupErrorMessage&&(
          <div className='loginErrorAlert'>
            <div className="alert alert-danger" role="alert">
              {signupErrorMessage}
            </div>
          </div>
        )}

      </div>
    );
  }

  render() {
    return (
      <div className='Signup'>
        {!this.props.newUserSignedUp
          ? this.renderForm()
          : this.renderConfirmationForm()}
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

export default withRouter(Signup)
