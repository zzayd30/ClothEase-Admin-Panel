import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'

const App = () => {
  const [token, setToken] = useState("")
  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? <Login /> :
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/Add" element={<Add />} />
                <Route path="/List" element={<List />} />
                <Route path="/Orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
