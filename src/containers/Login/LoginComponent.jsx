import React, { Component }               from 'react'
import { Button }                         from 'react-bootstrap'
import { Field }                          from 'redux-form'
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.props.email.length > 0 && this.props.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    const { isLoading, history, handleLoginSubmit, errorMessage, updateLoginErrors, email, password } = this.props

    return (
      <div className="Login">
      <h2>Login</h2><br/><br/>
        <form onSubmit={e => handleLoginSubmit.bind(this)(e, email, password, history)}>
            <Field 
              name="email" 
              type="email"
              label='email'
              component={renderField}
              onFocus={e => errorMessage ? updateLoginErrors('') : null }
              //validate={ [maxLength15, required, noRepeatUserName] }
            />
          
            <Field 
              name="password" 
              type="password"
              label='password'
              component={renderField}
              onFocus={e => errorMessage ? updateLoginErrors('') : null }
              //validate={ [maxLength15, required, noRepeatUserName] }
            />
     

          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
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
    <input className='form-control loginput'{...input} placeholder={label} type={type}/>  
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

