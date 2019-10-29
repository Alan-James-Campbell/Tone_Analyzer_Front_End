import EntryFormComponent 								   from './EntryFormComponent'
import { connect }  					                   from 'react-redux'
import { reduxForm }                                       from 'redux-form'
// import { login, updateLoadingStatus, updateLoginErrors }   from '../../reducers/auth'
// import _                                                   from 'lodash'

// 
const mapStateToProps = (state, ownProps) => {
  // const {isLoading, errorMessage} = state.auth
  // const email = _.get(state, 'form.LoginForm.values.email', '')
  // const password = _.get(state, 'form.LoginForm.values.password', '')
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  // login(email, password, history) {
  //   return dispatch(login(email, password, history))
  // },
  // handleLoginSubmit(e, email, password, history){
  //   e.preventDefault()
  //   dispatch(updateLoadingStatus(true))
  //   return dispatch(login(email, password, history))
  // },
  // updateLoginErrors(errorMessage){
  //   return dispatch(updateLoginErrors(errorMessage))
  // }
})

const EntryForm = reduxForm({
  form: 'EntryForm',
})(EntryFormComponent)

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)