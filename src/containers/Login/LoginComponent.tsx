import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { useHistory }                                       from 'react-router-dom'
import { Field }                                            from 'redux-form'
import { passwordValidation, emailValidation }              from '../../validations'
import { FormGroup, Input }                                 from 'reactstrap'
import { LoginProps }                                       from './index'
import                                                      './Login.css'

const Login = ({email, errorMessage, handleLoginSubmit, isLoading, password, updateLoginErrors, valid, dirty }: LoginProps) => {                                                      

  const history = useHistory()

  const loginEmoji = !dirty ? '😴' : !valid ? '🤔' : '😎'

  return (
    <div> 
      <form 
        id='Login-Form' 
        onSubmit={e => handleLoginSubmit(e, email, password, history)}
      >
        <h2>
          Login
          <div role='img' aria-label='login-state'>{loginEmoji}</div>
        </h2><br/><br/>
        <label>Email</label>
        <Field 
          name='email' 
          type='email'
          label='email'
          component={ReduxFormInput}
          onFocus={() => errorMessage ? updateLoginErrors('') : null }
          validate={ [emailValidation] }
        />
        
        <label className='Login-Field-Top-Margin'>Password</label>
        <Field 
          name='password' 
          type='password'
          label='password'
          component={ReduxFormInput}
          onFocus={() => errorMessage ? updateLoginErrors('') : null }
          validate={ [passwordValidation] }
        />
   

        <Button
          block
          disabled={!valid}
          type='submit'
          className='Login-Field-Top-Margin'
          id='Login-Submit-Button'
        >
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only'></span>
            </div>
            ) : (
            <div>
              Login
            </div>
          )}
        </Button>

      </form>
      
      {errorMessage&&(
        <div className='Login-Error-Alert'>
          <div className='alert alert-danger' role='alert'>
            {errorMessage}
          </div>
        </div>
      )}

    </div>
  )
}

const ReduxFormInput: React.FC = (field: any) => (
  <div>
    <FormGroup row={true}>
      <Input
        {...field.input}
        className='Login-Inputs'
        type={field.type}
        placeholder={field.label}
        disabled={field.disabled}
      />
    </FormGroup>
    {field.meta.dirty&&field.meta.touched && <p className='text-danger'>{field.meta.error}</p>}
  </div>

)

export default Login
