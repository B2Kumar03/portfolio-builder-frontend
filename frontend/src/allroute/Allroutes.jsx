import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PersonalDetails from '../component/PersonalDetails'
import Skills from '../component/Skills'
import Projects from '../component/Project'

const Allroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PersonalDetails/>}/>
      <Route path='/skills' element={<Skills/>}/>
      <Route path='/project' element={<Projects/>}/>
    </Routes>
  )
}

export default Allroutes