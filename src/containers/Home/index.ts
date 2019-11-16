import Home 								                         from './HomeComponent'
import { connect }  					                       from 'react-redux'
import { AppState }                                  from '../../reducers'

const mapStateToProps = (state: AppState) => {
  const { sessionInfo } = state.auth || {}
  const { allEntries }  = state.entry
  const isAuthenticated = Object.keys(sessionInfo).length > 0
  
  return {
  	isAuthenticated,
  	allEntries: JSON.stringify(allEntries)
  }
}

const mapDispatchToProps = (dispatch:any) => ({

 })

export default connect(mapStateToProps, mapDispatchToProps)(Home) 
