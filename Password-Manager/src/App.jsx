import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/Manager'
import Footer from './components/Footer'



function App() {

  return (
    <>
      

      <div className="">

        <NavBar/>

      </div>
      <div className="min-h-[82vh]">
        <Manager />
      </div>
      <Footer/>        
        
     
    </>
  )
}

export default App