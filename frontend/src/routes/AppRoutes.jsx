import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import LandingPage from '@pages/LandingPage'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Dashboard from '@pages/Dashboard'
import EmployeeList from '@pages/EmployeeList'
import AddEmployee from '@pages/AddEmployee'
import EmployeeProfile from '@pages/EmployeeProfile'
import MyAttendance from '@pages/MyAttendance'
import AttendanceManagement from '@pages/AttendanceManagement'
import MyLeaves from '@pages/MyLeaves'
import ApplyLeave from '@pages/ApplyLeave'
import LeaveRequests from '@pages/LeaveRequests'
import PlaceholderPage from '@pages/PlaceholderPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Employee Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="My Profile" description="View and edit your personal information" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-attendance" 
        element={
          <ProtectedRoute>
            <MyAttendance />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-leaves" 
        element={
          <ProtectedRoute>
            <MyLeaves />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/apply-leave" 
        element={
          <ProtectedRoute>
            <ApplyLeave />
          </ProtectedRoute>
        } 
      />

      {/* Admin/HR Routes */}
      <Route 
        path="/employees" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <EmployeeList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employees/add" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <AddEmployee />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employees/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <EmployeeProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <AttendanceManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leave-requests" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <LeaveRequests />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'hr']}>
            <PlaceholderPage title="Reports" description="Generate and view various HR reports" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Settings" description="Manage your account and system settings" />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
