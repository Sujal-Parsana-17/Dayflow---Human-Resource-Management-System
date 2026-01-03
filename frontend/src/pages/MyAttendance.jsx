import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { useAuth } from '@hooks/useAuth'
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'

function MyAttendance() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [attendance, setAttendance] = useState([])
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)

  useEffect(() => {
    // Load attendance from localStorage
    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    const myAttendance = allAttendance.filter(a => a.employeeId === user.id)
    setAttendance(myAttendance)

    // Check today's attendance
    const today = format(new Date(), 'yyyy-MM-dd')
    const todayAttendance = myAttendance.find(a => a.date === today)
    if (todayAttendance) {
      setCheckInTime(todayAttendance.checkIn)
      setCheckOutTime(todayAttendance.checkOut)
    }
  }, [user.id])

  const handleCheckIn = () => {
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
    setAttendance([...attendance, newAttendance])
    setCheckInTime(time)
  }

  const handleCheckOut = () => {
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
    setAttendance(updatedAttendance.filter(a => a.employeeId === user.id))
    setCheckOutTime(time)
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAttendanceForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return attendance.find(a => a.date === dateStr)
  }

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: 0, // Can be calculated based on working days
    total: daysInMonth.length,
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        <p className="text-gray-600 mt-1">Track your attendance and working hours</p>
      </div>

      {/* Today's Check In/Out */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check In</p>
                <p className="text-2xl font-bold text-success">
                  {checkInTime || '--:--:--'}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check Out</p>
                <p className="text-2xl font-bold text-gray-600">
                  {checkOutTime || '--:--:--'}
                </p>
              </div>
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCheckIn}
              disabled={checkInTime}
              className="px-6 py-3 bg-success text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!checkInTime || checkOutTime}
              className="px-6 py-3 bg-danger text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Check Out
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Days Present</p>
            <p className="text-3xl font-bold text-success">{stats.present}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Days Absent</p>
            <p className="text-3xl font-bold text-danger">{stats.absent}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
            <p className="text-3xl font-bold text-odoo-primary">
              {stats.present > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {daysInMonth.map((day, index) => {
              const attendanceData = getAttendanceForDate(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isCurrentDay = isToday(day)

              return (
                <div
                  key={index}
                  className={`aspect-square p-2 border rounded-lg text-center ${
                    !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                  } ${isCurrentDay ? 'border-odoo-primary border-2' : 'border-gray-200'} ${
                    attendanceData ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="text-sm font-medium">{format(day, 'd')}</div>
                  {attendanceData && (
                    <CheckCircle className="h-4 w-4 text-success mx-auto mt-1" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border-2 border-green-200 rounded"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-odoo-primary rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

export default MyAttendance
