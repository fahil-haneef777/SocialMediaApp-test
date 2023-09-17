import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Navbartop from './Components/Navbar';
import Users from './Components/Users';

function App() {


  return (
    <>
      <Navbartop />
      <Users/>
    </>
  )
}

export default App
