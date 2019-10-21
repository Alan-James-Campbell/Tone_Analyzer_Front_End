import React, { Component }                                 from 'react'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
import { passwordValidation, emailValidation }              from '../../validations'
import './Login.css'

export default class Login extends Component {

  validateForm() {
    return this.props.email.length > 0 && this.props.password.length > 0;
  }

  render() {
    const { isLoading, history, handleLoginSubmit, errorMessage, updateLoginErrors, email, password } = this.props

    return (
      <div className="Login">
      <h2>Login</h2><br/><br/>
        <form onSubmit={e => handleLoginSubmit.bind(this)(e, email, password, history)}>
            <label>Email</label>
            <Field 
              name="email" 
              type="email"
              label='email'
              component={renderField}
              onFocus={e => errorMessage ? updateLoginErrors('') : null }
              validate={ [emailValidation] }
            />
            
            <label className="loginFieldTopMargin">Password</label>
            <Field 
              name="password" 
              type="password"
              label='password'
              component={renderField}
              onFocus={e => errorMessage ? updateLoginErrors('') : null }
              validate={ [passwordValidation] }
            />
     

          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
            className="loginFieldTopMargin"
          >

          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <div>
              Login
            </div>
          )}
          </Button>
        </form>
        {errorMessage&&(
          <div className='loginErrorAlert'>
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div>
        )}
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
