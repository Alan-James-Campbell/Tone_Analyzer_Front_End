import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav }      from 'react-bootstrap'
import { LinkContainer }    from 'react-router-bootstrap'
import './App.css'

class App extends Component {

  componentDidMount(){
    this.props.isUserAuthenticated()
  }

  render() {
    const { isAuthenticated, logout, history, newUserAdded, updateSignupErrors, updateLoginErrors } = this.props

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle id='navFloatRight' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="ml-auto">
                {!isAuthenticated&&(
                  <span>
                    <LinkContainer to="/signup" onClick={e => {newUserAdded(''); updateSignupErrors(''); updateLoginErrors('')}}>
                       <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>               
                    <LinkContainer to="/login">
                       <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </span>
                )}

                {isAuthenticated&&(
                  <Nav.Link onClick={e => {e.preventDefault(); logout(history)}}>
                    Logout
                  </Nav.Link>
                )}
             </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(App)

//   const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const toneAnalyzer = new ToneAnalyzerV3({
//   version: '2017-09-21',
//   authenticator: new IamAuthenticator({
//     apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR',
//   }),
//   url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
// });

// const text = 'Team, I know that times are tough! Product '
//   + 'sales have been disappointing for the past three '
//   + 'quarters. We have a competitive product, but we '
//   + 'need to do a better job of selling it!';

// const toneParams = {
//   toneInput: { 'text': text },
//   contentType: 'application/json',
// };

// toneAnalyzer.tone(toneParams)
//   .then(toneAnalysis => {
//     console.log(JSON.stringify(toneAnalysis, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });


