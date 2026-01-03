import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Calendar, 
  FileText,
  Settings,
  User,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@hooks/useAuth'

export const Sidebar = () => {
  const { user, isAdmin, isHR } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAdminOrHR = isAdmin || isHR

  const navItems = isAdminOrHR ? [
    { path: '/employees', icon: Users, label: 'Employees' },
    { path: '/attendance', icon: Clock, label: 'Attendance' },
    { path: '/leave-requests', icon: Calendar, label: 'Leave Requests' },
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ] : [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/my-attendance', icon: Clock, label: 'My Attendance' },
    { path: '/my-leaves', icon: Calendar, label: 'Time Off' },
  ]

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  const SidebarContent = () => (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <span className="text-lg font-semibold text-gray-900">Menu</span>
        <button onClick={toggleMobile} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Role Badge */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-odoo-primary/10 to-odoo-primary-light/10 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Logged in as</p>
          <p className="text-sm font-semibold text-odoo-primary uppercase">{user?.role}</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  )
}
