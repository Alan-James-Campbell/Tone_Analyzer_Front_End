import { combineReducers } 			from 'redux'
import { connectRouter } 		 	from 'connected-react-router' 
import { reducer as formReducer } 	from 'redux-form'
import history 						from '../history'
import authReducer				    from './auth'
import entryReducer				    from './entry'

const rootReducer = combineReducers({
  auth:   authReducer,
  entry:  entryReducer,
  router: connectRouter(history),
  form:   formReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer