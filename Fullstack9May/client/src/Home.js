import React from 'react'
import Sidebar from './Sidebar.js'


function Home() {
  return(
    <div className='outer-container'>
      <div className="left-container">
        <Sidebar/>
      </div>
      <div className="main-container">
        <div className="heading">
          <h2>Monitoring System</h2>
        </div>
      </div>
    </div>
  )
}

export default Home;