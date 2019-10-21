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
            <Link to="/">Tone Analyzer</Link>
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

