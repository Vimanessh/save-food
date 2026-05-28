import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, HeartHandshake, ShoppingBag, BarChart3 } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    donations: 0,
    requests: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { name: 'Total Users', value: stats.users, icon: Users, color: 'bg-indigo-500' },
    { name: 'Total Donations', value: stats.donations, icon: HeartHandshake, color: 'bg-green-500' },
    { name: 'Total Requests', value: stats.requests, icon: ShoppingBag, color: 'bg-orange-500' },
    { name: 'Growth', value: '+12%', icon: BarChart3, color: 'bg-primary-600' },
  ]

  return (
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
  )
}

export default AdminDashboard
