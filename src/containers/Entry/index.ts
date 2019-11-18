import Entry                                    from './EntryComponent'
import { connect }                              from 'react-redux'
import { AppState }                             from '../../reducers'

const mapStateToProps = (state: AppState) => {
  const { allEntries }  = state.entry

  return {
     allEntries: JSON.stringify(allEntries)
  } 
}

const mapDispatchToProps = (dispatch:any) => ({
})


export interface EntryProps {
  allEntries: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry)

