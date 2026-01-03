import React from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'

function PlaceholderPage({ title, description }) {
  return (
    <DashboardLayout>
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚧</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              This feature is under development and will be available soon.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PlaceholderPage
