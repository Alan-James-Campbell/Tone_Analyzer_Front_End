import React, { Component }                   from 'react'
import { withRouter }                         from 'react-router'
import { Button }                             from 'react-bootstrap'
import { Field }                              from 'redux-form'
import config                                 from '../../config'
import './NewEntry.css'

class NewEntry extends Component {
  
  render() {
    const { } = this.props
    return (
      <div>
          New Entry Form Here
      </div>
    )
  }
}

export default withRouter(NewEntry)