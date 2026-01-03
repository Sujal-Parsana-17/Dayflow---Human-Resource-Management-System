import React from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { StatCard } from '@components/dashboard/StatCard'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Users, CheckCircle, Clock, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { StatusBadge } from '@components/common/StatusBadge'

function AdminDashboard() {
  const { user } = useAuth()

  // Mock data - Replace with real API data
  const stats = {
    totalEmployees: 48,
    presentToday: 42,
    pendingLeaves: 5,
    onLeave: 3,
  }

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Applied for leave', time: '2 hours ago', status: 'pending' },
    { id: 2, user: 'Jane Smith', action: 'Checked in', time: '3 hours ago', status: 'present' },
    { id: 3, user: 'Mike Johnson', action: 'Leave approved', time: '5 hours ago', status: 'approved' },
    { id: 4, user: 'Sarah Wilson', action: 'Profile updated', time: '1 day ago', status: 'approved' },
  ]

  const pendingLeaveRequests = [
    { id: 1, employee: 'John Doe', type: 'Paid Leave', dates: 'Jan 10-12, 2026', days: 3, reason: 'Family vacation' },
    { id: 2, employee: 'Alice Brown', type: 'Sick Leave', dates: 'Jan 8-9, 2026', days: 2, reason: 'Medical appointment' },
    { id: 3, employee: 'Bob Wilson', type: 'Unpaid Leave', dates: 'Jan 15-20, 2026', days: 6, reason: 'Personal reasons' },
  ]

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 mt-2">Here's what's happening in your organization today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Employees"
          value={stats.totalEmployees}
          subtitle="Active in system"
          color="primary"
          trend="up"
          trendValue="+2 this month"
        />
        <StatCard
          icon={CheckCircle}
          title="Present Today"
          value={stats.presentToday}
          subtitle={`${Math.round((stats.presentToday / stats.totalEmployees) * 100)}% attendance`}
          color="success"
        />
        <StatCard
          icon={Calendar}
          title="On Leave"
          value={stats.onLeave}
          subtitle="Employees on leave"
          color="info"
        />
        <StatCard
          icon={Clock}
          title="Pending Requests"
          value={stats.pendingLeaves}
          subtitle="Require approval"
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pending Leave Requests</h2>
              <span className="text-sm text-odoo-primary font-medium cursor-pointer hover:underline">View All</span>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {pendingLeaveRequests.map((request) => (
                <div key={request.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.employee}</h3>
                      <p className="text-sm text-gray-600">{request.type} • {request.days} days</p>
                    </div>
                    <StatusBadge status="pending" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{request.dates}</p>
                  <p className="text-sm text-gray-600 line-clamp-1">{request.reason}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 text-sm bg-success text-white rounded hover:bg-green-600 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <AlertCircle className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    <StatusBadge status={activity.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-lg hover:shadow-lg transition-all">
              <Users className="h-5 w-5 mr-2" />
              Add New Employee
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white border-2 border-odoo-primary text-odoo-primary rounded-lg hover:bg-odoo-primary hover:text-white transition-all">
              <Clock className="h-5 w-5 mr-2" />
              Mark Attendance
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              <TrendingUp className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

export default AdminDashboard
