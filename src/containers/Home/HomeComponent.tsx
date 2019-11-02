import React, { useEffect }               from 'react'
import Dashboard                          from '../Dashboard'
import { useHistory }                     from 'react-router-dom'

type HomeProps  = {
  getAllEntries: Function;
  isAuthenticated: Boolean;
};

const Home = ({ getAllEntries, isAuthenticated }: HomeProps) => {
  
  useEffect(() => {getAllEntries()}, [getAllEntries])

  const history = useHistory()

  return (
    <div>
      
      {isAuthenticated&&(
        <div>
           <div className='container'>
              <button onClick={e => history.push('/entries/new')}>Create a New Entry</button>
           </div>
           <Dashboard />
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
