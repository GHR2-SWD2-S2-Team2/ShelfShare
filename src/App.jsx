import React from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import NotFound from './components/NotFound/NotFound'

function App() {
  

  let routers = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[
      {index:true , element:<Home/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'profile', element:<Profile/>},
      {path:'*', element:<NotFound/>}

    ]}
  ])
    
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}

export default App
