import {useState,useEffect} from 'react'
import {dummyProfileData} from '../assets/assets'
import ProfileForm from '../components/PaySlip/ProfileForm'
import Loading from '../components/Loading'
import { Lock } from 'lucide-react'
import ChangePasswordModal from '../components/PaySlip/ChangePasswordModal'


const Settings = () => {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showPasswordModal, setPasswordModal] = useState(false)

    const fetchProfile = async () => {
      setProfile(dummyProfileData)
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    }
    useEffect(() => {
      fetchProfile()
    }, [])
   
    if(loading) return <Loading/>

  return (
    <div className='animate-fade-in'>

      <div className='page-header'>
        <h1>Settings</h1>
        <p>Manage your account and preference</p>
      </div>
        {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

        {/* Change Password trigger */}
        <div className='card-max-w-md p-6 flex items-center justify-between' >
          <div className='flex items-center gap-3'>
            <div className='p-2.5 bg-slate-100 rounded-lg'>
                <Lock className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <p className='font-medium text-slate-800'>Password</p>
              <p className='text-sm text-slate-600'>Update your account password</p>
            </div>
          
            <button className='btn-secondary text-sm' onClick={() => setPasswordModal(true)}>
              Change
            </button>

          </div>

            <ChangePasswordModal open={showPasswordModal} onClose={() => setPasswordModal(false)} />

        </div>
    </div>
  )
}

export default Settings