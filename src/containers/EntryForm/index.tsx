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
  defaultValues: {};
  entryId: String,
  formType: String;
  lastAnalyzedEntryResults: Object;
  lastAnalyzedTextSubmission: String;
  valid: Boolean,
  analysisResultsModalIsShowing: Boolean,
  showAnalysisResultsModal: Function,
  documentTones:  ReadonlyArray<{tone_name: string, tone_id: string, score: number }>,
  sentencesToneObjectArray:  ReadonlyArray<{sentence_id: number, text: string, tones: ReadonlyArray<{tone_name: string, tone_id: string, score: number }>}>
}

const mapStateToProps = (state: AppState, ownProps:any) => {
  const currentFormContent = _.get(state, 'form.EntryForm.values.content', '')
  const currentTitle = _.get(state, 'form.EntryForm.values.title', '')
  const { lastAnalyzedEntryResults, lastAnalyzedTextSubmission, analysisResultsModalIsShowing } = state.entry
  const { documentTones, sentencesToneObjectArray }  = organizeAnalysis(lastAnalyzedEntryResults)
  const isEdit = _.get(ownProps, 'formType', '') === 'Edit'
  // const entryId
  let initialValues = {}
  let entryId = ''
  if(isEdit) {
    const title =  _.get(ownProps, 'defaultValues.currentTitle', '')
    const content = _.get(ownProps, 'defaultValues.currentFormContent', '')
    entryId = _.get(ownProps, 'defaultValues.entryId', '')
    initialValues = { title, content }
  }

  return {
    currentFormContent,
    currentTitle,
    lastAnalyzedEntryResults,
    lastAnalyzedTextSubmission,
    analysisResultsModalIsShowing,
    documentTones,
    sentencesToneObjectArray,
    initialValues,
    entryId
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
