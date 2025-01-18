import React from 'react'
import Navbar from './Navbar'
import Display from './Display'
import SavedList from './SavedList'
const DashBoard = () => {
  return (
    <>
     <Navbar/>
     <Display/>
     <SavedList/>
        <div className= 'bg-black min-h-screen'></div>
       
    </>
  )
}

export default DashBoard