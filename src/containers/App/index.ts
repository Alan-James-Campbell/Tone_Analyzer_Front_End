import App 								                           from './AppComponent'
import { connect }  					                       from 'react-redux'
import { AppState }                                  from '../../reducers'
import { getAllUserEntries }                         from '../../reducers/entry'
import { logout, 
         checkUserAuthentication, 
         newUserAdded, 
         updateLoginErrors, 
         updateSignupErrors
       }                                             from '../../reducers/auth'

export type AppProps = {
  newUserAdded: Function;
  hasFetchedUserEntries: Boolean;
  isAuthenticated: Boolean;
  checkUserAuthentication: Function;
  updateSignupErrors: Function;
  updateLoginErrors: Function;
  getAllUserEntries: Function,
  logout: Function;
  userId: Number;
}

const mapStateToProps = (state: AppState) => {
  const sessionInfo  = state.auth.sessionInfo || {}
  const isAuthenticated = Object.keys(sessionInfo).length > 0
  const { hasFetchedUserEntries } = state.entry
  
  return {
    hasFetchedUserEntries,
    isAuthenticated
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  logout(routerHistory:any){
  	return dispatch(logout(routerHistory))
  },
  checkUserAuthentication(){
  	return dispatch(checkUserAuthentication())
  },
  newUserAdded(str:string){
    return dispatch(newUserAdded(str))
  },
  updateSignupErrors(err:any){
    return dispatch(updateSignupErrors(err))
  }, 
  updateLoginErrors(err:any){
    return dispatch(updateLoginErrors(err))
  },
  getAllUserEntries(){
    return dispatch(getAllUserEntries())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)