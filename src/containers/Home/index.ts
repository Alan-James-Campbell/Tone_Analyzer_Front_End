import Home 								                         from './HomeComponent'
import { connect }  					                       from 'react-redux'
import { AppState }                                  from '../../reducers'
import { getAllEntries }											       from '../../reducers/entry'

const mapStateToProps = (state: AppState) => {
  const { sessionInfo } = state.auth || {}
  const isAuthenticated = Object.keys(sessionInfo).length > 0
  
  return {
  	isAuthenticated
  }
}

const mapDispatchToProps = (dispatch:any) => ({
    getAllEntries(){
  	  return dispatch(getAllEntries())
    }
 })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
