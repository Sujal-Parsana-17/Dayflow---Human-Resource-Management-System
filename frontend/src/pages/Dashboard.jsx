import React from 'react'
import { useAuth } from '@hooks/useAuth'
import { Navigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import EmployeeDashboard from './EmployeeDashboard'

function Dashboard() {
  const { user, isAdmin, isHR } = useAuth()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  // Route to appropriate dashboard based on role
  if (isAdmin || isHR) {
    return <AdminDashboard />
  }

  return <EmployeeDashboard />
}

// Legacy welcome screen (keeping for reference, but not used anymore)
function WelcomeScreen() {
  const { user, isAdmin, isHR } = useAuth()
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.name}! 🎉
          </h1>
          
          <p className="text-gray-600 mb-6">
            You have successfully {localStorage.getItem('isNewUser') === 'true' ? 'created your account' : 'signed in'}.
          </p>

          {/* User Info Card */}
          <div className="max-w-md mx-auto bg-gradient-to-r from-odoo-primary/10 to-odoo-primary-light/10 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Account Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Login ID:</span>
                <span className="font-medium text-odoo-primary">{user.loginId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-odoo-primary text-white uppercase">
                  {user.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium text-gray-900">{user.companyName}</span>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>📌 Save Your Login ID:</strong> {user.loginId}
              <br />
              You can use either your email or this Login ID to sign in.
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-odoo-primary mr-2">✓</span>
                <span>Full dashboard with statistics (Coming soon)</span>
              </li>
              <li className="flex items-start">
                <span className="text-odoo-primary mr-2">✓</span>
                <span>Employee management and profiles (Coming soon)</span>
              </li>
              <li className="flex items-start">
                <span className="text-odoo-primary mr-2">✓</span>
                <span>Attendance tracking and leave management (Coming soon)</span>
              </li>
              {(isAdmin || isHR) && (
                <li className="flex items-start">
                  <span className="text-odoo-primary mr-2">✓</span>
                  <span>Admin controls and approval workflows (Coming soon)</span>
                </li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                // Clear the new user flag
                localStorage.removeItem('isNewUser')
              }}
              className="px-6 py-2 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-lg hover:shadow-lg transition-all"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
export { WelcomeScreen }
