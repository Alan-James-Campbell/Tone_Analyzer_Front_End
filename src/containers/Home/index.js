import Home 								                         from './HomeComponent'
import { connect }  					                             from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const { sessionInfo } = state.auth || {}
  const isAuthenticated = Object.keys(sessionInfo).length > 0
  
  return {
  	isAuthenticated
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)