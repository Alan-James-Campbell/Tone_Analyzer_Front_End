import React                               from 'react'
import { useHistory }                     from 'react-router-dom'
import ReactTable                         from 'react-table'
import Dashboard                          from '../Dashboard'
import                                    'react-table/react-table.css' 

const Home = ({ allEntries, isAuthenticated }: HomeProps) => {

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
};

export default Home
