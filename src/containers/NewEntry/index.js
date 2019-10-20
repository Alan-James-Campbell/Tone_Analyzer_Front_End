import NewEntry 								                           from './NewEntryComponent'
import { connect }  					                             from 'react-redux'
import { reduxForm }                                       from 'redux-form'
import _                                                   from 'lodash'
import { createEntry }                                      from '../../reducers/entry'


const mapStateToProps = (state, ownProps) => {
  const { isLoading } = state.entry
  const content                = _.get(state, 'form.NewEntryForm.values.content', '')
  
  return {
    content,
    isLoading

  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit(e, content, history){
    e.preventDefault()
    alert('do some stuff here')
    // return dispatch(createE(e, content, upload[0], history))
  },
})


const NewEntryForm = reduxForm({
  form: 'NewEntryForm',
})(NewEntry)

export default connect(mapStateToProps, mapDispatchToProps)(NewEntryForm)