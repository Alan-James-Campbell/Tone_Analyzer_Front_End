import EntryFormComponent 								        from './EntryFormComponent'
import { connect }  					                    from 'react-redux'
import { reduxForm }                              from 'redux-form'
import { AppState }                               from '../../reducers'
import { analyzeEntry, 
         showAnalysisResultsModal }               from '../../reducers/entry'
import { organizeAnalysis }                       from './utilities'
import _                                          from 'lodash'

export interface EntryFormProps { 
  analyzeEntry: Function;
  currentFormContent: String;
  currentTitle: String;
  formType: String;
  lastAnalyzedEntryResults: Object;
  lastAnalyzedTextSubmission: String;
  valid: Boolean,
  analysisResultsModalIsShowing: Boolean,
  showAnalysisResultsModal: Function,
  documentTones:  ReadonlyArray<{tone_name: string, tone_id: string, score: number }>,
  sentencesToneObjectArray:  ReadonlyArray<{sentence_id: number, text: string, tones: ReadonlyArray<{tone_name: string, tone_id: string, score: number }>}>
}

const mapStateToProps = (state: AppState) => {
  const currentFormContent = _.get(state, 'form.EntryForm.values.content', '')
  const currentTitle = _.get(state, 'form.EntryForm.values.title', '')
  const { lastAnalyzedEntryResults, lastAnalyzedTextSubmission, analysisResultsModalIsShowing } = state.entry
  const { documentTones, sentencesToneObjectArray }  = organizeAnalysis(lastAnalyzedEntryResults)

  return {
    currentFormContent,
    currentTitle,
    lastAnalyzedEntryResults,
    lastAnalyzedTextSubmission,
    analysisResultsModalIsShowing,
    documentTones,
    sentencesToneObjectArray
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  analyzeEntry(e:any, content:string) {
     e.preventDefault()
     dispatch(analyzeEntry(content))
  },
  showAnalysisResultsModal(show:boolean){
    dispatch(showAnalysisResultsModal(show))
  }
})

const EntryForm = reduxForm<{}, EntryFormProps>({
  form: 'EntryForm',
})(EntryFormComponent)

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
