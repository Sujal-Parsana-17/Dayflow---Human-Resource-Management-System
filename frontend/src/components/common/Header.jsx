import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building2, User, LogOut, Settings, ChevronDown, Circle, Clock } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { getInitials } from '@utils/helpers'
import { format } from 'date-fns'

export const Header = () => {
  const { user, signOut, isAdmin, isHR } = useAuth()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const dropdownRef = useRef(null)

  const isAdminOrHR = isAdmin || isHR

  // Load today's attendance status
  useEffect(() => {
    if (user) {
      const today = format(new Date(), 'yyyy-MM-dd')
      const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
      const todayAttendance = allAttendance.find(a => 
        a.employeeId === user.id && a.date === today
      )
      
      if (todayAttendance) {
        setCheckInTime(todayAttendance.checkIn)
        setCheckOutTime(todayAttendance.checkOut)
        setIsCheckedIn(!!todayAttendance.checkIn && !todayAttendance.checkOut)
      } else {
        setCheckInTime(null)
        setCheckOutTime(null)
        setIsCheckedIn(false)
      }
    }
  }, [user, location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    signOut()
    window.location.href = '/signin'
  }

  const handleCheckIn = () => {
    if (!user) return
    
    const now = new Date()
    const today = format(now, 'yyyy-MM-dd')
    const time = format(now, 'HH:mm:ss')

    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    const newAttendance = {
      id: Date.now().toString(),
      employeeId: user.id,
      employeeName: user.name,
      date: today,
      checkIn: time,
      checkOut: null,
      status: 'present',
    }

    allAttendance.push(newAttendance)
    localStorage.setItem('attendance', JSON.stringify(allAttendance))
    setCheckInTime(time)
    setIsCheckedIn(true)
  }

  const handleCheckOut = () => {
    if (!user) return
    
    const now = new Date()
    const today = format(now, 'yyyy-MM-dd')
    const time = format(now, 'HH:mm:ss')

    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    const updatedAttendance = allAttendance.map(a => {
      if (a.employeeId === user.id && a.date === today && !a.checkOut) {
        return { ...a, checkOut: time }
      }
      return a
    })

    localStorage.setItem('attendance', JSON.stringify(updatedAttendance))
    setCheckOutTime(time)
    setIsCheckedIn(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {user?.companyLogo ? (
              <img src={user.companyLogo} alt="Company Logo" className="h-10 w-10 rounded-lg object-cover" />
            ) : (
              <div className="h-10 w-10 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user?.companyName}</h1>
              <p className="text-xs text-gray-500">Dayflow HRMS</p>
            </div>
          </div>

          {/* Check In/Out and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Check In/Out Section - Only for non-admin users */}
            {!isAdminOrHR && (
              <div className="hidden lg:flex items-center space-x-3 pr-4 border-r border-gray-200">
                {!isCheckedIn ? (
                  <button
                    onClick={handleCheckIn}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Check IN →
                  </button>
                ) : (
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-500 mb-1">
                      Since {checkInTime || '--:--'}
                    </div>
                    <button
                      onClick={handleCheckOut}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Check Out →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                {/* Status Indicator Dot */}
                <div className="absolute -top-1 -right-1">
                  <Circle 
                    className={`h-3 w-3 ${isCheckedIn ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'}`} 
                  />
                </div>
                
                {/* Avatar */}
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(user?.name)}
                </div>
                
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {/* User Info in Dropdown */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-odoo-primary mt-1">ID: {user?.loginId}</p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-danger hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
