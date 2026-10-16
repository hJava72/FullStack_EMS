
import React, { useState } from 'react'
import { Loader2, LockIcon, X } from 'lucide-react'

const ChangePasswordModal = ({open,onClose}) => {

        const [loading, setLoading] = useState(false)
        const [message, setMessage] = useState({type:"",text:""})

        const handleSubmit = async (e) => {
            e.preventDefault()
        }

        if (!open) return null

  return (
    <div onClick={onClose} className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
        
           <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in' onClick={(e) => e.stopPropagation()}>

                <div className='flex items-center justify-between p-6 pb-0'>
                
                    <h2 className='text-lg font-medium text-slate-900 mb-6 pb-4 border-b border-slate-200 flex items-center gap-2'>
                      <LockIcon className="w-5 h-5 text-slate-400" /> Change Password
                    </h2>
                    
                    <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700'>
                        <X className="w-5 h-5" />
                    </button>
                
              </div>

              <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4'>
                {message.text && (
                  <div className={`p-3 rounded-xl text-sm flex items-start gap-3 ${message.type === 'success' ? 'bg-emerald-500 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        {message.text}
                      </div>
                  </div>
                      
                )}
                <div>
                     <label className='block text-sm font-medium text-slate-700 mb-2'> Current Password</label>
                     <input type="password" name="currentPassword" required/>
                </div>
                <div>
                     <label className='block text-sm font-medium text-slate-700 mb-2'> New Password</label>
                     <input type="password" name="newPassword" required/>
                </div>
                  <div className='flex gap-3 pt-2'>
                     <button type="button" onClick={onClose} className='btn-secondary flex-1'>Cancel</button>
                     <button type="submit" className='btn-primary flex-1 flex justify-center gap-2'>
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                       Update Password</button>

                 </div>

              </form>

           </div>

    </div>
    
  )
}

export default ChangePasswordModal