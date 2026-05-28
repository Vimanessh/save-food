import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Users, 
  Settings, 
  ChevronRight,
  HeartHandshake,
  Clock
} from 'lucide-react'

// Sub-components for Dashboard
import DonorDashboard from '../components/dashboard/DonorDashboard'
import ReceiverDashboard from '../components/dashboard/ReceiverDashboard'
import AdminDashboard from '../components/dashboard/AdminDashboard'
import AddDonation from '../components/dashboard/AddDonation'
import MyDonations from '../components/dashboard/MyDonations'
import MyRequests from '../components/dashboard/MyRequests'
import ManageUsers from '../components/dashboard/ManageUsers'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const getNavLinks = () => {
    const common = [
      { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    ]

    if (user.role === 'donor') {
      return [
        ...common,
        { name: 'Add Donation', path: '/dashboard/add-donation', icon: PlusCircle },
        { name: 'My Donations', path: '/dashboard/my-donations', icon: HeartHandshake },
      ]
    }

    if (user.role === 'receiver') {
      return [
        ...common,
        { name: 'My Requests', path: '/dashboard/my-requests', icon: History },
      ]
    }

    if (user.role === 'admin') {
      return [
        ...common,
        { name: 'Manage Users', path: '/dashboard/users', icon: Users },
        { name: 'All Donations', path: '/dashboard/all-donations', icon: HeartHandshake },
      ]
    }

    return common
  }

  const navLinks = getNavLinks()

  return (
    <div className="flex min-h-screen gradient-bg">
      {/* Sidebar */}
      <aside className="w-80 bg-white/80 backdrop-blur-2xl shadow-[20px_0_50px_rgba(0,0,0,0.05)] hidden lg:block border-r border-white/50 relative z-50">
        <div className="p-10 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-12 bg-gradient-to-br from-primary-600 to-green-600 p-6 rounded-[2rem] text-white shadow-xl shadow-primary-200 transform hover:scale-[1.02] transition duration-300">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Settings className="h-7 w-7" />
            </div>
            <span className="font-black text-2xl tracking-tight">Panel 🛠️</span>
          </div>
          
          <nav className="space-y-4 flex-grow">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-2xl shadow-primary-200 translate-x-2' 
                      : 'text-gray-500 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'group-hover:scale-110 transition duration-300'}`} />
                  <span className="font-bold text-lg">{link.name}</span>
                  {isActive && (
                    <motion.div layoutId="active" className="ml-auto">
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-10">
            <div className="bg-gradient-to-br from-primary-900 to-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary-500/40 transition duration-500"></div>
              <p className="font-black text-xl mb-3 italic tracking-tight">"Kindness is free." ✨</p>
              <p className="text-primary-300 text-sm font-bold uppercase tracking-widest">— Spread Love</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 glass-morphism p-10 rounded-[3rem] shadow-xl border border-white/50">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome, {user.name} 👋</h1>
              <div className="flex items-center gap-3">
                <span className="bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-100">
                  {user.role}
                </span>
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Account Control Center 🛡️</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/50 px-6 py-4 rounded-[2rem] border border-gray-100 shadow-sm backdrop-blur-md">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-lg font-black text-gray-700">{new Date().toLocaleDateString()} 📅</span>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={
                user.role === 'donor' ? <DonorDashboard /> : 
                user.role === 'receiver' ? <ReceiverDashboard /> : 
                <AdminDashboard />
              } />
              <Route path="add-donation" element={<AddDonation />} />
              <Route path="my-donations" element={<MyDonations />} />
              <Route path="my-requests" element={<MyRequests />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="all-donations" element={<MyDonations isAdmin={true} />} />
            </Routes>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
