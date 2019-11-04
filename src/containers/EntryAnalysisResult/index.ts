import EntryAnalysisResultComponent 						  from './EntryAnalysisResultComponent'
import { connect }  					                      from 'react-redux'
import { AppState }                               			  from '../../reducers'
import { showAnalysisResultsModal }               			  from '../../reducers/entry'

export interface EntryAnalysisResultProps { 
  currentFormContent: String;
  currentTitle: String;
  showAnalysisResultsModal: Function,
  documentTones:  ReadonlyArray<{tone_name: string, tone_id: string, score: number }>,
  sentencesToneObjectArray:  ReadonlyArray<{sentence_id: number, text: string, tones: ReadonlyArray<{tone_name: string, tone_id: string, score: number }>}>
}

const mapStateToProps = (state: AppState) => { return {} }

const mapDispatchToProps = (dispatch:any) => ({
  showAnalysisResultsModal(show:boolean){
    dispatch(showAnalysisResultsModal(show))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryAnalysisResultComponent)
