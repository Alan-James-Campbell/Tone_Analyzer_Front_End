import { Auth }                           from 'aws-amplify'

//INITIAL STATE//

const initState = {
    sessionInfo:        {},
    newUserSignedUp:    '',
    isLoading:          false,
    errorMessage:       '',
    signupErrorMessage: ''
}

//////////////////

//REDUCER//

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {

  case UPDATE_SESSION_INFO:
    newState.sessionInfo = action.sessionInfo
    break    

  case NEW_USER_SIGNED_UP:
    newState.newUserSignedUp = action.newUser
    break  

  case UPDATE_IS_LOADING:
    newState.isLoading = action.bool
    break

  case UPDATE_LOGIN_ERRORS:
    newState.errorMessage = action.errorMessage
    break

  case UPDATE_SIGNUP_ERRORS:
    newState.signupErrorMessage = action.errorMessage
    break

  default:
    return state
  }
  return newState
}

//////////////////

//CONSTANTS//

const UPDATE_SESSION_INFO  = 'UPDATE_SESSION_INFO'
const NEW_USER_SIGNED_UP   = 'NEW_USER_SIGNED_UP'
const UPDATE_IS_LOADING    = 'UPDATE_IS_LOADING'
const UPDATE_LOGIN_ERRORS  = 'UPDATE_LOGIN_ERRORS'
const UPDATE_SIGNUP_ERRORS = 'UPDATE_SIGNUP_ERRORS'

/////////////////

//ACTION CREATORS//

const updateSessionInfo = sessionInfo => dispatch => 
  dispatch({
    type: UPDATE_SESSION_INFO,
    sessionInfo
  })

export const newUserAdded = newUser => dispatch => 
  dispatch({
    type: NEW_USER_SIGNED_UP,
    newUser
  })

export const updateLoginErrors = errorMessage => dispatch => 
  dispatch({
    type: UPDATE_LOGIN_ERRORS,
    errorMessage
  })

export const updateSignupErrors = errorMessage => dispatch => 
  dispatch({
    type: UPDATE_SIGNUP_ERRORS,
    errorMessage
  })

 export const updateLoadingStatus = bool => dispatch =>
   dispatch({
    type: UPDATE_IS_LOADING,
    bool
  })

/////////////////////

//THUNKS//

export const isUserAuthenticated = () => dispatch => 
  Auth.currentSession()
  .then(sessionInfo => dispatch(updateSessionInfo(sessionInfo)))
  .catch(err => {
    console.log('error: ' + err)
    dispatch(updateSessionInfo({})) 
  })

export const signup = (email, password, routerHistory) => dispatch => {
  Auth.signUp({username: email, password })
  .then(newUser => {
    dispatch(newUserAdded(email))
    dispatch(updateLoadingStatus(false))
  })
  .catch(err => {
    console.log(err)
    if(err.code === 'UsernameExistsException'){
      dispatch(updateSignupErrors(err.message + ' A new confirmation code has been sent to your email.'))
      dispatch(newUserAdded(email))
      Auth.resendSignUp(email)
      .then(newUser => {
        dispatch(newUserAdded(email))
        dispatch(updateLoadingStatus(false))
      })
      .catch(err => {
        dispatch(updateSignupErrors(err.message))
        dispatch(newUserAdded(''))
        dispatch(updateLoadingStatus(false))
        console.log(err)
      })
    }else {
      dispatch(updateSignupErrors(err.message))
    }
    dispatch(updateLoadingStatus(false))
  })
}

export const confirm = (newUser, confirmCode, history) => dispatch => {
  Auth.confirmSignUp(newUser, confirmCode)
  .then(() => {
    dispatch(updateLoginErrors('Confirmation Success! Now you can Login.'))
    dispatch(updateLoadingStatus(false))
    history.push('/login')
  })
  .catch(err => {
    dispatch(updateLoadingStatus(false))
    dispatch(updateSignupErrors(err.message))
  })
}

export const login = (email, password, routerHistory) => dispatch => {
    Auth.signIn(email, password)
      .then((user) => {
        Auth.currentSession()
        .then(sessionInfo => dispatch(updateSessionInfo(sessionInfo)))
        .then(() => routerHistory.push('/'))
        .then(() => dispatch(updateLoadingStatus(false)))
      })
      .catch(err => {
        dispatch(updateSessionInfo({}))
        dispatch(updateLoadingStatus(false))
        dispatch(updateLoginErrors(err.message))
      })

}

export const logout = routerHistory => dispatch => 
  Auth.signOut()
  .then(() => dispatch(updateSessionInfo({})))
  .then(() => routerHistory.push('/'))

/////////////////////////////

export default reducer