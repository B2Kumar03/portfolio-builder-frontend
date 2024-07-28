import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PersonalDetails from '../component/PersonalDetails'
import Skills from '../component/Skills'
import Projects from '../component/Project'
import UploadResume from '../component/UploadResume'

const Allroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PersonalDetails/>}/>
      <Route path='/skills' element={<Skills/>}/>
      <Route path='/project' element={<Projects/>}/>
      <Route path="/upload-resume" element={<UploadResume/>}/>
    </Routes>
  )
}

export default Allroutes