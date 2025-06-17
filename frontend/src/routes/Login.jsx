import React, { useContext } from 'react'
import DataContext from '../context/dataContext'

const Login = () => {
  const {handleLogin} = useContext(DataContext)
  return (
    <div>
      <button onClick={()=>handleLogin()}>Login</button>
    </div>
  )
}

export default Login
