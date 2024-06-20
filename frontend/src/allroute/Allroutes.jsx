import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PersonalDetails from '../component/PersonalDetails'

const Allroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PersonalDetails/>}/>
    </Routes>
  )
}

export default Allroutes