import React, { Component }               from 'react'
import Dashboard                          from '../Dashboard'
import './Home.css'

export default class Home extends Component {

  componentDidMount() {
    const { getAllEntries } = this.props
    getAllEntries()
  }

  render() {
    const { isAuthenticated, history } = this.props

    return (
      <div>
        {isAuthenticated&&(
          <div>
             <div className='container'>
                <button onClick={e => history.push('/entries/new')}>Create a New Entry</button>
             </div>
             <Dashboard />
          </div>
        )}        
        {!isAuthenticated&&(
          <div>
             Login For Access
          </div>
        )}
      </div>
    )
  }
}