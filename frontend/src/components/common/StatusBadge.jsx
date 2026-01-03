import React from 'react'
import { STATUS_COLORS } from '@utils/constants'
import { capitalize } from '@utils/helpers'

export const StatusBadge = ({ status, className = '' }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-200 text-gray-800'
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      {capitalize(status)}
    </span>
  )
}
