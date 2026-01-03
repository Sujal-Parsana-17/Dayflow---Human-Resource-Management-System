import React from 'react'
import { CheckCircle, Bell, UserCheck } from 'lucide-react'

function DashboardPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See Dayflow in Action
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a modern, intuitive interface designed to simplify HR management
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative">
          {/* Floating Badges */}
          <div className="absolute -top-6 left-10 z-20 animate-bounce">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Attendance Tracked</span>
            </div>
          </div>

          <div className="absolute top-20 -right-4 z-20 animate-pulse">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Leave Approved</span>
            </div>
          </div>

          <div className="absolute bottom-10 -left-4 z-20">
            <div className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <UserCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Employee Added</span>
            </div>
          </div>

          {/* Main Dashboard Image Container */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 md:p-8 shadow-2xl transform perspective-1000" style={{ transform: 'rotateX(2deg)' }}>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">dayflow.app</div>
              </div>

              {/* Dashboard Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gradient-to-b from-odoo-primary to-odoo-primary-dark text-white p-6 hidden md:block">
                  {/* Logo */}
                  <div className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-odoo-primary font-bold">D</span>
                    </div>
                    <span className="font-bold text-lg">Dayflow</span>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {[
                      { name: 'Overview', active: true },
                      { name: 'Employees', active: false },
                      { name: 'Attendance', active: false },
                      { name: 'Time Off', active: false },
                      { name: 'Settings', active: false },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-lg ${
                          item.active ? 'bg-white/20' : 'hover:bg-white/10'
                        } transition-colors cursor-pointer`}
                      >
                        <div className="text-sm">{item.name}</div>
                      </div>
                    ))}
                  </nav>

                  {/* User Profile */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-purple-200">admin@dayflow.app</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-8 bg-gray-50">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Employee Overview</h3>
                    <div className="flex space-x-4 text-sm">
                      <button className="text-odoo-primary border-b-2 border-odoo-primary pb-2">Private Info</button>
                      <button className="text-gray-500 pb-2">Salary Info</button>
                      <button className="text-gray-500 pb-2">Biography</button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-success">154</div>
                      <div className="text-xs text-gray-600">Total Employees</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-info">98%</div>
                      <div className="text-xs text-gray-600">Present Today</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-warning">12</div>
                      <div className="text-xs text-gray-600">On Leave</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-danger">5</div>
                      <div className="text-xs text-gray-600">Pending Requests</div>
                    </div>
                  </div>

                  {/* Employee Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-2 bg-gray-100 rounded w-16 mb-1"></div>
                            <div className="h-2 bg-gray-100 rounded w-20"></div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Present
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Section */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Attendance Overview</h4>
                      <div className="text-4xl font-bold text-odoo-primary">76%</div>
                    </div>
                    <div className="h-24 flex items-end justify-between space-x-2">
                      {[60, 80, 45, 90, 70, 85, 95].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-odoo-primary to-odoo-primary-light rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPreview
