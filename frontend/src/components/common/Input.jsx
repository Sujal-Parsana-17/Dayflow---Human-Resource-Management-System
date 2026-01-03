import React, { forwardRef } from 'react'

export const Input = forwardRef(({ 
  label,
  error,
  type = 'text',
  placeholder,
  disabled = false,
  fullWidth = true,
  icon,
  className = '',
  ...props 
}, ref) => {
  const baseStyles = 'px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-odoo-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
  const errorStyles = error ? 'border-danger focus:ring-danger' : 'border-gray-300'
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${errorStyles} ${widthClass} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
