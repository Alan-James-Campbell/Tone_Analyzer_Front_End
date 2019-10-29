import App 								                           from './AppComponent'
import { connect }  					                       from 'react-redux'
import { AppState }                                  from '../../reducers'
import { logout, 
         checkUserAuthentication, 
         newUserAdded, 
         updateLoginErrors, 
         updateSignupErrors
       }                                             from '../../reducers/auth'

const mapStateToProps = (state: AppState) => {
  const sessionInfo  = state.auth.sessionInfo || {}
  console.log('state', state)
  console.log('ses', sessionInfo)
  const isAuthenticated = Object.keys(sessionInfo).length > 0
  
  return {
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)