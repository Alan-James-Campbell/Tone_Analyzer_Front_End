import Home                                            from './HomeComponent'
import { connect }                                     from 'react-redux'
import { AppState }                                    from '../../reducers'
import { deleteEntry, showAnalysisResultsModal }       from '../../reducers/entry' 


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
  deleteEntry(entryId:string){
    return dispatch(deleteEntry(entryId))
  },
  showAnalysisResultsModal(bool:boolean){
    dispatch(showAnalysisResultsModal(bool))
  }
})

export interface HomeProps {
  isAuthenticated: Boolean,
  allEntries: string,
  deleteEntry: Function,
  showAnalysisResultsModal: Function
};

export default connect(mapStateToProps, mapDispatchToProps)(Home) 
