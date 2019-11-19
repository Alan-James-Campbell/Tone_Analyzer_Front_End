import React                				  from 'react'
import EntryForm							  from '../EntryForm'
import { withRouter }						  from 'react-router-dom'
import _                                          from 'lodash'

const EditEntry = (props) => {
  const currentFormContent = _.get(props, 'location.state.currentFormContent', '')
  const currentTitle = _.get(props, 'location.state.currentTitle', '')
  const entryId = _.get(props, 'location.state.entryId', '')
  let defaultValues = { currentTitle, currentFormContent, entryId}

  return (<div> <EntryForm valid={true} formType='Edit' defaultValues={defaultValues}/> </div>)

}

export default withRouter(EditEntry)