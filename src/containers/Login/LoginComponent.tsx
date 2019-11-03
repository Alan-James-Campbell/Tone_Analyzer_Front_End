import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { useHistory }                                       from 'react-router-dom'
import { Field }                                            from 'redux-form'
import { passwordValidation, emailValidation }              from '../../validations'
import { FormGroup, Input }                                 from 'reactstrap'
import { LoginProps }                                       from './index'
import                                                      './Login.css'

const Login = ({email, errorMessage, handleLoginSubmit, isLoading, password, updateLoginErrors, valid }: LoginProps) => {                                                      

  const history = useHistory()

  return (
    <div className="Login">
    <h2>Login</h2><br/><br/>
      
      <form onSubmit={e => handleLoginSubmit(e, email, password, history)}>
          <label>Email</label>
          <Field 
            name="email" 
            type="email"
            label='email'
            component={ReduxFormInput}
            onFocus={() => errorMessage ? updateLoginErrors('') : null }
            validate={ [emailValidation] }
          />
          
          <label className="loginFieldTopMargin">Password</label>
          <Field 
            name="password" 
            type="password"
            label='password'
            component={ReduxFormInput}
            onFocus={() => errorMessage ? updateLoginErrors('') : null }
            validate={ [passwordValidation] }
          />
   

        <Button
          block
          disabled={!valid}
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
    {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
  </FormGroup>
)

export default Login
