import React                                from 'react'
import { useHistory }                       from 'react-router-dom'
import ReactTable                           from 'react-table'
import Dashboard                            from '../Dashboard'
import { HomeProps }                        from './index'  
import                                      './Home.css' 
import                                      'react-table/react-table.css' 
import { FontAwesomeIcon }                  from '@fortawesome/react-fontawesome'
import { faTrash, faEdit }                  from '@fortawesome/free-solid-svg-icons' 

const Home = ({ allEntries, deleteEntry, isAuthenticated, showAnalysisResultsModal }: HomeProps) => {

  const data = JSON.parse(allEntries)  
  const history = useHistory()

  return (
    <div>
      
      {isAuthenticated&&(
        <div className='container'>
          <button 
            onClick={e => {
              showAnalysisResultsModal(false)
              history.push('/entries/new')
            }}
            >
              Create a New Entry
          </button>
          
          <div className='row'>
            <div className='col-xs-3'>
              <ReactTable
                data={data}
                filterable
                //defaultFilterMethod={(filter, row) => row.title.toLowerCase().includes(filter.value.toLowerCase())} 
                columns={[
                  {
                    Header: 'Entry Title',
                    Cell: row => {
                     const {value} = row
                     const {entryId, content, title} = row.original
                      return (
                        <h5>
                          <span 
                            onClick={(e:any) => {
                              e.preventDefault();
                              history.push('/entries/' + entryId)
                            }}
                          >
                            {value.slice(0,30) + (value.length > 30 ? '...' : '')}
                          </span>
                          <span className='Home-entry-list-icons'>
                            <span
                              id='Home-edit-icon'
                              onClick={(e:any) => {
                                 e.preventDefault();
                                 history.push({
                                  pathname: '/entries/edit/' + entryId,
                                  state: { currentFormContent: content, currentTitle: title, entryId }
                                })
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit}/>
                            </span>
                            <span 
                              id='Home-trash-icon'
                              onClick={(e:any) => deleteEntry(entryId)}
                             >
                            <FontAwesomeIcon icon={faTrash}/></span>
                          </span>
                        </h5>
                      )
                    },
                    accessor: 'title',
                    filterMethod: (filter:any, row:any) => row.title.toLowerCase().includes(filter.value.toLowerCase())
                  }
                ]}
                  
                defaultPageSize={10}
                className='-striped -highlight'
              />
            </div>

            <div className='col-xs-9'>
              <h1>Results</h1>
            </div>
          </div>  
        </div>
      )}  

      {!isAuthenticated&&(
        <div>
           Login For Access
        </div>
      )}

    </div>
  )  
}

export default Home
