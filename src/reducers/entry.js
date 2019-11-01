import { API, Storage } from 'aws-amplify'
import axios            from 'axios'

//INITIAL STATE//

const initState = {
  newEntry: null,
  allEntries: []
}

//////////////////

//REDUCER//

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {

  case CREATE_ENTRY:
    newState.newEntry = action.entry
    break      

  case LIST_ALL_ENTRIES:
    newState.allEntries = action.entries
    break    

  default:
    return state
  }
  return newState
}

//////////////////

//CONSTANTS//

const CREATE_ENTRY     = 'CREATE_ENTRY'
const LIST_ALL_ENTRIES  = 'LIST_ALL_ENTRIES'


/////////////////

//ACTION CREATORS//

const postEntry = entry => dispatch => 
  dispatch({
    type: CREATE_ENTRY,
    entry
  })

const listAllEntries = entries => dispatch => 
  dispatch({
    type: LIST_ALL_ENTRIES,
    entries
  })


/////////////////////

//THUNKS//


export const analyzeEntry = (content) => dispatch => {
  console.log('content', content)
   axios.get(`/api/analyzeEntry/:${content}`)
   .then(response => {
     console.log('responseData', response.data)
   })
   .catch(err => console.log(err))
}



export const createEntry = (e, content, file, history) => dispatch => {
    alert(e, content, file, history)
    // const filename = `${Date.now()}-${file.name}`
    // Storage.vault.put(filename, file, {
    //   contentType: file.type
    // })
    // .then(stored => {
    //   return API.post('notes', '/notes', {
    //     body: {content, attachment: stored.key}
    //   })
    // })
    // .then(result =>  {
    //   dispatch(postNote(result))
    //   history.push('/')
    // })
    // .catch(err => console.log('err: ' + err))
}

export const getAllEntries = () => dispatch =>
  API.get("entries", "/entries")
  .then(allEntries => dispatch(listAllEntries(allEntries)))
  .catch(err => console.log(err))


/////////////////////////////

export default reducer