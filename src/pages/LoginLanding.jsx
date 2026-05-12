import LoginLeftSide from "../components/LoginLeftSide"
import { Link } from "react-router-dom"
import { Shield as Shieldicon, User as Usericon, ArrowRight as ArrowRightIcon } from "lucide-react"

const LoginLanding = () => {

    const portaloptions = [
      {
        to : "/login/admin",
        title : "Admin Portal",
        description : "Manage employees,departements, payroll, and system configurations.",
        icon : Shieldicon,
        active: true
      },

      {
        to : "/login/employee",
        title : "Employee Portal",
        description : "View your profile, track attendance,request time off, and access payslips.",
        icon : Usericon,
        active: false
      }

    ]
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
         <LoginLeftSide />

         <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
          
          <div className="w-full max-w-md animate-fade-in relative-z-10">
              { /* Header */ }
                <div className="mb-10 text-center md:text-left">
                   <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome Back</h2>
                   <p className="text-slate-500">Select your portal to securely access the system.</p>
                </div>
              { /* Portal List */ }
              <div className="space-y-4">
                 {portaloptions.map((portal) => (
                  <Link key={portal.to} to={portal.to}
                    className={`group block w-full rounded-[28px] border p-5 shadow-sm transition-all duration-300 ${portal.active ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                     <div className="flex items-center justify-between gap-4">
                       <div className="text-left">
                         <h3 className={`text-lg mb-1 transition-colors ${portal.active ? 'text-slate-900' : 'text-slate-900 group-hover:text-slate-900'}`}>
                           {portal.title}
                         </h3>
                         <p className="text-sm text-slate-500 italic">{portal.description}</p>
                       </div>
                       <ArrowRightIcon className={`w-5 h-5 transition-transform duration-300 ${portal.active ? 'text-slate-500 group-hover:text-slate-600' : 'text-slate-400 group-hover:translate-x-1 group-hover:text-slate-600'}`} />
                     </div>
                  </Link>
                 ))}
              </div>
              { /* Footer */ }
                <div className="mt-12 text-center md:text-left text-sm text-slate-400">
                 <p>&copy; {new Date().getFullYear()} GreatStack. All rights reserved.</p>
                </div>
          </div>

        </div>

    </div>
  )
}

export default LoginLanding