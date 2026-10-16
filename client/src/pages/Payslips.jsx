import { useState, useEffect, useCallback } from 'react'
import { dummyPayslipData } from '../assets/assets'
import { dummyEmployeeData } from '../assets/assets'
import Loading from '../components/Loading'
import PayslipList from '../components/PaySlip/PayslipList'
import GeneratePaySlipForm from '../components/PaySlip/GeneratePaySlipForm'


const Payslips = () => {

  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true; // Change this to true if the user is an admin


  const fetchPayslips = useCallback(() => {
    setPayslips(dummyPayslipData)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },[])

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips])

  useEffect(() => {
    if (isAdmin) {
      // Fetch employees data for admin
      setEmployees(dummyEmployeeData);
    }
    }, [isAdmin])

    if (loading) {
      return <Loading />
    }

  return (
    <div className="animation-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p>{isAdmin ? "Generate and manage payslips" : "your payslips history"}</p>
        </div>
          {isAdmin && <GeneratePaySlipForm employees={employees} onSuccess={fetchPayslips} />}
      </div>
          <PayslipList payslips={payslips} IsAdmin={isAdmin}/>
    </div>
  )
}

export default Payslips