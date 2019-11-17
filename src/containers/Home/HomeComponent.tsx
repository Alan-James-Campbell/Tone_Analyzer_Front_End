import React                                from 'react'
import { useHistory }                       from 'react-router-dom'
import ReactTable                           from 'react-table'
import Dashboard                            from '../Dashboard'
import                                       './Home.css' 
import                                      'react-table/react-table.css' 
import { FontAwesomeIcon }                  from '@fortawesome/react-fontawesome'
import { faTrash, faEdit }                  from '@fortawesome/free-solid-svg-icons' 

const Home = ({ allEntries, deleteEntry, isAuthenticated }: HomeProps) => {

  const data = JSON.parse(allEntries)  
  const history = useHistory()

  return (
    <div>
      
      {isAuthenticated&&(
        <div className='container'>
          <button onClick={e => history.push('/entries/new')}>Create a New Entry</button>
          
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
                     const {entryId} = row.original
                      return (
                        <h5>
                          {value.slice(0,17) + (value.length > 17 ? '...' : '')}
                          <span className='Home-entry-list-icons'>
                            <span id='Home-edit-icon'><FontAwesomeIcon icon={faEdit}/></span>
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

interface HomeProps {
  isAuthenticated: Boolean,
  allEntries: string,
  deleteEntry: Function
};

export default Home
