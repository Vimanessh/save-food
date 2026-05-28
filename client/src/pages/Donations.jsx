import { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Calendar, ShoppingBag, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Donations = () => {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    foodType: '',
  })

  const fetchDonations = async () => {
    try {
      setLoading(true)
      const { search, city, foodType } = filters
      const res = await axios.get(`/api/donations?search=${search}&city=${city}&foodType=${foodType}`)
      setDonations(res.data.data)
    } catch (err) {
      toast.error('Failed to fetch donations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchDonations()
  }

  const handleRequest = async (donationId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      toast.info('Please login to request food')
      return
    }
    if (user.role !== 'receiver') {
      toast.error('Only receivers can request food')
      return
    }

    try {
      await axios.post('/api/requests', 
        { donationId, message: 'I would like to request this food donation.' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      toast.success('Request sent successfully!')
      fetchDonations()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send request')
    }
  }

  return (
    <div className="gradient-bg min-h-screen py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 mb-8 text-sm font-black tracking-widest text-primary-700 uppercase bg-white shadow-xl shadow-primary-100 rounded-full"
          >
            🍱 Fresh Opportunities
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">Available Food 🍎</h1>
          <p className="text-2xl text-gray-600 italic font-medium">"Sharing is caring. Help us fill a plate today." ✨</p>
        </div>
        
        {/* Filters */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSearch} 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 glass-morphism p-10 rounded-[2.5rem] mb-20 shadow-2xl relative z-30"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search food... 🔍" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="City... 📍" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold"
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            <select 
              className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold appearance-none cursor-pointer"
              value={filters.foodType}
              onChange={(e) => setFilters({...filters, foodType: e.target.value})}
            >
              <option value="">All Types 🍱</option>
              <option value="veg">Veg 🥬</option>
              <option value="non-veg">Non-Veg 🍗</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full text-xl shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)]">Search Now</button>
        </motion.form>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-100 border-t-primary-600 shadow-2xl"></div>
          </div>
        ) : donations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {donations.map((donation, i) => (
              <motion.div 
                key={donation._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="card group h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={donation.image && donation.image !== 'no-photo.jpg' ? donation.image : "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
                    alt={donation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className={`absolute top-6 right-6 px-4 py-2 rounded-2xl text-sm font-black uppercase shadow-2xl backdrop-blur-md ${donation.foodType === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    {donation.foodType === 'veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">{donation.title}</h3>
                  <p className="text-gray-500 text-lg mb-8 line-clamp-2 font-medium leading-relaxed">{donation.description}</p>
                  
                  <div className="space-y-4 mb-10 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <span className="font-bold">Quantity: <span className="text-gray-900">{donation.quantity}</span></span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="font-bold truncate">{donation.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="bg-red-50 p-2 rounded-xl text-red-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <span className="font-bold">Expires: <span className="text-red-600">{new Date(donation.expiryDate).toLocaleDateString()}</span></span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRequest(donation._id)}
                    className="btn-primary w-full text-lg mt-auto shadow-[0_15px_30px_-10px_rgba(34,197,94,0.3)] group-hover:scale-[1.02]"
                  >
                    Request Food 🙋‍♂️
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 glass-morphism rounded-[4rem]"
          >
            <div className="text-8xl mb-8">🏜️</div>
            <p className="text-2xl text-gray-500 font-black">No food donations found matching your criteria.</p>
            <p className="text-gray-400 mt-4 font-bold">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Donations
