import { createStore, applyMiddleware }    from 'redux'
import { composeWithDevTools } 			   from 'redux-devtools-extension'
import rootReducer 						   from './reducers'
import { createLogger }					   from 'redux-logger'
import thunkMiddleware 					   from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history 							   from './history'


const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
  	applyMiddleware(
  	  routerMiddleware(history),
  	  thunkMiddleware,
  	  createLogger({collapsed: true})
  	)
  )
)

export default store


