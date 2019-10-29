import React 									              from 'react'	
import { BrowserRouter, Route, Switch } 		from 'react-router-dom'
import Home 									              from './containers/Home'
import App										              from './containers/App'
import Signup 									            from './containers/Signup'
import Login 									              from './containers/Login'
import NewEntry									            from './containers/NewEntry'
import NotFound 								            from './containers/NotFound'

const Root = () => (
  <BrowserRouter>
    <App />
  	<Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/entries/new' exact component={NewEntry} />
        <Route path='/entries/:id' exact component={NotFound} />
        <Route component={NotFound}/>
      </Switch>
  </BrowserRouter>
 )

export default Root
