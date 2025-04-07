import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Admin/Dashboard'
import ManagerTasks from './pages/Admin/ManagerTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManagerUsers from './pages/Admin/ManagerUsers'
import UserDashboard from './pages/User/UserDashboard'
import MyTask from './pages/User/MyTask'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/tasks" element={<ManagerTasks />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/users" element={<ManagerUsers />} />
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTask />} />
          <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
