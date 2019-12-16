import React, { useEffect }             from 'react'
import { Link, useHistory }             from 'react-router-dom'
import { LinkContainer }                from 'react-router-bootstrap'
import { Navbar, Nav }                  from 'react-bootstrap'
import { AppProps }                     from './index'
import                                   './App.css' 

const App = ({newUserAdded, isAuthenticated, checkUserAuthentication, hasFetchedUserEntries, updateSignupErrors, updateLoginErrors, logout, getAllUserEntries, userId }: AppProps) => {

  useEffect(() => {checkUserAuthentication()}, [checkUserAuthentication])

  useEffect(() => {
    if(isAuthenticated&&!hasFetchedUserEntries) {
      getAllUserEntries()
    }
  }, [isAuthenticated, getAllUserEntries, hasFetchedUserEntries])

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
    <div className='App'>
      <Navbar className='bg-dark justify-content-between' expand='lg'>
        <Navbar.Brand>
          <Link className='App-title' to='/'>
            <div id='App-title-1'>Tone</div>
            <div id='App-title-2'>Analyzer</div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle id='navFloatRight' aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
           <Nav className='ml-auto'>
              
              {!isAuthenticated&&(
                <span>
                  <LinkContainer to='/signup' onClick={e => onSignupClick() }>
                     <Nav.Link data-text='signup'>Signup</Nav.Link>
                  </LinkContainer>               
                  <LinkContainer to='/login'>
                     <Nav.Link data-text='login'>Login</Nav.Link>
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
