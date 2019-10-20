import Signup 								                             from './SignupComponent'
import { connect }  					                             from 'react-redux'
import { reduxForm }                                       from 'redux-form'
import _                                                   from 'lodash'
import { signup, updateLoadingStatus, updateSignupErrors, confirm } from '../../reducers/auth'



const mapStateToProps = (state, ownProps) => {
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

const mapDispatchToProps = dispatch => ({
  handleSignupSubmit(e, email, password, history){
    e.preventDefault()
    dispatch(updateLoadingStatus(true))
    return dispatch(signup(email, password, history))
  },  
  handleConfirmationSubmit(e, newUser, confirmCode, history){
    e.preventDefault()
    dispatch(updateLoadingStatus(true))
    return dispatch(confirm(newUser, confirmCode, history))
  },
  updateSignupErrors(errorMessage){
    return dispatch(updateSignupErrors(errorMessage))
  }

})

const SignupForm = reduxForm({
  form: 'SignupForm',
})(Signup)

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)