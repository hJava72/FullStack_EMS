import React from 'react'
import { Download } from 'lucide-react'
import { format } from 'date-fns'

const PayslipList = ({payslips, IsAdmin}) => {
  return (
            <div className="card w-full overflow-hidden">

          <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                    <tr>
                        {IsAdmin && <th>Employee</th>}
                        <th>Period</th>
                        <th>Basic Salary</th>
                        <th>Net Salary</th>
                        <th className="text-center">Actions</th>

                    </tr>
                </thead>
                <tbody>
                     
                     {payslips.length === 0 ? (
                      <tr>
                        <td colSpan={ IsAdmin ? 5 : 4} className="text-center py-12 text-slate-400">
                          No payslips found.
                        </td> 
                      </tr>
                      ) : (
                       payslips.map((payslip)=>{
                         
                        return(
                          <tr key={payslip._id || payslip.id}>
                            {IsAdmin && (
                                <td className="text-slate-900">{payslip.employee?.firstName} {payslip.employee?.lastName}</td>
                            )}
                            
                            <td className="text-slate-500">
                               {format(new Date(payslip.year, payslip.month - 1, 1), 'MMM yyyy')}
                            </td>

                            <td className="text-slate-500">
                              ${payslip.basicSalary.toLocaleString()}
                            </td>

                             <td className="font-medium text-slate-800">
                              ${payslip.netSalary.toLocaleString()}
                            </td>

                            <td className="text-center">
                              <button onClick={()=> window.open(`/print/payslips/${payslip._id || payslip.id}`)} className="inline-flex items-center justify-center gap-1.5 rounded text-blue-600 bg-blue-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10">
                                <Download className="w-3 h-3 mr-1.5" />
                                Download
                              </button>
                            </td>

                                                     
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

export default PayslipList