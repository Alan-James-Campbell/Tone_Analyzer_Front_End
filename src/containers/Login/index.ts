import Login 								                               from './LoginComponent'
import { connect }  					                             from 'react-redux'
import { reduxForm }                                       from 'redux-form'
import { AppState }                                        from '../../reducers'
import { login, updateLoadingStatus, updateLoginErrors }   from '../../reducers/auth'
import _                                                   from 'lodash'

export interface LoginProps {
  email: String;
  errorMessage: String;
  handleLoginSubmit: Function;
  isLoading: Boolean;
  password: String;
  updateLoginErrors: Function;
  valid: Boolean;
}

const mapStateToProps = (state: AppState) => {
  const {isLoading, errorMessage} = state.auth
  const email = _.get(state, 'form.LoginForm.values.email', '')
  const password = _.get(state, 'form.LoginForm.values.password', '')
  return {
    isLoading,
    errorMessage,
    email,
    password
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  login(email:string, password:string, history:any) {
    return dispatch(login(email, password, history))
  },
  handleLoginSubmit(e:any, email:string, password:string, history:any){
    e.preventDefault()
    dispatch(updateLoadingStatus(true))
    return dispatch(login(email, password, history))
  },
  updateLoginErrors(errorMessage:string){
    return dispatch(updateLoginErrors(errorMessage))
  }
})

const LoginForm = reduxForm<{}, LoginProps>({
  form: 'LoginForm',
})(Login)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
