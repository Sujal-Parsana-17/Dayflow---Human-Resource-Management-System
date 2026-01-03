import React from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { StatCard } from '@components/dashboard/StatCard'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Calendar, Clock, CheckCircle, AlertCircle, User, FileText } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { StatusBadge } from '@components/common/StatusBadge'
import { formatDate } from '@utils/helpers'

function EmployeeDashboard() {
  const { user } = useAuth()

  // Mock data - Replace with real API data
  const stats = {
    daysPresent: 20,
    totalDays: 22,
    leaveBalance: 12,
    pendingRequests: 1,
  }

  const attendanceToday = {
    checkIn: '09:15 AM',
    checkOut: null,
    status: 'present',
  }

  const recentLeaves = [
    { id: 1, type: 'Paid Leave', dates: 'Dec 25-27, 2025', status: 'approved', days: 3 },
    { id: 2, type: 'Sick Leave', dates: 'Jan 10, 2026', status: 'pending', days: 1 },
  ]

  const upcomingHolidays = [
    { id: 1, name: 'Republic Day', date: 'Jan 26, 2026' },
    { id: 2, name: 'Holi', date: 'Mar 14, 2026' },
    { id: 3, name: 'Good Friday', date: 'Apr 18, 2026' },
  ]

  const handleCheckIn = () => {
    alert('Check-in functionality coming soon!')
  }

  const handleCheckOut = () => {
    alert('Check-out functionality coming soon!')
  }

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}! 👋</h1>
        <p className="text-gray-600 mt-2">{formatDate(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={CheckCircle}
          title="Days Present"
          value={`${stats.daysPresent}/${stats.totalDays}`}
          subtitle="This month"
          color="success"
        />
        <StatCard
          icon={Calendar}
          title="Leave Balance"
          value={stats.leaveBalance}
          subtitle="Days remaining"
          color="primary"
        />
        <StatCard
          icon={Clock}
          title="Pending Requests"
          value={stats.pendingRequests}
          subtitle="Awaiting approval"
          color="warning"
        />
        <StatCard
          icon={User}
          title="Attendance Rate"
          value={`${Math.round((stats.daysPresent / stats.totalDays) * 100)}%`}
          subtitle="This month"
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Check In</p>
                  <p className="text-2xl font-bold text-success">
                    {attendanceToday.checkIn || '--:--'}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Check Out</p>
                  <p className="text-2xl font-bold text-gray-400">
                    {attendanceToday.checkOut || '--:--'}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleCheckIn}
                  disabled={attendanceToday.checkIn}
                  className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={!attendanceToday.checkIn || attendanceToday.checkOut}
                  className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Out
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Leave Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Leave Requests</h2>
              <button className="text-sm text-odoo-primary font-medium hover:underline">
                Apply for Leave
              </button>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {recentLeaves.map((leave) => (
                <div key={leave.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{leave.type}</h3>
                      <p className="text-sm text-gray-600">{leave.dates} • {leave.days} {leave.days > 1 ? 'days' : 'day'}</p>
                    </div>
                    <StatusBadge status={leave.status} />
                  </div>
                </div>
              ))}
              {recentLeaves.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No leave requests yet
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Holidays */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Holidays</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingHolidays.map((holiday) => (
              <div key={holiday.id} className="p-4 bg-gradient-to-r from-odoo-primary/10 to-odoo-primary-light/10 rounded-lg">
                <p className="font-medium text-gray-900">{holiday.name}</p>
                <p className="text-sm text-gray-600 mt-1">{holiday.date}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-lg hover:shadow-lg transition-all">
              <Calendar className="h-5 w-5 mr-2" />
              Apply for Leave
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white border-2 border-odoo-primary text-odoo-primary rounded-lg hover:bg-odoo-primary hover:text-white transition-all">
              <Clock className="h-5 w-5 mr-2" />
              View Attendance
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              <User className="h-5 w-5 mr-2" />
              Update Profile
            </button>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

export default EmployeeDashboard
