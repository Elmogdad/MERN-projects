import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')) // أو من context/auth
  const userRole = user?.role

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default PrivateRoute
