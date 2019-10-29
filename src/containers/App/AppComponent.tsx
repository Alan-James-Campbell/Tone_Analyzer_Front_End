import React, { useEffect }             from 'react'
import { Link, useHistory }             from 'react-router-dom'
import { LinkContainer }                from 'react-router-bootstrap'
import { Navbar, Nav }                  from 'react-bootstrap'

import './App.css'

type AppProps  = {
  newUserAdded: Function;
  isAuthenticated: Boolean;
  checkUserAuthentication: Function;
  updateSignupErrors: Function;
  updateLoginErrors: Function;
  logout: Function;
};

export const App = ({newUserAdded, isAuthenticated, checkUserAuthentication, updateSignupErrors, updateLoginErrors, logout }: AppProps) => {

  useEffect(() => {checkUserAuthentication()}, [checkUserAuthentication])

  const onSignupClick = () => {
    newUserAdded('')
    updateSignupErrors('')
    updateLoginErrors('')
  }

  const onLogoutClick = (e:any) => {
    e.preventDefault()
    logout(history)
  }

  const history = useHistory()

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
                  <LinkContainer to="/signup" onClick={e => onSignupClick() }>
                     <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>               
                  <LinkContainer to="/login">
                     <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </span>
              )}

              {isAuthenticated&&(
                <Nav.Link onClick={(e:any) => onLogoutClick(e)}>
                  Logout
                </Nav.Link>
              )}

           </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default App
