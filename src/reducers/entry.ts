import { API }             from 'aws-amplify'
import axios               from 'axios'
// import { API, Storage } from 'aws-amplify'  <== ToDo: Add S3 storage capabilities


//INITIAL STATE//
export interface EntryState {
  allEntries: ReadonlyArray<{ analysis: object, content: string, createdAt: number, entryId: string, title: string, userId: string }>,
  lastAnalyzedEntryResults:      object,
  lastAnalyzedTextSubmission:    string,
  isLoading:                     boolean,
  errorMessage:                  string,
  analysisResultsModalIsShowing: boolean,
  lastSavedEntry:                {analysis: object, content: string, createdAt: number, entryId: string, title: string, userId: string}
}

const initialState: EntryState = {
  allEntries:                     [],
  lastAnalyzedEntryResults:       {},
  lastAnalyzedTextSubmission:     '',
  isLoading:                      false,
  errorMessage:                   '',
  analysisResultsModalIsShowing:  false,
  lastSavedEntry:                 {analysis: {}, content: '', createdAt: 0, entryId: '', title: '', userId: ''}
}

//CONSTANTS//
const UPDATE_LAST_ANALYZED_ENTRY               = 'UPDATE_LAST_ANALYZED_ENTRY'
const UPDATE_LAST_ANALYZED_TEXT_SUBMISSION     = 'UPDATE_LAST_ANALYZED_TEXT_SUBMISSION'
const UPDATE_SHOW_ANALYSIS_RESULTS_MODAL       = 'UPDATE_SHOW_ANALYSIS_RESULTS_MODAL'
const LIST_ALL_ENTRIES                         = 'LIST_ALL_ENTRIES'
const APPEND_ALL_ENTRIES_STATE                 = 'APPEND_ALL_ENTRIES_STATE'

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

interface showAnalysisResultsModalAction {
  type: typeof UPDATE_SHOW_ANALYSIS_RESULTS_MODAL
  payload: EntryState["analysisResultsModalIsShowing"]
}

interface appendAllEntriesState {
  type: typeof APPEND_ALL_ENTRIES_STATE
  payload: EntryState["lastSavedEntry"]
}

type EntryTypes = Update_Last_Analyzed_Entry_Action | Update_Last_Analyzed_Text_Submission_Action | ListAllEntriesAction | showAnalysisResultsModalAction | appendAllEntriesState

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

  export const showAnalysisResultsModal = (show:EntryState["analysisResultsModalIsShowing"]): EntryTypes => 
  ({
    type: UPDATE_SHOW_ANALYSIS_RESULTS_MODAL, 
    payload: show 
  })  

  export const appendAllEntriesState = (entry:EntryState["lastSavedEntry"]): EntryTypes => 
  ({
    type: APPEND_ALL_ENTRIES_STATE, 
    payload: entry 
  })


//THUNKS//
export const analyzeEntry = (text:string) => (dispatch:any) => 
  axios.post(`/api/entries/analyzeEntry`, {text})
    .then(response => {
      dispatch(update_Last_Analyzed_Text_Submission(text))
      dispatch(update_Last_Analyzed_Entry(response.data))
      dispatch(showAnalysisResultsModal(true))
     })
    .catch(err => console.log(err))

export const getAllEntries = () => (dispatch:any) =>
  API.get("entries", "/entries", null)
  .then(allEntries => dispatch(listAllEntries(allEntries))) 
  .catch(err => console.log(err))

export const postEntry = (content:object, history:any) => (dispatch:any) => {
  API.post('entries', '/entries', {
    body: content
  })
  .then(result => {
    dispatch(appendAllEntriesState(result))
    history.push('/')
  })
  .catch(err => console.log(err))
}

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

    case APPEND_ALL_ENTRIES_STATE:
      return {
        ...state,
        lastSavedEntry: action.payload,
        allEntries: state.allEntries.concat(action.payload)
      }

    case UPDATE_SHOW_ANALYSIS_RESULTS_MODAL:
      return {
        ...state, 
        analysisResultsModalIsShowing: action.payload
      }

    default:
      return state
  }
}

export default reducer
