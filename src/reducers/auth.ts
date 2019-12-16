import { Auth }                           from 'aws-amplify'

//INITIAL STATE//
export interface AuthState {
  sessionInfo:        object,
  newUserSignedUp:    string,
  isLoading:          boolean,
  errorMessage:       string,
  signupErrorMessage: string
}

const initialState: AuthState = {
  sessionInfo:        {},
  newUserSignedUp:    '',
  isLoading:          false,
  errorMessage:       '',
  signupErrorMessage: ''
}

//CONSTANTS//
const UPDATE_SESSION_INFO  = 'UPDATE_SESSION_INFO'
const NEW_USER_SIGNED_UP   = 'NEW_USER_SIGNED_UP'
const UPDATE_IS_LOADING    = 'UPDATE_IS_LOADING'
const UPDATE_LOGIN_ERRORS  = 'UPDATE_LOGIN_ERRORS'
const UPDATE_SIGNUP_ERRORS = 'UPDATE_SIGNUP_ERRORS'
const AUTH_LOGOUT          = 'AUTH_LOGOUT'

//ACTION CREATOR TYPES//
interface UpdateSessionInfoAction {
  type: typeof UPDATE_SESSION_INFO
  payload: AuthState["sessionInfo"]
}

interface NewUserSignedUpAction {
  type: typeof NEW_USER_SIGNED_UP
  payload: AuthState["newUserSignedUp"]
}

interface UpdateIsLoadingAction {
  type: typeof UPDATE_IS_LOADING
  payload: AuthState["isLoading"]
}

interface UpdateLoginErrorsAction {
  type: typeof UPDATE_LOGIN_ERRORS
  payload: AuthState["errorMessage"]
}

interface UpdateSignUpErrorsAction {
  type: typeof UPDATE_SIGNUP_ERRORS
  payload: AuthState["signupErrorMessage"]
}

type AuthenticationTypes = UpdateSessionInfoAction | NewUserSignedUpAction | UpdateIsLoadingAction | UpdateLoginErrorsAction | UpdateSignUpErrorsAction;


//ACTION CREATORS//
export const updateSessionInfo = (sessionInfo: AuthState["sessionInfo"]): UpdateSessionInfoAction => 
  ({
    type: UPDATE_SESSION_INFO,
    payload: sessionInfo
  })

export const newUserAdded = (newUserName: AuthState["newUserSignedUp"]): AuthenticationTypes => 
  ({
    type: NEW_USER_SIGNED_UP,
    payload: newUserName
  })

export const updateLoadingStatus = (bool: AuthState["isLoading"]): AuthenticationTypes => 
  ({
    type: UPDATE_IS_LOADING,
    payload: bool
  })


export const updateLoginErrors = (errorMessage: AuthState["errorMessage"]): AuthenticationTypes =>
  ({
    type: UPDATE_LOGIN_ERRORS,
    payload: errorMessage
  })

export const updateSignupErrors = (errorMessage: AuthState["signupErrorMessage"]): AuthenticationTypes =>
  ({
    type: UPDATE_SIGNUP_ERRORS,
    payload: errorMessage
  })

  export const performLogout = () =>
  ({
    type: AUTH_LOGOUT
  })


//THUNKS//
export const checkUserAuthentication = () => (dispatch:any) => 
  Auth.currentSession()
  .then(sessionInfo => dispatch(updateSessionInfo(sessionInfo)))
  .catch(err => {
   console.log(err)
   dispatch(updateSessionInfo({})) 
  })

export const signup = (email: string, password:string, routerHistory:any) => (dispatch:any) => 
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

export const confirm = (newUser:string, confirmCode:any, history:any) => (dispatch:any) =>
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

 export const login = (email:string, password:string, routerHistory:any) => (dispatch:any) =>
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

export const logout = (routerHistory:any) => (dispatch:any) => 
  Auth.signOut()
  .then(() => dispatch(updateSessionInfo({})))
  .then(() => dispatch(performLogout()))
  .then(() => routerHistory.push('/'))


//REDUCER//
const reducer = (state = initialState, action: AuthenticationTypes ): AuthState => {
  
  switch (action.type) {
    case UPDATE_SESSION_INFO:
      return {
       ...state,
       sessionInfo: action.payload
      }

    case NEW_USER_SIGNED_UP:
      return {
        ...state, 
        newUserSignedUp: action.payload
      }
 
    case UPDATE_IS_LOADING:
      return {
        ...state, 
        isLoading: action.payload
      }

    case UPDATE_LOGIN_ERRORS:
      return {
        ...state, 
        errorMessage: action.payload
      }

    case UPDATE_SIGNUP_ERRORS:
      return {
        ...state, 
        signupErrorMessage: action.payload

      }
    default:
      return state
  }
}

export default reducer
