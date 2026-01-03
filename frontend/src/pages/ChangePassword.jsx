import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import api from '@services/api'

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

function ChangePassword({ required = false }) {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      setSuccess(false)

      const response = await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      setSuccess(true)
      reset()

      // If password change was required, redirect to dashboard after 2 seconds
      if (required) {
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || 'Failed to change password. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {required ? 'Change Your Password' : 'Update Password'}
          </h2>
          <p className="text-gray-600 mt-2">
            {required
              ? 'For security reasons, please change your password before continuing'
              : 'Keep your account secure by updating your password'}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-800 font-medium">Password changed successfully!</p>
              {required && (
                <p className="text-sm text-green-700 mt-1">Redirecting to dashboard...</p>
              )}
            </div>
          </div>
        )}

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-danger mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Current Password *"
            type="password"
            placeholder="Enter your current password"
            icon={<Lock className="w-5 h-5" />}
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />

          <Input
            label="New Password *"
            type="password"
            placeholder="Enter new password (min 6 characters)"
            icon={<Lock className="w-5 h-5" />}
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />

          <Input
            label="Confirm New Password *"
            type="password"
            placeholder="Confirm your new password"
            icon={<Lock className="w-5 h-5" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Password Requirements:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
              <li>At least 6 characters long</li>
              <li>Different from current password</li>
              <li>Recommended: Mix of uppercase, lowercase, and numbers</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || success}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </Button>

          {!required && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-4"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
