import { combineReducers } 			from 'redux'
import { connectRouter } 		 	from 'connected-react-router' 
import { reducer as formReducer } 	from 'redux-form'
import history 						from '../history'

const rootReducer = combineReducers({
  auth:   require('./auth').default,
  note:   require('./entry').default,
  router: connectRouter(history),
  form:   formReducer
})

export default rootReducer