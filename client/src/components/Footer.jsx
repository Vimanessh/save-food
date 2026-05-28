import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">Save Food</span>
            </Link>
            <p className="text-gray-400">
              Reducing food waste and fighting hunger by connecting donors with those in need.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-500">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-500">About Us</Link></li>
              <li><Link to="/donations" className="text-gray-400 hover:text-primary-500">Food Listings</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-500">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span>242 Chennai</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>+91 6385218882</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5 text-primary-500" />
                <span>vimanessh31@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
              />
              <button className="btn-primary">Join</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Save Food. All rights reserved by vimanessh</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
