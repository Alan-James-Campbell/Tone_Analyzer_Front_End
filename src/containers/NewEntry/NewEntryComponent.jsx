import React, { Component }                   from 'react'
import { withRouter }                         from 'react-router'
import { Button }                             from 'react-bootstrap'
import { Field }                              from 'redux-form'
import config                                 from '../../config'
import EntryForm							  from '../EntryForm'
import './NewEntry.css'

class NewEntry extends Component {  //change this to classless component
  
  render() {
    const { } = this.props
    return (
      <div>
          <EntryForm/>
      </div>
    )
  }
}

export default withRouter(NewEntry)