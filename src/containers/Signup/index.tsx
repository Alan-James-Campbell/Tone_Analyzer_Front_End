import Signup 								                                      from './SignupComponent'
import { connect }  					                                      from 'react-redux'
import { reduxForm }                                                from 'redux-form'
import _                                                            from 'lodash'
import { AppState }                                                 from '../../reducers'
import { signup, updateLoadingStatus, updateSignupErrors, confirm } from '../../reducers/auth'

export interface SignupProps {
  confirmCode: String;
  email: String;
  handleSignupSubmit: Function;
  handleConfirmationSubmit: Function;
  isLoading: Boolean;
  password: String;
  passwordConfirmation: String;
  signupErrorMessage: String;
  updateSignupErrors: Function;
  newUserSignedUp: String;
  valid: Boolean
}

const mapStateToProps = (state: AppState) => {
  const { signupErrorMessage, newUserSignedUp, isLoading } = state.auth
  const email                = _.get(state, 'form.SignupForm.values.email', '')
  const password             = _.get(state, 'form.SignupForm.values.password', '')
  const passwordConfirmation = _.get(state, 'form.SignupForm.values.confirmPassword', '')
  const confirmCode          = _.get(state, 'form.SignupForm.values.confirmCode', '')

  return {
    email, 
    password, 
    passwordConfirmation,
    confirmCode,
    signupErrorMessage,
    newUserSignedUp,
    isLoading
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  handleSignupSubmit(e:any, email:string, password:string, history:any){
    e.preventDefault()
    dispatch(updateLoadingStatus(true))
    return dispatch(signup(email, password, history))
  },  
  handleConfirmationSubmit(e:any, newUser:string, confirmCode:string, history:any){
    e.preventDefault()
    dispatch(updateLoadingStatus(true))
    return dispatch(confirm(newUser, confirmCode, history))
  },
  updateSignupErrors(errorMessage:string){
    return dispatch(updateSignupErrors(errorMessage))
  }

})

const SignupForm = reduxForm<{}, SignupProps>({
  form: 'SignupForm',
})(Signup)

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
