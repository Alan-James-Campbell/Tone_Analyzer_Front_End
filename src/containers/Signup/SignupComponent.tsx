import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
import { useHistory }                                       from 'react-router-dom'
import { FormGroup, Input }                                 from 'reactstrap'
import { SignupProps }                                       from './index'
import { passwordValidation, emailValidation }              from '../../validations'
import './Signup.css' 

const Signup = ({confirmCode, email, handleSignupSubmit, handleConfirmationSubmit, isLoading, newUserSignedUp, password, passwordConfirmation, signupErrorMessage, updateSignupErrors, valid, dirty }: SignupProps) => {                                                      

  const signUpEmoji = !dirty ? '😴' : !valid||password !== passwordConfirmation ? '🤔' : '😎'

  const history = useHistory()

  const validateConfirmationForm = () => confirmCode.length > 0

  const renderConfirmationForm =() => { 
    return (
      <div>
        <form
           className='Signup-And-Confirm-Forms'
           onSubmit={(e:any) => handleConfirmationSubmit(e, newUserSignedUp, confirmCode, history)}
         >
          <h2>Confirmation</h2><br/><br/>
          <label>Confirmation Code</label>
          <Field 
            name='confirmCode'
            type='tel'
            label='Confirmation Code'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
          />
          <p>Please check your email for the code.</p>
          <Button
            block
            disabled={!validateConfirmationForm()}
            type='submit'
            className='Signup-And-Confirm-Field-Top-Margin'
            id='Signup-Submit-Button'
          >
            {isLoading ? (
              <div className='spinner-border' role='status'>
                <span className='sr-only'></span>
              </div>
            ) : (
              <div>
                Confirm
              </div>
            )}
          </Button>
        </form>
        {signupErrorMessage&&(
          <div className='Signup-Error-Alert'>
            <div className='alert alert-danger' role='alert'>
              {signupErrorMessage}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderForm = () => {

    return (
      <div>
        <form 
          className='Signup-And-Confirm-Forms'
          onSubmit={(e:any) => handleSignupSubmit(e, email, password, history)}
         >
          <h2>Signup
            <div role='img' aria-label='signup-state'>{signUpEmoji}</div>
          </h2><br/>
          <label>Email</label>
          <Field 
            name='email' 
            type='email'
            label='email'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [emailValidation] }

          />

          <label className='Signup-And-Confirm-Field-Top-Margin'>Password</label>
          <Field 
            name='password' 
            type='password'
            label='password'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [passwordValidation] }
          />

          <label className='Signup-And-Confirm-Field-Top-Margin'>Confirm Password</label>
          <Field 
            name='confirmPassword' 
            type='password'
            label='confirm password'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
          />

          <Button
            block
            disabled={!valid||(password !== passwordConfirmation)}
            type='submit'
            className='Signup-And-Confirm-Field-Top-Margin'
            id='Signup-Submit-Button'
          >
            {isLoading ? (
              <div className='spinner-border' role='status'>
                <span className='sr-only'></span>
              </div>
            ) : (
              <div>
                Sign Up
              </div>
            )}
          </Button>

        </form>

        {signupErrorMessage&&(
          <div className='Signup-And-Confirm-Alert'>
            <div className='alert alert-danger' role='alert'>
              {signupErrorMessage}
            </div>
          </div>
        )}

      </div>
    )
  }

  return (
    <div>
      {newUserSignedUp
        ? renderConfirmationForm()
        : renderForm()
      }
    </div>
  )
}

const ReduxFormInput: React.FC = (field: any) => (
  <div>
    <FormGroup row={true}>
      <Input
        {...field.input}
        className='Signup-And-Confirm-Inputs'
        type={field.type}
        disabled={field.disabled}
      />
    </FormGroup>
    {field.meta.dirty&&field.meta.touched && <p className='text-danger'>{field.meta.error}</p>}
  </div>

)

export default Signup
