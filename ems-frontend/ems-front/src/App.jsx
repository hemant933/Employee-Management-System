import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <HeaderComponent></HeaderComponent>
        <Routes>
        {/* //http://localhost:3000 */}
            <Route path='/' element={<ListEmployeeComponent />}></Route>
            {/* //http://localhost:3000/employees */}
            <Route path='/employees' element={<ListEmployeeComponent />}></Route>
         
          <Route path='/add-employee' element={<EmployeeComponent></EmployeeComponent>}></Route>
       
          {/* //http://localhost:3000/edit-employee/1     */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent></EmployeeComponent>}></Route>
        </Routes>
     
     <FooterComponent></FooterComponent>
     </BrowserRouter>
     </>
  )
}

export default App
