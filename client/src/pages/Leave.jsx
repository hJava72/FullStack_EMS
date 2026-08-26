import { useState, useEffect, useCallback } from 'react'
import { ThermometerIcon, UmbrellaIcon, CalendarDaysIcon, PlusIcon } from 'lucide-react'
import { dummyLeaveData } from '../assets/assets'
import Loading from '../components/Loading'
import LeaveHistory from '../components/Leave/LeaveHistory'
import ApplyLeaveModal from '../components/Leave/ApplyLeaveModal'

const Leave = () => {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const isAdmin = false;

  const fetchLeaves = useCallback (()=>{setLeaves(dummyLeaveData); setTimeout(() => {setLoading(false);}, 1000);},[])
    

  useEffect(() => {
    fetchLeaves()
  }, [fetchLeaves])

  if (loading) {
    return <Loading />
  }

  const approvedLeaves = leaves.filter((leave) => leave.status === 'APPROVED')
  const sickCount = approvedLeaves.filter((leave) => leave.type === 'SICK').length
  const casualCount = approvedLeaves.filter((leave) => leave.type === 'CASUAL').length
  const annualCount = approvedLeaves.filter((leave) => leave.type === 'ANNUAL').length

  const leaveStats = [
    { label: 'Sick Leave', value: sickCount, icon: ThermometerIcon },
    { label: 'Casual Leave', value: casualCount, icon: UmbrellaIcon },
    { label: 'Annual Leave', value: annualCount, icon: CalendarDaysIcon },
  ]

  return (
    <div className='animation-fade-in space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='page-title'>Leave Management</h1>
          <p className='page-subtitle'>
            {isAdmin ? 'Manage leave applications' : 'Your leave history and request'}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className='btn-primary flex items-center gap-2 w-full sm:w-auto justify-center'
          >
            <PlusIcon className='w-4 h-4' /> Apply for Leave
          </button>
        )}
      </div>
         
          {!isAdmin && (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8'>
                {leaveStats.map((s) => (
                  <div key={s.label} className='card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group'> 
                      <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                      <div className='p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-indigo-50 transition-colors duration-300'> 
                          <s.icon className='w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200'/>
                      </div>
                      
                      <div>
                          <p className='text-sm text-slate-500'>{s.label}</p>
                          <p className='text-2xl font-bold text-slate-800 tracking-tight'>{s.value} <span className='text-sm font-normal text-slate-400'>taken</span></p>
                      </div>

                  </div>
                ))}
              </div>
                     
                )}
<LeaveHistory leaves={leaves} IsAdmin={isAdmin} onUpdate={fetchLeaves}/>
<ApplyLeaveModal open={showModal} onClose={() => setShowModal(false)} onSuccess={fetchLeaves} />


      {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      //   {leaveStats.map(({ label, value, icon: Icon }) => (
      //     <div key={label} className='card p-4 rounded-xl border border-slate-200 bg-white'>
      //       <div className='flex items-center justify-between'>
      //         <div>
      //           <p className='text-sm text-slate-500'>{label}</p>
      //           <p className='text-2xl font-bold mt-2'>{value}</p>
      //         </div>
      //         <div className='p-3 rounded-lg bg-indigo-50 text-indigo-600'>
      //           <Icon className='w-5 h-5' />
      //         </div>
      //       </div>
      //     </div>
      //   ))}
      // </div>

      // {showModal && (
      //   <div className='mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600'>
      //     Leave request form would appear here.
      //   </div>
      // )} */}
    
    </div>  
  )
}

export default Leave