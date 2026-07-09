import { Plus,Search, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { dummyEmployeeData,DEPARTMENTS } from "../assets/assets"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeForm from "../components/EmployeeForm"

const Employees = () => {
  
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchEmployees = useCallback(async () => {
      setLoading(true)
      setEmployees(dummyEmployeeData.filter(emp => (selectedDepartment ? emp.department === selectedDepartment : true)));
      setTimeout(() => {
         setLoading(false)
      }, 1000)
      }, [])
  
  useEffect(() => {
      fetchEmployees();
  }, [])

  const filtered = employees.filter((emp) => `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="animate-fade-in">
      {/* ----header----*/}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"> 
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus size={16}/> Add Employee
          </button>
      </div>

       {/* ----Search bar-------*/}
       <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
           <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"/>
           <input placeholder="Search employees..." className="w-full pl-10 py-2 border rounded-lg" onChange={(e) => setSearch(e.target.value)} value={search}/>
        </div>

          <select className="w-full sm:w-48 px-3 py-2 border rounded-lg" onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment}>
            <option value="">All Departments</option>
            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>{deptName}</option>
            ))}
          </select> 

      </div>

          {/* ----Employee cards----*/}
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"/>
              </div>
            ) : (
              filtered.length === 0 ? (
                <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">No employees found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filtered.map((emp) => <EmployeeCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={(e)=> setEditingEmployee(e)}/>)}
                </div>
              )
            )}

            {/* ----Create Employee Modal----*/}

            {showCreateModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowCreateModal(false)}>

                <div className="flex inset-0"/>
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e)=> e.stopPropagation()}>

                  <div className="flex justify-between items-center p-6 pb-0">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Add New Employee</h2>
                      <p className="text-slate-500">Create a user account and employee profile</p>
                    </div>
                    <button  onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400  hover:text-slate-600 ">
                        <X className="w-5 h-5"/>
                    </button>
                  </div>
                     <div className="p-6">
                           <EmployeeForm onSuccess={() => {setShowCreateModal(false);fetchEmployees(); }} onCancel={() => setShowCreateModal(false)}/>
                     </div>
                </div>
              </div>
            )}

            {/* ---- Edit Employee Modal----*/}
              {editingEmployee && (<div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm" onClick={() => setEditingEmployee(null)}>

                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center p-6 pb-0">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Edit Employee</h2>
                      <p className="text-slate-500">Update employee details</p>
                    </div>
                    <button  onClick={() => setEditingEmployee(null)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400  hover:text-slate-600 ">
                        <X className="w-5 h-5"/>
                    </button>
                  </div>
                      <div className="p-6"> 
                        <EmployeeForm initialData={editingEmployee} onSuccess={() => {fetchEmployees(); setEditingEmployee(null)}} onCancel={() => setEditingEmployee(null)}/>
                      </div>
                </div>

              </div>
              )}

    </div>
)}

export default Employees