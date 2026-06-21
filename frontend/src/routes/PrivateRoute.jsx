import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/userContent'

const PrivateRoute = ({allowedRoles}) => {
  const {user, loading} = useContext(UserContext)

  if (loading) {
    return <div>loading...</div>
  }

  if (!user) {
    return <Navigate to={"/"} replace/>;
  }

  if (!allowedRoles.includes(user.role)) {
     return <Navigate to={"/"} replace/>;
  }
  return (
   <Outlet/>
  )
}

export default PrivateRoute
