import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'

export const AttendanceHistory = ({ history }) => {
  const safeHistory = Array.isArray(history) ? history : []

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
         <h3>Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Check-in</th>
              <th className="px-6 py-4 text-left">Check-Out</th>
              <th className="px-6 py-4 text-left">Working Hours</th>
              <th className="px-6 py-4 text-left">Day Type</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {safeHistory.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  No recent attendance records.
                </td>
              </tr>
            ) : (
              safeHistory.map((record) => {
                const dayType = getDayTypeDisplay(record)
                return (
                  <tr key={record._id}>
                    <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                    <td className="px-6 py-4">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                    <td className="px-6 py-4">{getWorkingHoursDisplay(record)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-sm ${dayType.className}`}>
                        {dayType.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">{record.status || '—'}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceHistory