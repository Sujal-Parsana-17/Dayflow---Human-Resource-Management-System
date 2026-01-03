import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Calendar, Search, Plus } from 'lucide-react'
import { StatusBadge } from '@components/common/StatusBadge'
import { formatDate } from '@utils/helpers'

function MyLeaves() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [leaves, setLeaves] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]')
    const myLeaves = allLeaves.filter(leave => leave.employeeId === user.id)
    setLeaves(myLeaves)
  }, [user.id])

  const filteredLeaves = filter === 'all' 
    ? leaves 
    : leaves.filter(leave => leave.status === filter)

  const leaveBalance = {
    total: 20,
    used: leaves.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.days, 0),
  }
  leaveBalance.remaining = leaveBalance.total - leaveBalance.used

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Leave Requests</h1>
            <p className="text-gray-600 mt-1">View and manage your time-off requests</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/apply-leave')}
          >
            <Plus className="h-5 w-5 mr-2" />
            Apply for Leave
          </Button>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Total Leave Days</p>
            <p className="text-3xl font-bold text-gray-900">{leaveBalance.total}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Used</p>
            <p className="text-3xl font-bold text-danger">{leaveBalance.used}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Remaining</p>
            <p className="text-3xl font-bold text-success">{leaveBalance.remaining}</p>
          </CardBody>
        </Card>
      </div>

      {/* Leave List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Leave History</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-odoo-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'pending' ? 'bg-warning text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'approved' ? 'bg-success text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'rejected' ? 'bg-danger text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {filteredLeaves.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No leave requests found</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => navigate('/apply-leave')}
                >
                  Apply for Leave
                </Button>
              </div>
            ) : (
              filteredLeaves.map((leave) => (
                <div key={leave.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900 capitalize">{leave.leaveType.replace('-', ' ')}</h3>
                        <StatusBadge status={leave.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)} • {leave.days} {leave.days === 1 ? 'day' : 'days'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">{leave.reason}</p>
                      <p className="text-xs text-gray-400 mt-2">Applied on {formatDate(leave.appliedDate)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

export default MyLeaves
