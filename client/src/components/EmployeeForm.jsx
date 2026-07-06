import React from 'react'
import { Loader2Icon } from 'lucide-react'
import { DEPARTMENTS } from '../assets/assets'


const EmployeeForm = ({ initialData = null, onSuccess, onCancel }) => {
    const [loading, setLoading] = React.useState(false)

    const isEditMode = !!initialData

    const formatDateForInput = (value) => {
        if (!value) return ""

        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return ""

        return date.toISOString().split("T")[0]
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget)
            const payload = Object.fromEntries(formData.entries())

            payload.basicSalary = Number(payload.basicSalary || 0)
            payload.allowances = Number(payload.allowances || 0)
            payload.deductions = Number(payload.deductions || 0)

            if (isEditMode) {
                payload.id = initialData.id || initialData._id
            }

            if (onSuccess) {
                onSuccess(payload)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>

         {/* ---- Personal Information ---- */}
            <div className='card p-5 sm:p-6'>
                <h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>Personal Information</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                    <div>
                        <label className='block mb-2'>First Name</label>
                        <input name="firstName" required defaultValue={initialData?.firstName || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Last Name</label>
                        <input name="lastName" required defaultValue={initialData?.lastName || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Email</label>
                        <input type="email" name="email" required defaultValue={initialData?.email || initialData?.user?.email || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Phone Number</label>
                        <input name="phone" required defaultValue={initialData?.phone || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Department</label>
                        <input name="department" required defaultValue={initialData?.department || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Position</label>
                        <input name="position" required defaultValue={initialData?.position || ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Join Date</label>
                        <input type="date" name="joinDate" required defaultValue={formatDateForInput(initialData?.joinDate)} />
                    </div>

                    <div>
                        <label className='block mb-2'>Employment Status</label>
                        <input name="employmentStatus" required defaultValue={initialData?.employmentStatus || "ACTIVE"} />
                    </div>

                    <div>
                        <label className='block mb-2'>Basic Salary</label>
                        <input type="number" min="0" step="0.01" name="basicSalary" defaultValue={initialData?.basicSalary ?? ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Allowances</label>
                        <input type="number" min="0" step="0.01" name="allowances" defaultValue={initialData?.allowances ?? ""} />
                    </div>

                    <div>
                        <label className='block mb-2'>Deductions</label>
                        <input type="number" min="0" step="0.01" name="deductions" defaultValue={initialData?.deductions ?? ""} />
                    </div>

                    <div className='col-span-1 sm:col-span-2'>
                        <label className='block mb-2'>Bio (Optional)</label>
                        <textarea
                            name="bio"
                            rows={3}
                            defaultValue={initialData?.bio || ""}
                            placeholder="Brief description..."
                            className='resize-none'
                        />
                    </div>
                </div>
            </div>
                {/* ---- Employment Details ---- */}
                 <div className='card p-5 sm:p-6'>
                    <h3 className='text-base font-medium mb-6 pb-6 text-slate-900 border-b border-slate-100 '>Employment Details</h3>

                     <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                    
                       <div>
                            <label className='block mb-2'>Department</label>
                            <select name="department" required defaultValue={initialData?.department || ""}>
                                   <option value="">Select Department</option>
                                {DEPARTMENTS.map((deptName) => (
                                        <option key={deptName} value={deptName}>{deptName}</option>
                                ))}
                            </select>
                        </div>

                      <div>
                        <label className='block mb-2'>Position</label>
                        <input name="position" required defaultValue={initialData?.position} />
                      </div>

                      <div>
                        <label className='block mb-2'>Basic Salary</label>
                        <input name="basicSalary" type="number" required min="0" step="0.01" defaultValue={initialData?.basicSalary || 0} />
                      </div>

                       <div>
                        <label className='block mb-2'>Allowances</label>
                        <input name="allowances" type="number" required min="0" step="0.01" defaultValue={initialData?.allowances || 0} />
                      </div>

                     <div>
                        <label className='block mb-2'>Deductions</label>
                        <input name="deductions" type="number" required min="0" step="0.01" defaultValue={initialData?.deductions || 0} />
                      </div>

                      {isEditMode && (
                        <div> 
                            <div>
                                <label className='block mb-2'>Status</label>
                                <select name="employmentStatus" defaultValue={initialData?.employmentStatus}> 
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>
                        </div>
                      )}
                 
                     </div>
                 
                </div>
                {/* ---- Account Setup ---- */}

                <div className='card p-5 sm:p-6'>
                  <h3 className='text-base font-medium mb-6 pb-4 border-b border-slate-100'>Account Setup</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                     <div className='sm:col-span-2'>
                        <label className='block mb-2'>Work Email</label>
                        <input name="email" type="email" required defaultValue={initialData?.email} />
                     </div>
                      {!isEditMode && (
                        <div>
                            <label className='block mb-2'>Temporary Password</label>
                            <input name="password" type="password" required />
                        </div>
                      )}

                      {isEditMode && (
                        <div>
                            <label className='block mb-2'>Change Password (Optional)</label>
                            <input name="password" type="password" placeholder='Leave blank to keep current' />
                        </div>
                      )}

                         <div>
                            <label className='block mb-2'>System Role</label>
                            <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"}>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                   </div>
                </div>

                {/* ---- Buttons ---- */}

                <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2'>
                    <button
                        type="button"
                        className='btn-secondary'
                        onClick={() => {
                            if (onCancel) {
                                onCancel()
                            } else if (typeof window !== 'undefined') {
                                window.history.back()
                            }
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className='btn-primary flex items-center justify-center'>
                        {loading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin' />}
                        {isEditMode ? 'Update Employee' : 'Create Employee'}
                    </button> 
                </div>


{/*             <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-3'>
                <button type="button" onClick={onCancel} className='btn-secondary'>
                    Cancel
                </button>
                <button type="submit" className='btn-primary' disabled={loading}>
                    {loading ? 'Saving...' : isEditMode ? 'Update Employee' : 'Create Employee'}
                </button> 
            </div> */}
        </form>
    )
}

export default EmployeeForm