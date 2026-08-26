import react, { useState } from 'react'
import { FileText, Loader2, X, CalendarDays, Send } from 'lucide-react';

const ApplyLeaveModal = ({open, onClose,onSuccess}) => {
  
  const [loading, setLoading] = useState(false);
  const date = new Date();
  const tommorow = new Date(date)
  tommorow.setDate(tommorow.getDate() + 1);
  const mindate = tommorow.toISOString().split('T')[0];

  const handlesubmit = async (e) => {
    e.preventDefault();
 }

 if (!open) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm' onClick={onClose}>
      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg px-2 py-2 animate-fade-in' onClick={e => e.stopPropagation()}>
              {/*----Header----*/}
              <div className='flex items-start justify-between'>
                 <div>
                   <h2 className='text-lg font-semibold text-slate-800'>Apply for Leave</h2>
                   <p className='text-sm text-slate-400 mt-1'>Submit your leave request for approval</p>
                  </div>

                  <button onClick={onClose} className='p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                      <X className='w-4 h-4'/>
                   </button>
                   
              </div>
              {/*----Form----*/}
              <form action="" onSubmit={handlesubmit} className='p-6 space-y-5'>
                {/* --- leave type --- */}
                <div>
                   <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                    <FileText className='w-4 h-4 text-slate-400'/>Leave Type
                   </label>
                   <select name="type" required>
                     <option value="SICK">Sick Leave</option>
                     <option value="CASUAL">Casual Leave</option>
                     <option value="ANNUAL">Annual Leave</option>
                   </select>
                </div>
                {/* --- duration --- */}
                <div> 
                  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <CalendarDays className='w-4 h-4 text-slate-400'/>Duration
                  </label>
                  <div className='grid grid-cols-2 gap-4'>

                    <div>
                       <span className='block text-xs text-slate-400 mb-1'>From</span>
                        <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="date" name="startDate" required min={mindate}/>
                    </div>

                    <div>
                       <span className='block text-xs text-slate-400 mb-1'>To</span>
                        <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="date" name="endDate" required min={mindate}/>
                    </div>

                  </div>
                </div>
                {/* --- reason --- */}

                <div>
                   <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <FileText className='w-4 h-4 text-slate-400'/>Reason
                   </label>
                   <textarea name="reason" required rows={3} className='resize-none' placeholder='Briefly describe why you need for this leave...'></textarea>
                </div>

                {/* --- button --- */}
                <div className='flex gap-3 pt-2'>
                    {/*--- cancel button ---*/}
                    <button onClick={onClose} type='button' className='btn-secondary flex-1'>Cancel</button>
                    {/*--- submit button ---*/}
                    <button onClick={handlesubmit} disabled={loading} type='submit' className='btn-primary flex-1 flex items-center justify-center gap-2'>
                      {loading? <Loader2 className='w-4 h-4 animate-spin'/> : <Send className='w-4 h-4'/>}
                      {loading? 'Submitting...' : 'Submit'}
                    </button>
                    
                </div>

              </form>

        </div>
    </div>
  )
}

export default ApplyLeaveModal