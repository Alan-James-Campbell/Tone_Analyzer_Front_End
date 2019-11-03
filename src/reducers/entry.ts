import { API }             from 'aws-amplify'
// import { API, Storage } from 'aws-amplify'  <== ToDo: Add S3 storage capabilities
import axios               from 'axios'

//INITIAL STATE//


export interface EntryState {
  allEntries: ReadonlyArray<{ analysis: object, content: string, createdAt: number, entryId: string, title: string, userId: string }>,
  lastAnalyzedEntryResults:    object,
  lastAnalyzedTextSubmission:  string,
  isLoading:                   boolean,
  errorMessage:                string,
}

const initialState: EntryState = {
  allEntries:                     [],
  lastAnalyzedEntryResults:       {},
  lastAnalyzedTextSubmission:     '',
  isLoading:                      false,
  errorMessage:                   ''
}

//CONSTANTS//
const UPDATE_LAST_ANALYZED_ENTRY               = 'UPDATE_LAST_ANALYZED_ENTRY'
const UPDATE_LAST_ANALYZED_TEXT_SUBMISSION     = 'UPDATE_LAST_ANALYZED_TEXT_SUBMISSION'
const LIST_ALL_ENTRIES                         = 'LIST_ALL_ENTRIES'
// const CREATE_ENTRY                          = 'CREATE_ENTRY'


//ACTION CREATOR TYPES//
interface Update_Last_Analyzed_Entry_Action {
  type: typeof UPDATE_LAST_ANALYZED_ENTRY
  payload: EntryState["lastAnalyzedEntryResults"]
}

interface Update_Last_Analyzed_Text_Submission_Action {
  type: typeof UPDATE_LAST_ANALYZED_TEXT_SUBMISSION
  payload: EntryState["lastAnalyzedTextSubmission"]
}

interface ListAllEntriesAction {
  type: typeof LIST_ALL_ENTRIES
  payload: EntryState["allEntries"]
}

type EntryTypes = Update_Last_Analyzed_Entry_Action | Update_Last_Analyzed_Text_Submission_Action | ListAllEntriesAction

//ACTION CREATORS//
export const update_Last_Analyzed_Entry = (lastAnalyzedEntryResults:EntryState["lastAnalyzedEntryResults"]): EntryTypes => 
  ({
    type: UPDATE_LAST_ANALYZED_ENTRY, 
    payload: lastAnalyzedEntryResults
  })

  export const update_Last_Analyzed_Text_Submission = (lastAnalyzedTextSubmission:EntryState["lastAnalyzedTextSubmission"]): EntryTypes => 
  ({
    type: UPDATE_LAST_ANALYZED_TEXT_SUBMISSION, 
    payload: lastAnalyzedTextSubmission 
  })

  export const listAllEntries = (allEntries:EntryState["allEntries"]): EntryTypes => 
  ({
    type: LIST_ALL_ENTRIES, 
    payload: allEntries 
  })

// const postEntry = entry => dispatch => dispatch({type: CREATE_ENTRY, entry })


//THUNKS//
export const analyzeEntry = (text:string) => (dispatch:any) => 
  axios.post(`/api/entries/analyzeEntry`, {text})
    .then(response => {
      dispatch(update_Last_Analyzed_Text_Submission(text))
      dispatch(update_Last_Analyzed_Entry(response.data))
     })
    .catch(err => console.log(err))

export const getAllEntries = () => (dispatch:any) =>
  API.get("entries", "/entries", null)
  .then(allEntries => dispatch(listAllEntries(allEntries)))
  .catch(err => console.log(err))

// export const createEntry = (e, content, file, history) => dispatch => {
//     alert(e, content, file, history)
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
// }

//REDUCER//
const reducer = (state = initialState, action: EntryTypes ): EntryState => {
  
  switch (action.type) {
    case UPDATE_LAST_ANALYZED_ENTRY:
      return {
       ...state,
       lastAnalyzedEntryResults: action.payload
      }    

      case UPDATE_LAST_ANALYZED_TEXT_SUBMISSION:
      return {
       ...state,
       lastAnalyzedTextSubmission: action.payload
      }

    case LIST_ALL_ENTRIES:
      return {
        ...state, 
        allEntries: action.payload
      }

    default:
      return state
  }
}

export default reducer
