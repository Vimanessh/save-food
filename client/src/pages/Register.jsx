import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, UserPlus } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [searchParams] = useSearchParams()
  const roleFromQuery = searchParams.get('role') || 'donor'
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roleFromQuery,
    phone: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/register', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success('Registration successful!')
      navigate('/dashboard')
      window.location.reload()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-primary-500">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create Account ✨</h2>
          <p className="mt-2 text-sm text-gray-600 italic">
            "We make a living by what we get, but we make a life by what we give." 🌟
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 underline">
              Sign in 🔓
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-primary-500">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                placeholder="Full Name 👤"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-primary-500">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                placeholder="Email address 📧"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-primary-500">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                placeholder="Password 🔒"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-primary-500">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                  placeholder="Phone 📱"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <select
                  name="role"
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="donor">Donor 🍱</option>
                  <option value="receiver">Receiver 🙋‍♂️</option>
                </select>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-primary-500">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="address"
                type="text"
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                placeholder="Address 📍"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 shadow-lg shadow-primary-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Join the Mission 🚀
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
