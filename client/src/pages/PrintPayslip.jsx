import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { dummyPayslipData} from '../assets/assets';
import Loading from '../components/Loading'
import {format} from 'date-fns'

const PrintpaySlip = () => {
    const { id } = useParams()
    const [payslip, setPayslip] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setPayslip(dummyPayslipData.find((payslip) => payslip._id === id))
      setTimeout(() => {
        setLoading(false)
      },1000)
    }, [id])

    if (loading) return <Loading/>
    if (!payslip) return <p className='text-center text-lg font-medium text-slate-700'>Payslip not found</p>

  return (
    <div className='p-6 flex flex-col gap-4 max-w-3xl mx-auto'>
        <div className='text-center border-b border-slate-200 pb-4'>
          <h1 className='text-2xl font-semibold text-slate-900 mb-2'>PAYSLIP</h1>
          <p className='text-sm text-slate-500'>{format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
            <div>
               <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Employee Name</p>
               <p className='font-semibold text-slate-900'>{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
            </div>
            <div>
               <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Position</p>
               <p className='font-semibold text-slate-900'>{payslip.employee?.position}</p>
            </div>
            <div>
               <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Email</p>
               <p className='font-semibold text-slate-900'>{payslip.employee?.email}</p>
            </div>
            <div>
               <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Period</p>
               <p className='font-semibold text-slate-900'>{format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}</p>
            </div>
        </div>
          <div className='rounded-xl border border-slate-200 bg-slate-100 p-4 mt-6'>
              <table className='w-full text-sm text-left text-slate-900'> 
                  <thead>
                     <tr className='bg-slate-200'>
                        <th className='text-left py-3 px-4 text-xs text-slate-500 uppercase tracking-wider'>Description</th>
                        <th className='text-right py-3 px-4 text-xs text-slate-500 uppercase tracking-wider'>Amount</th>
                     </tr>
                  </thead>
                     <tbody> 
                      <tr className='border-b border-slate-200'>
                        <td className='py-3 px-4'>Basic Salary</td>
                        <td className='py-3 px-4 text-right text-slate-900'>${payslip.basicSalary?.toLocaleString()}</td>
                      </tr>
                      <tr className='border-b border-slate-200'>
                          <td className='py-3 px-4'>Allowance</td>
                          <td className='py-3 px-4 text-right text-slate-900'>+${payslip.allowances?.toLocaleString()}</td>
                      </tr>
                      <tr className='border-b border-slate-200'>
                          <td className='py-3 px-4'>Deductions</td>
                          <td className='py-3 px-4 text-right text-slate-900'>+${payslip.deductions?.toLocaleString()}</td>
                      </tr>
                      <tr className='border-t-2 border-slate-200 bg-slate-50'>
                          <td className='py-4 px-4 font-bold text-slate-900'>Net Salary</td>
                          <td className='text-right py-4 px-4 font-bold text-slate-900 text-lg'>+${payslip.netSalary?.toLocaleString()}</td>
                      </tr>                    
                     </tbody>
                   </table>
                   <div className='text-center'>
                     <button>Print PaySlip</button>
                   </div>
           </div>
    </div>
  )
}

export default PrintpaySlip