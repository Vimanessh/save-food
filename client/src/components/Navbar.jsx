import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Leaf } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Donations', path: '/donations' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary-200">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">Save Food</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-primary-600 font-bold px-4 py-2 rounded-xl hover:bg-primary-50 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary-600 font-bold px-4 py-2 rounded-xl hover:bg-primary-50 transition-all duration-300"
                >
                  Dashboard 🛠️
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-primary !py-2 !px-6"
                >
                  Logout 🔓
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-bold px-4 py-2 rounded-xl hover:bg-primary-50 transition-all duration-300">
                  Login 🔐
                </Link>
                <Link to="/register" className="btn-primary !py-2 !px-6">
                  Join 🚀
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
