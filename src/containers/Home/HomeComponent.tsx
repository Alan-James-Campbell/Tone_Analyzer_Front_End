import React                                              from 'react'
import { useHistory }                                     from 'react-router-dom'
import ReactTable                                         from 'react-table'
import { HomeProps }                                      from './index'
import moment                                             from 'moment'
import { FontAwesomeIcon }                                from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus, faHandPaper }           from '@fortawesome/free-solid-svg-icons' 
import                                                    './Home.css' 
import                                                    'react-table/react-table.css' 
import Chart from                                         './HomeEntriesHistoryChart'

const Home = ({ allEntries, deleteEntry, isAuthenticated, showAnalysisResultsModal }: HomeProps) => {

  const data = JSON.parse(allEntries)  
  const history = useHistory()

  return (
    <div>
      
      {isAuthenticated&&(
        <div className='container'>
          
          <div className='row'>
            <div className='col-md-6' id='Home-Table-Container'>
              <ReactTable
                data={data}
                filterable
                columns={[
                  {
                    Header: 'Entry Title',
                    Cell: row => {
                     const {value} = row
                     const {entryId, content, title} = row.original
                      return (
                        <small>
                          <span 
                            id='Home-Table-Entry-Link'
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
                        </small>
                      )
                    },
                    accessor: 'title',
                    filterMethod: (filter:any, row:any) => row.title.toLowerCase().includes(filter.value.toLowerCase())
                  },                  
                  {
                    Header: 'Creation Date',
                    Cell: row => {
                     const dateString = moment.unix(row.original.createdAt/1000).format('MM/DD/YYYY LT')
                      return (
                        <small>
                          {dateString}
                        </small>
                      )
                    },
                    accessor: 'createdAt',
                    filterMethod: (filter:any, row:any) => moment.unix(row.createdAt/1000).format('MM/DD/YYYY LT').includes(filter.value)
                  }
                ]}
                defaultSorted={[
                  {
                    id: 'createdAt',
                    desc: false
                  }
                 ]} 
                defaultPageSize={7}
              />
               <p><small><em>
                 Click on the column titles to sort and toggle sort. Enter text below to filter.
              </em></small></p>
              <button
                className='btn btn-lg btn-success' 
                id= 'Home-New-Entry-Button'
                onClick={e => {
                showAnalysisResultsModal(false)
                history.push('/entries/new')
              }}
            >
             <FontAwesomeIcon icon={faPlus}/>
             {` Create a New Entry `}
          </button>
            </div>
            <div className='col-md-6'>
              <Chart allEntries={allEntries}/>
            </div>  
          </div>  
        </div>
      )}  

      {!isAuthenticated&&(
        <h1 id='Home-Not-Authenticated-Message'>
           <span className='Home-Login-Text-Link' onClick={(e:any) => history.push('/login')}>
             <FontAwesomeIcon icon={faHandPaper}/>
           </span><br/>
           <span className='Home-Login-Text-Link' onClick={(e:any) => history.push('/login')}>
             {'Login '} 
           </span>
           For Access
        </h1>
      )}

    </div>
  )  
}

export default Home
