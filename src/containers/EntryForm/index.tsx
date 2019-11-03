import EntryFormComponent 								        from './EntryFormComponent'
import { connect }  					                    from 'react-redux'
import { reduxForm }                              from 'redux-form'
import { AppState }                               from '../../reducers'
import { analyzeEntry }                           from '../../reducers/entry'
import _                                          from 'lodash'

export interface EntryFormProps { 
  analyzeEntry: Function;
  currentFormContent: String;
  currentTitle: String;
  formType: String;
  lastAnalyzedEntryResults: Object;
  lastAnalyzedTextSubmission: String;
  valid: Boolean
}

const mapStateToProps = (state: AppState) => {
  const currentFormContent = _.get(state, 'form.EntryForm.values.content', '')
  const currentTitle = _.get(state, 'form.EntryForm.values.title', '')
  const { lastAnalyzedEntryResults, lastAnalyzedTextSubmission } = state.entry
  return {
    currentFormContent,
    currentTitle,
    lastAnalyzedEntryResults,
    lastAnalyzedTextSubmission
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  analyzeEntry(e:any, content:string) {
     e.preventDefault()
     dispatch(analyzeEntry(content))
  }
})

const EntryForm = reduxForm<{}, EntryFormProps>({
  form: 'EntryForm',
})(EntryFormComponent)

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
