import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'

function Dashboard() {

  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
      setDisplayName(username)
    } else {
      setDisplayName("")
    }
  }, [])

  return (
    <div>
      <Header insideDashBoard={true} />
      <div style={{ marginTop: '100px' }} className='container-fluid p-4'>
        <div className="row mt-3 ">
          <div className="col-lg-8 ">
            <h1 className='pb-4'>Welcome <span className='text-primary'>{displayName.split(" ")[0]}</span></h1>
            <View />
          </div>
          <div className="col-lg-4">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard