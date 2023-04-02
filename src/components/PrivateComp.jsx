import React from 'react'
import { useContext } from 'react'
import { Appstate } from '../App'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const PrivateComp = () => {

  const islogin = localStorage.getItem('login')

  const useAppstate = useContext(Appstate)  
  const login = islogin
  return login ? <Outlet/> :  <Navigate to="login" />
}

export default PrivateComp