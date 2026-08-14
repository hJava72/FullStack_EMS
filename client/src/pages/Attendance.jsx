
import { useEffect, useState } from "react"
import { dummyAttendanceData } from "../assets/assets"
import Loading from "../components/Loading"
import CheckinButton from "../components/attendance/CheckinButton"
import { AttendanceStats } from "../components/attendance/AttendanceStats"
import AttendanceHistory from "../components/attendance/AttendanceHistory"

const Attendance = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const [isDeleted, setIsDeleted] = useState(false)
  const [todayRecord, setTodayRecord] = useState(null)

  const fetchData = async () => {console.log('fetching data...')}

  useEffect(() => {
    setAttendanceHistory(dummyAttendanceData)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="animate-fade-in space-y-6">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work and daily check-ins</p>
      </div>

      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              <p className="text-rose-600">You can no longer clock in or out because your employee records have been marked as deleted</p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckinButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      <AttendanceStats history={attendanceHistory} />
      <AttendanceHistory history={attendanceHistory} />

    </div>
  )
}

export default Attendance