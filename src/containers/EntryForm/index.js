import EntryFormComponent 								        from './EntryFormComponent'
import { connect }  					                    from 'react-redux'
import { reduxForm }                              from 'redux-form'
import { analyzeEntry }                           from '../../reducers/entry'
import _                                          from 'lodash'

// 
const mapStateToProps = (state, ownProps) => {
  // const {  } = state.entry
  const currentFormContent = _.get(state, 'form.EntryForm.values.content', '')
  // const password = _.get(state, 'form.LoginForm.values.password', '')
  return {
    currentFormContent
  }
}

const mapDispatchToProps = dispatch => ({
  analyzeEntry(e, content) {
     e.preventDefault()
     dispatch(analyzeEntry(content))
  }
})


const EntryForm = reduxForm({
  form: 'EntryForm',
})(EntryFormComponent)

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)

