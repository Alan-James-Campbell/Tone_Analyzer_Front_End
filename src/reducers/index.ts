import { combineReducers } 			from 'redux'
import { connectRouter } 		 	from 'connected-react-router' 
import { reducer as formReducer } 	from 'redux-form'
import history 						from '../history'
import authReducer				    from './auth'
import entryReducer				    from './entry'

const appReducer = combineReducers({
  auth:   authReducer,
  entry:  entryReducer,
  router: connectRouter(history),
  form:   formReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    const { routing } = state
    state = { routing } 
  }
  return appReducer(state, action)
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer