import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { StatusBadge } from '@components/common/StatusBadge'
import { Calendar, Check, X, MessageSquare } from 'lucide-react'
import { formatDate } from '@utils/helpers'

function LeaveRequests() {
  const [leaves, setLeaves] = useState([])
  const [filter, setFilter] = useState('pending')

  useEffect(() => {
    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]')
    setLeaves(allLeaves)
  }, [])

  const handleApprove = (leaveId) => {
    const updatedLeaves = leaves.map(leave =>
      leave.id === leaveId ? { ...leave, status: 'approved' } : leave
    )
    setLeaves(updatedLeaves)
    localStorage.setItem('leaves', JSON.stringify(updatedLeaves))
  }

  const handleReject = (leaveId) => {
    const reason = prompt('Enter rejection reason:')
    if (reason) {
      const updatedLeaves = leaves.map(leave =>
        leave.id === leaveId ? { ...leave, status: 'rejected', rejectionReason: reason } : leave
      )
      setLeaves(updatedLeaves)
      localStorage.setItem('leaves', JSON.stringify(updatedLeaves))
    }
  }

  const filteredLeaves = filter === 'all'
    ? leaves
    : leaves.filter(leave => leave.status === filter)

  const stats = {
    pending: leaves.filter(l => l.status === 'pending').length,
    approved: leaves.filter(l => l.status === 'approved').length,
    rejected: leaves.filter(l => l.status === 'rejected').length,
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardBody>
            <p className="text-sm text-yellow-800 mb-1">Pending Requests</p>
            <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardBody>
            <p className="text-sm text-green-800 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-900">{stats.approved}</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardBody>
            <p className="text-sm text-red-800 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
          </CardBody>
        </Card>
      </div>

      {/* Leave Requests List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Requests</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'pending' ? 'bg-warning text-gray-900' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'approved' ? 'bg-success text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'rejected' ? 'bg-danger text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-odoo-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
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
              </div>
            ) : (
              filteredLeaves.map((leave) => (
                <div key={leave.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{leave.employeeName}</h3>
                        <StatusBadge status={leave.status} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium capitalize">{leave.leaveType.replace('-', ' ')}</span> • {' '}
                          {formatDate(leave.startDate)} - {formatDate(leave.endDate)} • {' '}
                          {leave.days} {leave.days === 1 ? 'day' : 'days'}
                        </p>
                        <p className="text-sm text-gray-500">{leave.reason}</p>
                        <p className="text-xs text-gray-400">Applied on {formatDate(leave.appliedDate)}</p>
                        {leave.rejectionReason && (
                          <p className="text-sm text-danger mt-2">
                            <strong>Rejection Reason:</strong> {leave.rejectionReason}
                          </p>
                        )}
                      </div>
                    </div>
                    {leave.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApprove(leave.id)}
                          className="px-3 py-1.5 bg-success text-white rounded-lg hover:bg-green-600 transition-colors flex items-center text-sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(leave.id)}
                          className="px-3 py-1.5 bg-danger text-white rounded-lg hover:bg-red-600 transition-colors flex items-center text-sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
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

export default LeaveRequests
