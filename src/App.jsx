import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import CoinDetails from './Components/CoinDetails'
import Exchanges from './Components/Exchanges'
import Coins from './Components/Coins'
import ErrorComponent from './Components/ErrorComponent'



function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins' element={<Coins />} />
        <Route path='/exchanges' element={<Exchanges />} />
        <Route path='/coin/:id' element={<CoinDetails />} />

      </Routes>
    </Router>
  )
}

export default App
