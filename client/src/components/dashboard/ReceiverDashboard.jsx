import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingBag, Clock, CheckCircle, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const ReceiverDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/requests/my-requests', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const requests = res.data.data
        setStats({
          total: requests.length,
          pending: requests.filter(r => r.status === 'pending').length,
          approved: requests.filter(r => r.status === 'approved').length,
          completed: requests.filter(r => r.status === 'completed').length
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { name: 'Total Requests', value: stats.total, icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-500' },
    { name: 'Approved', value: stats.approved, icon: CheckCircle, color: 'bg-green-500' },
    { name: 'Received', value: stats.completed, icon: CheckCircle, color: 'bg-primary-600' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">{card.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          )
        })}
      </div>

      <div className="bg-primary-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Need more food?</h3>
          <p className="text-primary-100">Browse available donations in your area and make a request.</p>
        </div>
        <Link to="/donations" className="bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition duration-300 flex items-center gap-2">
          <Search className="h-5 w-5" /> Browse Food
        </Link>
      </div>
    </div>
  )
}

export default ReceiverDashboard
