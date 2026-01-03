import React, { useState } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Calendar as CalendarIcon, FileText, Upload, AlertCircle } from 'lucide-react'
import { LEAVE_TYPES } from '@utils/constants'
import { calculateLeaveDays } from '@utils/helpers'

const leaveSchema = yup.object().shape({
  leaveType: yup.string().required('Leave type is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  reason: yup.string().required('Reason is required').min(10, 'Reason must be at least 10 characters'),
})

function ApplyLeave() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leaveSchema),
  })

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const leaveDays = startDate && endDate ? calculateLeaveDays(startDate, endDate) : 0

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setServerError('')

      const leaves = JSON.parse(localStorage.getItem('leaves') || '[]')
      
      const newLeave = {
        id: Date.now().toString(),
        employeeId: user.id,
        employeeName: user.name,
        ...data,
        days: leaveDays,
        status: 'pending',
        appliedDate: new Date().toISOString(),
      }

      leaves.push(newLeave)
      localStorage.setItem('leaves', JSON.stringify(leaves))

      alert('Leave application submitted successfully!')
      navigate('/my-leaves')
    } catch (error) {
      setServerError(error.message || 'Failed to apply for leave')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Leave</h1>
          <p className="text-gray-600 mt-1">Submit a new time-off request</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-danger mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Leave Details</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-5">
                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Leave Type *
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    {...register('leaveType')}
                  >
                    <option value="">Select leave type</option>
                    <option value={LEAVE_TYPES.PAID}>Paid Leave</option>
                    <option value={LEAVE_TYPES.SICK}>Sick Leave</option>
                    <option value={LEAVE_TYPES.CASUAL}>Casual Leave</option>
                    <option value={LEAVE_TYPES.UNPAID}>Unpaid Leave</option>
                  </select>
                  {errors.leaveType && <p className="mt-1.5 text-sm text-danger">{errors.leaveType.message}</p>}
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                      {...register('startDate')}
                    />
                    {errors.startDate && <p className="mt-1.5 text-sm text-danger">{errors.startDate.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      End Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                      {...register('endDate')}
                    />
                    {errors.endDate && <p className="mt-1.5 text-sm text-danger">{errors.endDate.message}</p>}
                  </div>
                </div>

                {/* Days Calculation */}
                {leaveDays > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Total Days:</strong> {leaveDays} {leaveDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                )}

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reason *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Please provide a detailed reason for your leave request"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    {...register('reason')}
                  />
                  {errors.reason && <p className="mt-1.5 text-sm text-danger">{errors.reason.message}</p>}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Your leave request will be sent to your manager/HR for approval. 
              You will be notified once your request is processed.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-leaves')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting || leaveDays <= 0}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default ApplyLeave
