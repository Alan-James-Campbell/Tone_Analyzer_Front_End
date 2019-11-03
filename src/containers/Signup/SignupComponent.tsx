import React                                                from 'react'
import { Button }                                           from 'react-bootstrap'
import { Field }                                            from 'redux-form'
import { useHistory }                                       from 'react-router-dom'
import { FormGroup, Input }                                 from 'reactstrap'
import { SignupProps }                                       from './index'
import { passwordValidation, emailValidation }              from '../../validations'
import './Signup.css'

const Signup = ({confirmCode, email, handleSignupSubmit, handleConfirmationSubmit, isLoading, newUserSignedUp, password, passwordConfirmation, signupErrorMessage, updateSignupErrors, valid }: SignupProps) => {                                                      

  const history = useHistory()

  const validateConfirmationForm = () => confirmCode.length > 0

  const renderConfirmationForm =() => { 
    return (
      <div className='Signup'>
        <h2>Confirmation</h2><br/><br/>
        <form onSubmit={(e:any) => handleConfirmationSubmit(e, newUserSignedUp, confirmCode, history)}>
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
          <div className='loginErrorAlert'>
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
      <div className='Signup'>
        <h2>Signup</h2><br/><br/>

        <form onSubmit={(e:any) => handleSignupSubmit(e, email, password, history)}>
          <label>Email</label>
          <Field 
            name='email' 
            type='email'
            label='email'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [emailValidation] }

          />

          <label className='signUpFieldTopMargin'>Password</label>
          <Field 
            name='password' 
            type='password'
            label='password'
            component={ReduxFormInput}
            onFocus={() => signupErrorMessage ? updateSignupErrors('') : null }
            validate={ [passwordValidation] }
          />

          <label className='signUpFieldTopMargin'>Confirm Password</label>
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
            id='signupConfirmButton'
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
          <div className='loginErrorAlert'>
            <div className='alert alert-danger' role='alert'>
              {signupErrorMessage}
            </div>
          </div>
        )}

      </div>
    )
  }

  return (
    <div className='Signup'>
      {newUserSignedUp
        ? renderConfirmationForm()
        : renderForm()
      }
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

export default Signup
